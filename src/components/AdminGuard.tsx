"use client";

import { useState } from "react";
import Container from "@/components/Container";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "loveplug2026";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      setError("Invalid password");
    }
  };

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <Container className="py-24 text-center">
      <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#f8eef3" }}>
        Admin Access
      </h1>
      <p className="mt-4" style={{ color: "#8c7180" }}>Enter the admin password to continue.</p>
      <form onSubmit={handleSubmit} className="mt-8 mx-auto max-w-sm space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(""); }}
          placeholder="Password"
          className="w-full px-4 py-3 text-sm outline-none transition-colors"
          style={{ border: "1px solid #3d1e2c", backgroundColor: "transparent", color: "#f8eef3" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#f8eef3")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#3d1e2c")}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full text-sm font-semibold uppercase tracking-wider transition-all hover:opacity-90"
          style={{ backgroundColor: "#ff2e88", color: "#f8eef3", padding: "14px 32px", borderRadius: 9999 }}
        >
          Enter
        </button>
      </form>
    </Container>
  );
}
