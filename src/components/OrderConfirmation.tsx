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
  PENDING_PAYMENT: { label: "Awaiting Payment", color: "text-yellow-600" },
  PAYMENT_SUBMITTED: { label: "Payment Under Review", color: "text-blue-600" },
  PAYMENT_CONFIRMED: { label: "Payment Confirmed", color: "text-green-600" },
  PROCESSING: { label: "Processing", color: "text-blue-600" },
  SHIPPED: { label: "Shipped", color: "text-purple-600" },
  COMPLETED: { label: "Completed", color: "text-green-600" },
  CANCELLED: { label: "Cancelled", color: "text-red-600" },
};

export default function OrderConfirmation({ order }: { order: Order }) {
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const statusInfo = STATUS_MAP[order.status] || {
    label: order.status,
    color: "text-muted",
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
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Order Confirmed
        </h1>
        <p className="mt-4 text-muted leading-relaxed">
          Thank you, {order.customer.fullName}. Your order has been received.
        </p>
        <p className={`mt-2 text-sm font-medium ${statusInfo.color}`}>
          {statusInfo.label}
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-xl">
        <div className="border border-border p-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-muted">
              Order Reference
            </p>
            <div className="mt-1 flex items-center justify-center gap-2">
              <p className="text-lg font-medium tracking-wider text-foreground">
                {order.reference}
              </p>
              <button
                onClick={() => navigator.clipboard.writeText(order.reference)}
                className="text-muted transition-colors hover:text-foreground"
                title="Copy reference"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              </button>
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-6">
            <p className="text-sm font-medium text-foreground">Items</p>
            <div className="mt-3 divide-y divide-border">
              {order.items.map((item) => (
                <div key={item.productId} className="flex justify-between py-2">
                  <p className="text-sm text-muted">
                    {item.name} × {item.quantity}
                  </p>
                  <p className="text-sm text-foreground">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-between border-t border-border pt-3">
              <p className="text-sm font-medium text-foreground">Total</p>
              <p className="text-sm font-medium text-foreground">
                {formatPrice(order.subtotal)}
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-6">
            <p className="text-sm font-medium text-foreground">
              Payment Instructions
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Please make a bank transfer of{" "}
              <strong className="text-foreground">
                {formatPrice(order.subtotal)}
              </strong>{" "}
              to the account details below.
            </p>
            <div className="mt-4 rounded border border-border p-4">
              <p className="text-sm text-muted">
                Bank:{" "}
                <span className="text-foreground">
                  {process.env.NEXT_PUBLIC_BANK_NAME || "[Bank Name]"}
                </span>
              </p>
              <p className="text-sm text-muted">
                Account Name:{" "}
                <span className="text-foreground">
                  {process.env.NEXT_PUBLIC_ACCOUNT_NAME || "[Account Name]"}
                </span>
              </p>
              <p className="text-sm text-muted">
                Account Number:{" "}
                <span className="text-foreground">
                  {process.env.NEXT_PUBLIC_ACCOUNT_NUMBER || "[Account Number]"}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-6">
            <p className="text-sm font-medium text-foreground">Next Steps</p>
            <ol className="mt-2 space-y-2 text-sm text-muted">
              <li>1. Make the bank transfer using the details above</li>
              <li>2. Come back and click &quot;I&apos;ve Made Payment&quot;</li>
              <li>3. We&apos;ll verify your payment within 24 hours</li>
              <li>4. Your order will be processed and shipped</li>
            </ol>
          </div>

          {order.status !== "PENDING_PAYMENT" || paymentSubmitted ? (
            <div className="mt-6 border-t border-border pt-6">
              <p className="text-sm font-medium text-foreground">
                Payment Status
              </p>
              <p className="mt-2 text-sm text-green-600">
                Payment notification received. We&apos;re verifying your payment.
              </p>
            </div>
          ) : (
            <div className="mt-6 border-t border-border pt-6">
              <p className="text-sm font-medium text-foreground">
                Have you made the payment?
              </p>
              <p className="mt-2 text-sm text-muted">
                Click the button below after completing your bank transfer.
              </p>
              <button
                onClick={handlePaymentConfirm}
                disabled={submitting}
                className="mt-4 w-full bg-primary py-3 text-sm font-semibold uppercase tracking-wider text-tertiary transition-all hover:bg-accent-hover disabled:opacity-50"
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
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            Track Another Order
          </Link>
          <span className="mx-3 text-muted">·</span>
          <Link
            href="/products"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </Container>
  );
}
