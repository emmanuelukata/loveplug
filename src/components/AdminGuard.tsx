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
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Admin Access
      </h1>
      <p className="mt-4 text-muted">Enter the admin password to continue.</p>
      <form onSubmit={handleSubmit} className="mt-8 mx-auto max-w-sm space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(""); }}
          placeholder="Password"
          className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground"
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-primary py-3 text-sm font-semibold uppercase tracking-wider text-tertiary transition-all hover:bg-accent-hover"
        >
          Enter
        </button>
      </form>
    </Container>
  );
}
