"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "./Container";
import CartIcon from "./CartIcon";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50" style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e0e0e0" }}>
      <Container className="flex items-center justify-between py-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-display)", color: "#111111" }}
        >
          loveplug
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex" style={{ color: "#111111" }}>
          <Link href="/products" className="transition-colors hover:opacity-70">
            Shop
          </Link>
          <Link href="/order/lookup" className="transition-colors hover:opacity-70">
            Track Order
          </Link>
          <CartIcon />
        </nav>

        {/* Mobile: cart + hamburger */}
        <div className="flex items-center gap-4 md:hidden">
          <CartIcon />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="transition-colors hover:opacity-70"
            style={{ color: "#111111" }}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </Container>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden" style={{ backgroundColor: "#ffffff", borderTop: "1px solid #e0e0e0" }}>
          <Container className="flex flex-col gap-4 py-4 text-sm font-medium">
            <Link href="/products" onClick={() => setMenuOpen(false)} className="transition-colors hover:opacity-70">
              Shop
            </Link>
            <Link href="/order/lookup" onClick={() => setMenuOpen(false)} className="transition-colors hover:opacity-70">
              Track Order
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
