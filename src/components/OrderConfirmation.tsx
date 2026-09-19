"use client";

import { useState } from "react";
import Link from "next/link";
import { Order } from "@/lib/orders";
import Container from "@/components/Container";
import { confirmPayment } from "@/app/actions/payment";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  PENDING_PAYMENT: { label: "Awaiting Payment", color: "#eab308" },
  PAYMENT_SUBMITTED: { label: "Payment Under Review", color: "#3b82f6" },
  PAYMENT_CONFIRMED: { label: "Payment Confirmed", color: "#22c55e" },
  PROCESSING: { label: "Processing", color: "#3b82f6" },
  SHIPPED: { label: "Shipped", color: "#a855f7" },
  COMPLETED: { label: "Completed", color: "#22c55e" },
  CANCELLED: { label: "Cancelled", color: "#ef4444" },
};

export default function OrderConfirmation({ order }: { order: Order }) {
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const statusInfo = STATUS_MAP[order.status] || {
    label: order.status,
    color: "#8c7180",
  };

  const handlePaymentConfirm = async () => {
    setSubmitting(true);
    setError("");
    const result = await confirmPayment(order.reference);
    if (result.success) {
      setPaymentSubmitted(true);
    } else {
      setError(result.error || "Something went wrong");
    }
    setSubmitting(false);
  };

  return (
    <Container className="py-12 md:py-20">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#f8eef3" }}>
          Order Confirmed
        </h1>
        <p className="mt-4 leading-relaxed" style={{ color: "#8c7180" }}>
          Thank you, {order.customer.fullName}. Your order has been received.
        </p>
        <p className="mt-2 text-sm font-medium" style={{ color: statusInfo.color }}>
          {statusInfo.label}
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-xl">
        <div className="p-6" style={{ border: "1px solid #3d1e2c" }}>
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider" style={{ color: "#8c7180" }}>
              Order Reference
            </p>
            <div className="mt-1 flex items-center justify-center gap-2">
              <p className="text-lg font-medium tracking-wider" style={{ color: "#f8eef3" }}>
                {order.reference}
              </p>
              <button
                onClick={() => navigator.clipboard.writeText(order.reference)}
                className="transition-colors"
                style={{ color: "#8c7180" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f8eef3")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8c7180")}
                title="Copy reference"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              </button>
            </div>
          </div>

          <div className="mt-6 pt-6" style={{ borderTop: "1px solid #3d1e2c" }}>
            <p className="text-sm font-medium" style={{ color: "#f8eef3" }}>Items</p>
            <div className="mt-3">
              {order.items.map((item) => (
                <div key={item.productId} className="flex justify-between py-2" style={{ borderBottom: "1px solid #3d1e2c" }}>
                  <p className="text-sm" style={{ color: "#8c7180" }}>
                    {item.name} × {item.quantity}
                  </p>
                  <p className="text-sm" style={{ color: "#f8eef3" }}>
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-between pt-3" style={{ borderTop: "1px solid #3d1e2c" }}>
              <p className="text-sm font-medium" style={{ color: "#f8eef3" }}>Total</p>
              <p className="text-sm font-medium" style={{ color: "#f8eef3" }}>
                {formatPrice(order.subtotal)}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6" style={{ borderTop: "1px solid #3d1e2c" }}>
            <p className="text-sm font-medium" style={{ color: "#f8eef3" }}>
              Payment Instructions
            </p>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "#8c7180" }}>
              Please make a bank transfer of{" "}
              <strong style={{ color: "#f8eef3" }}>
                {formatPrice(order.subtotal)}
              </strong>{" "}
              to the account details below.
            </p>
            <div className="mt-4 rounded p-4" style={{ border: "1px solid #3d1e2c" }}>
              <p className="text-sm" style={{ color: "#8c7180" }}>
                Bank:{" "}
                <span style={{ color: "#f8eef3" }}>
                  {process.env.NEXT_PUBLIC_BANK_NAME || "[Bank Name]"}
                </span>
              </p>
              <p className="text-sm" style={{ color: "#8c7180" }}>
                Account Name:{" "}
                <span style={{ color: "#f8eef3" }}>
                  {process.env.NEXT_PUBLIC_ACCOUNT_NAME || "[Account Name]"}
                </span>
              </p>
              <p className="text-sm" style={{ color: "#8c7180" }}>
                Account Number:{" "}
                <span style={{ color: "#f8eef3" }}>
                  {process.env.NEXT_PUBLIC_ACCOUNT_NUMBER || "[Account Number]"}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6" style={{ borderTop: "1px solid #3d1e2c" }}>
            <p className="text-sm font-medium" style={{ color: "#f8eef3" }}>Next Steps</p>
            <ol className="mt-2 space-y-2 text-sm" style={{ color: "#8c7180" }}>
              <li>1. Make the bank transfer using the details above</li>
              <li>2. Come back and click &quot;I&apos;ve Made Payment&quot;</li>
              <li>3. We&apos;ll verify your payment within 24 hours</li>
              <li>4. Your order will be processed and shipped</li>
            </ol>
          </div>

          {order.status !== "PENDING_PAYMENT" || paymentSubmitted ? (
            <div className="mt-6 pt-6" style={{ borderTop: "1px solid #3d1e2c" }}>
              <p className="text-sm font-medium" style={{ color: "#f8eef3" }}>
                Payment Status
              </p>
              <p className="mt-2 text-sm text-green-500">
                Payment notification received. We&apos;re verifying your payment.
              </p>
            </div>
          ) : (
            <div className="mt-6 pt-6" style={{ borderTop: "1px solid #3d1e2c" }}>
              <p className="text-sm font-medium" style={{ color: "#f8eef3" }}>
                Have you made the payment?
              </p>
              <p className="mt-2 text-sm" style={{ color: "#8c7180" }}>
                Click the button below after completing your bank transfer.
              </p>
              <button
                onClick={handlePaymentConfirm}
                disabled={submitting}
                className="mt-4 w-full text-sm font-semibold uppercase tracking-wider transition-all hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: "#ff2e88", color: "#f8eef3", padding: "14px 32px" }}
              >
                {submitting ? "Submitting..." : "I've Made Payment"}
              </button>
              {error && (
                <p className="mt-2 text-xs text-red-500">{error}</p>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/order/lookup"
            className="text-sm transition-colors"
            style={{ color: "#8c7180" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f8eef3")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8c7180")}
          >
            Track Another Order
          </Link>
          <span className="mx-3" style={{ color: "#8c7180" }}>·</span>
          <Link
            href="/products"
            className="text-sm transition-colors"
            style={{ color: "#8c7180" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f8eef3")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8c7180")}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </Container>
  );
}
