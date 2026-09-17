import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";

export type OrderStatus =
  | "PENDING_PAYMENT"
  | "PAYMENT_SUBMITTED"
  | "PAYMENT_CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "COMPLETED"
  | "CANCELLED";

export interface OrderItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
}

export interface Order {
  reference: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    deliveryInstructions: string;
  };
  paymentReceiptUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

const ORDERS_DIR = join(process.cwd(), "data", "orders");

function orderPath(reference: string): string {
  // Sanitize reference to prevent path traversal
  const safe = reference.replace(/[^a-zA-Z0-9-]/g, "");
  return join(ORDERS_DIR, `${safe}.json`);
}

export async function saveOrder(order: Order): Promise<void> {
  await mkdir(ORDERS_DIR, { recursive: true });
  const filePath = orderPath(order.reference);
  await writeFile(filePath, JSON.stringify(order, null, 2), "utf-8");
}

export async function getOrder(reference: string): Promise<Order | null> {
  try {
    const filePath = orderPath(reference);
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data) as Order;
  } catch {
    return null;
  }
}

export function generateOrderReference(): string {
  const prefix = "ORD";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}
