"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "./Container";
import CartIcon from "./CartIcon";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50" style={{ backgroundColor: "#0d0509", borderBottom: "1px solid #3d1e2c" }}>
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)", color: "#f8eef3" }}>
          loveplug
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex" style={{ color: "#c9a9ba" }}>
          <Link href="/products" className="transition-colors hover:text-white">Shop</Link>
          <Link href="/order/lookup" className="transition-colors hover:text-white">Track Order</Link>
          <CartIcon />
        </nav>
        <div className="flex items-center gap-4 md:hidden">
          <CartIcon />
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ color: "#c9a9ba" }} aria-label="Toggle menu">
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            )}
          </button>
        </div>
      </Container>
      {menuOpen && (
        <div className="md:hidden" style={{ backgroundColor: "#0d0509", borderTop: "1px solid #3d1e2c" }}>
          <Container className="flex flex-col gap-4 py-4 text-sm font-medium">
            <div style={{ color: "#c9a9ba" }}>
              <Link href="/products" onClick={() => setMenuOpen(false)} className="transition-colors hover:text-white">Shop</Link>
            </div>
            <div style={{ color: "#c9a9ba" }}>
              <Link href="/order/lookup" onClick={() => setMenuOpen(false)} className="transition-colors hover:text-white">Track Order</Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
