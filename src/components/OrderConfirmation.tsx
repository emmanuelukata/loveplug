import Link from "next/link";
import { Order } from "@/lib/orders";
import Container from "@/components/Container";
import ReceiptUpload from "@/components/ReceiptUpload";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function OrderConfirmation({ order }: { order: Order }) {
  return (
    <Container className="py-12 md:py-20">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-light tracking-tight text-foreground">
          Order Confirmed
        </h1>
        <p className="mt-4 text-muted leading-relaxed">
          Thank you, {order.customer.fullName}. Your order has been received.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-xl">
        <div className="border border-border p-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-muted">
              Order Reference
            </p>
            <p className="mt-1 text-lg font-medium tracking-wider text-foreground">
              {order.reference}
            </p>
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
              to the account details below. After making the transfer, upload
              your payment receipt on our website for verification.
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
              <li>1. Make the bank transfer</li>
              <li>2. Upload your payment receipt</li>
              <li>3. We&apos;ll verify your payment within 24 hours</li>
              <li>4. Your order will be processed and shipped</li>
            </ol>
          </div>

          {order.paymentReceiptUrl ? (
            <div className="mt-6 border-t border-border pt-6">
              <p className="text-sm font-medium text-foreground">
                Payment Receipt
              </p>
              <p className="mt-2 text-sm text-green-600">
                Receipt uploaded. We&apos;ll verify your payment shortly.
              </p>
            </div>
          ) : order.status === "PENDING_PAYMENT" ? (
            <ReceiptUpload reference={order.reference} />
          ) : null}
        </div>

        <div className="mt-8 text-center">
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
