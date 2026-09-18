"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";

export default function OrderLookupPage() {
  const router = useRouter();
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference.trim()) {
      setError("Please enter your order reference");
      return;
    }
    router.push(`/order/${reference.trim()}`);
  };

  return (
    <Container className="py-24 md:py-32">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Track Your Order
        </h1>
        <p className="mt-4 text-muted leading-relaxed">
          Enter your order reference to check your order status.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <input
              type="text"
              value={reference}
              onChange={(e) => {
                setReference(e.target.value);
                setError("");
              }}
              placeholder="e.g. ORD-M1K5X3-AB2F"
              className="w-full border border-border bg-transparent px-4 py-3 text-center text-sm tracking-wider text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-foreground"
            />
            {error && (
              <p className="mt-2 text-xs text-red-500">{error}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "#BF00FF" }}
          >
            Track Order
          </button>
        </form>
      </div>
    </Container>
  );
}
