"use client";

export default function QuantitySelector({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="inline-flex items-center" style={{ border: "1px solid #3d1e2c" }}>
      <button onClick={() => onChange(Math.max(1, value - 1))} className="px-3 py-1.5 text-sm transition-colors hover:text-white" style={{ color: "#8c7180" }} aria-label="Decrease quantity">−</button>
      <span className="min-w-[2rem] px-2 py-1.5 text-center text-sm tabular-nums" style={{ color: "#f8eef3" }}>{value}</span>
      <button onClick={() => onChange(value + 1)} className="px-3 py-1.5 text-sm transition-colors hover:text-white" style={{ color: "#8c7180" }} aria-label="Increase quantity">+</button>
    </div>
  );
}
