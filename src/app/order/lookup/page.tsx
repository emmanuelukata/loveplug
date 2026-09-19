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
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#f8eef3" }}>
          Track Your Order
        </h1>
        <p className="mt-4 leading-relaxed" style={{ color: "#8c7180" }}>
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
              className="w-full px-4 py-3 text-center text-sm tracking-wider outline-none transition-colors"
              style={{ border: "1px solid #3d1e2c", backgroundColor: "transparent", color: "#f8eef3" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#f8eef3")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#3d1e2c")}
            />
            {error && (
              <p className="mt-2 text-xs text-red-500">{error}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full text-sm font-semibold uppercase tracking-wider transition-all hover:opacity-90"
            style={{ backgroundColor: "#ff2e88", color: "#f8eef3", padding: "14px 32px" }}
          >
            Track Order
          </button>
        </form>
      </div>
    </Container>
  );
}
