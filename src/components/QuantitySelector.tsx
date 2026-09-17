"use client";

export default function QuantitySelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center border border-border">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="min-w-[3rem] px-3 py-2 text-center text-sm tabular-nums">
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
