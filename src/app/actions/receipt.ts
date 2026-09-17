"use server";

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { getOrder, saveOrder } from "@/lib/orders";

const RECEIPTS_DIR = join(process.cwd(), "data", "receipts");
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

interface UploadResult {
  success: boolean;
  error?: string;
}

function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9.-]/g, "_").substring(0, 100);
}

export async function uploadReceipt(
  reference: string,
  formData: FormData,
): Promise<UploadResult> {
  // 1. Validate order exists
  const order = await getOrder(reference);
  if (!order) {
    return { success: false, error: "Order not found" };
  }

  // 2. Get file from form data
  const file = formData.get("receipt") as File | null;
  if (!file) {
    return { success: false, error: "No file provided" };
  }

  // 3. Validate file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      success: false,
      error: "Invalid file type. Please upload a JPG, PNG, or PDF.",
    };
  }

  // 4. Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      success: false,
      error: "File too large. Maximum size is 5MB.",
    };
  }

  // 5. Create receipt filename
  const ext = file.name.split(".").pop() || "jpg";
  const receiptFilename = `${reference}_${Date.now()}.${sanitizeFilename(ext)}`;

  // 6. Save file
  await mkdir(RECEIPTS_DIR, { recursive: true });
  const filePath = join(RECEIPTS_DIR, receiptFilename);
  const bytes = await file.arrayBuffer();
  await writeFile(filePath, Buffer.from(bytes));

  // 7. Update order
  order.paymentReceiptUrl = receiptFilename;
  order.status = "PAYMENT_SUBMITTED";
  order.updatedAt = new Date().toISOString();
  await saveOrder(order);

  return { success: true };
}
