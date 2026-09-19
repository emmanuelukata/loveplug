"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { useCart } from "@/lib/cart-context";
import QuantitySelector from "./QuantitySelector";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const isUnavailable = product.availability === "UNAVAILABLE";

  const handleAddToCart = () => {
    addItem(
      {
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.image,
      },
      quantity,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      <Link
        href="/products"
        className="mb-6 inline-flex items-center gap-1 text-sm transition-colors"
        style={{ color: "#8c7180" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#f8eef3")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#8c7180")}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to Shop
      </Link>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
      <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: "#3d1e2c" }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      <div className="flex flex-col">
        <p className="text-xs uppercase tracking-wider" style={{ color: "#8c7180" }}>
          {product.category}
        </p>
        <h1
          className="mt-2 text-2xl font-bold tracking-tight md:text-3xl"
          style={{ color: "#f8eef3", fontFamily: "var(--font-display)" }}
        >
          {product.name}
        </h1>
        <p className="mt-3 text-lg font-medium" style={{ color: "#ff2e88" }}>
          {formatPrice(product.price)}
        </p>
        <p className="mt-6 leading-relaxed" style={{ color: "#8c7180" }}>
          {product.description}
        </p>

        {isUnavailable ? (
          <p className="mt-8 text-sm font-medium uppercase tracking-wider" style={{ color: "#8c7180" }}>
            Currently unavailable
          </p>
        ) : (
          <div className="mt-8">
            <label className="text-sm" style={{ color: "#8c7180" }}>Quantity</label>
            <div className="mt-2">
              <QuantitySelector value={quantity} onChange={setQuantity} />
            </div>
            <button
              onClick={handleAddToCart}
              className="mt-4 px-8 py-3 text-sm font-semibold uppercase tracking-wider transition-all"
              style={{
                backgroundColor: added ? "#16a34a" : "#ff2e88",
                color: "#f8eef3",
              }}
            >
              {added ? "✓ Added to Cart" : "Add to Cart"}
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
