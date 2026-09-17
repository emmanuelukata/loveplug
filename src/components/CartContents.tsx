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
        <h1 className="text-3xl font-light tracking-tight text-foreground">
          Your Cart
        </h1>
        <p className="mt-4 text-muted">Your cart is empty</p>
        <Link
          href="/products"
          className="mt-8 inline-block bg-accent px-8 py-3 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
        >
          Continue Shopping
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-12 md:py-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-light tracking-tight text-foreground">
          Your Cart
        </h1>
        <button
          onClick={clearCart}
          className="text-xs text-muted transition-colors hover:text-foreground"
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
          <p className="text-lg font-medium text-foreground">
            {formatPrice(total)}
          </p>
        </div>
        <Link
          href="/checkout"
          className="mt-6 block w-full bg-accent py-3 text-center text-sm font-medium text-background transition-colors hover:bg-accent-hover"
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
