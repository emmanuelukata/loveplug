"use client";

export default function QuantitySelector({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid #3d1e2c", borderRadius: 9999, overflow: "hidden" }}>
      <button onClick={() => onChange(Math.max(1, value - 1))} style={{ padding: "8px 16px", fontSize: 14, color: "#8c7180", background: "none", border: "none", cursor: "pointer" }} aria-label="Decrease quantity">−</button>
      <span style={{ minWidth: 40, padding: "8px 8px", textAlign: "center", fontSize: 14, fontVariantNumeric: "tabular-nums", color: "#f8eef3" }}>{value}</span>
      <button onClick={() => onChange(value + 1)} style={{ padding: "8px 16px", fontSize: 14, color: "#8c7180", background: "none", border: "none", cursor: "pointer" }} aria-label="Increase quantity">+</button>
    </div>
  );
}
