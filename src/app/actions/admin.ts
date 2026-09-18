"use server";

import { supabase } from "@/lib/supabase";
import {
  getOrder,
  saveOrder,
  type OrderStatus,
} from "@/lib/orders";
import {
  sendPaymentConfirmed,
  sendOrderShipped,
} from "@/lib/email";

export async function getAllOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map((row) => ({
    reference: row.reference,
    status: row.status,
    items: row.items,
    subtotal: row.subtotal,
    customer: {
      fullName: row.full_name,
      email: row.email,
      phone: row.phone,
      address: row.address,
      city: row.city,
      state: row.state,
      deliveryInstructions: row.delivery_instructions,
    },
    paymentReceiptUrl: row.payment_receipt_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

export async function updateOrderStatus(
  reference: string,
  newStatus: OrderStatus,
) {
  const order = await getOrder(reference);
  if (!order) {
    return { success: false, error: "Order not found" };
  }

  order.status = newStatus;
  order.updatedAt = new Date().toISOString();
  await saveOrder(order);

  if (newStatus === "PAYMENT_CONFIRMED") {
    await sendPaymentConfirmed(
      order.customer.email,
      order.reference,
      order.customer.fullName,
    );
  } else if (newStatus === "SHIPPED") {
    await sendOrderShipped(
      order.customer.email,
      order.reference,
      order.customer.fullName,
    );
  }

  return { success: true };
}
