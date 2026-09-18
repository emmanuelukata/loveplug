"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import Container from "@/components/Container";
import CartItem from "@/components/CartItem";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function CartContents() {
  const { items, total, itemCount, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Container className="py-24 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-border">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Your Cart
        </h1>
        <p className="mt-4 text-muted">Your cart is empty</p>
        <Link
          href="/products"
          className="mt-8 inline-block bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-wider text-tertiary transition-all hover:bg-accent-hover"
        >
          Start Shopping
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-12 md:py-20">
      <Link
        href="/products"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Continue Shopping
      </Link>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Your Cart
        </h1>
        <button
          onClick={clearCart}
          className="text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          Clear Cart
        </button>
      </div>

      <div className="mt-8 border-t border-border">
        {items.map((item) => (
          <CartItem key={item.productId} item={item} />
        ))}
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
          <p className="text-lg font-bold text-foreground">
            {formatPrice(total)}
          </p>
        </div>
        <Link
          href="/checkout"
          className="mt-6 block w-full bg-primary py-3 text-center text-sm font-semibold uppercase tracking-wider text-tertiary transition-all hover:bg-accent-hover"
        >
          Proceed to Checkout
        </Link>
        <Link
          href="/products"
          className="mt-3 block text-center text-sm text-muted transition-colors hover:text-foreground"
        >
          Continue Shopping
        </Link>
      </div>
    </Container>
  );
}
