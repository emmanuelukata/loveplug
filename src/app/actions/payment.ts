"use server";

import { getOrder, saveOrder } from "@/lib/orders";
import { sendPaymentSubmitted } from "@/lib/email";

interface PaymentResult {
  success: boolean;
  error?: string;
}

export async function confirmPayment(reference: string): Promise<PaymentResult> {
  const order = await getOrder(reference);

  if (!order) {
    return { success: false, error: "Order not found" };
  }

  if (order.status !== "PENDING_PAYMENT") {
    return { success: false, error: "Order has already been submitted" };
  }

  order.status = "PAYMENT_SUBMITTED";
  order.updatedAt = new Date().toISOString();
  await saveOrder(order);

  await sendPaymentSubmitted(
    order.customer.email,
    order.reference,
    order.customer.fullName,
  );

  return { success: true };
}
