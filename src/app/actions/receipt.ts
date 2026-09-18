"use server";

import { supabase } from "@/lib/supabase";
import { getOrder, saveOrder } from "@/lib/orders";

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

  // 5. Upload to Supabase Storage
  const ext = file.name.split(".").pop() || "jpg";
  const filePath = `receipts/${reference}_${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("receipts")
    .upload(filePath, file, {
      contentType: file.type,
    });

  if (uploadError) {
    console.error("Upload error:", uploadError);
    return { success: false, error: "Failed to upload file" };
  }

  // 6. Get public URL
  const { data: urlData } = supabase.storage
    .from("receipts")
    .getPublicUrl(filePath);

  // 7. Update order
  order.paymentReceiptUrl = urlData.publicUrl;
  order.status = "PAYMENT_SUBMITTED";
  order.updatedAt = new Date().toISOString();
  await saveOrder(order);

  return { success: true };
}
