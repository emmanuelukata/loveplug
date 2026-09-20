"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartIcon() {
  const { itemCount } = useCart();
  return (
    <Link href="/cart" style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#c9a9ba" }}>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
        <line x1="3" x2="21" y1="6" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
      {itemCount > 0 && (
        <span style={{
          position: "absolute",
          top: -6,
          right: -8,
          minWidth: 18,
          height: 18,
          borderRadius: 9999,
          backgroundColor: "#ff2e88",
          color: "#ffffff",
          fontSize: 10,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 4px",
          lineHeight: 1,
        }}>{itemCount}</span>
      )}
    </Link>
  );
}
