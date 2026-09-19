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
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full" style={{ border: "1px solid #3d1e2c" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#8c7180" }}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#f8eef3" }}>
          Your Cart
        </h1>
        <p className="mt-4" style={{ color: "#8c7180" }}>Your cart is empty</p>
        <Link
          href="/products"
          className="mt-8 inline-block px-8 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all hover:opacity-90"
          style={{ backgroundColor: "#ff2e88", color: "#f8eef3" }}
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
        className="mb-6 inline-flex items-center gap-1 text-sm transition-colors"
        style={{ color: "#8c7180" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#f8eef3")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#8c7180")}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Continue Shopping
      </Link>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#f8eef3" }}>
          Your Cart
        </h1>
        <button
          onClick={clearCart}
          className="text-xs font-medium transition-colors"
          style={{ color: "#8c7180" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#f8eef3")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#8c7180")}
        >
          Clear Cart
        </button>
      </div>

      <div className="mt-8" style={{ borderTop: "1px solid #3d1e2c" }}>
        {items.map((item) => (
          <CartItem key={item.productId} item={item} />
        ))}
      </div>

      <div className="mt-8 pt-6" style={{ borderTop: "1px solid #3d1e2c" }}>
        <div className="flex items-center justify-between">
          <p className="text-sm" style={{ color: "#8c7180" }}>
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
          <p className="text-lg font-bold" style={{ color: "#f8eef3" }}>
            {formatPrice(total)}
          </p>
        </div>
        <Link
          href="/checkout"
          className="mt-6 block w-full py-3.5 text-center text-sm font-semibold uppercase tracking-wider transition-all hover:opacity-90"
          style={{ backgroundColor: "#ff2e88", color: "#f8eef3" }}
        >
          Proceed to Checkout
        </Link>
        <Link
          href="/products"
          className="mt-3 block text-center text-sm transition-colors"
          style={{ color: "#8c7180" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#f8eef3")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#8c7180")}
        >
          Continue Shopping
        </Link>
      </div>
    </Container>
  );
}
