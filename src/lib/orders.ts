import { supabase } from "./supabase";

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

export async function saveOrder(order: Order): Promise<void> {
  const { error } = await supabase.from("orders").upsert({
    reference: order.reference,
    status: order.status,
    items: order.items,
    subtotal: order.subtotal,
    full_name: order.customer.fullName,
    email: order.customer.email,
    phone: order.customer.phone,
    address: order.customer.address,
    city: order.customer.city,
    state: order.customer.state,
    delivery_instructions: order.customer.deliveryInstructions,
    payment_receipt_url: order.paymentReceiptUrl,
    created_at: order.createdAt,
    updated_at: order.updatedAt,
  });

  if (error) {
    console.error("Error saving order:", error);
    throw new Error("Failed to save order");
  }
}

export async function getOrder(reference: string): Promise<Order | null> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("reference", reference)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    reference: data.reference,
    status: data.status,
    items: data.items,
    subtotal: data.subtotal,
    customer: {
      fullName: data.full_name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      deliveryInstructions: data.delivery_instructions,
    },
    paymentReceiptUrl: data.payment_receipt_url,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

export function generateOrderReference(): string {
  const prefix = "ORD";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}
