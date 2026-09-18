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
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to Shop
      </Link>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
      <div className="relative aspect-square overflow-hidden bg-border">
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
        <p className="text-xs uppercase tracking-wider text-muted">
          {product.category}
        </p>
        <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-3xl">
          {product.name}
        </h1>
        <p className="mt-3 text-lg text-foreground">
          {formatPrice(product.price)}
        </p>
        <p className="mt-6 leading-relaxed text-muted">
          {product.description}
        </p>

        {isUnavailable ? (
          <p className="mt-8 text-sm font-medium uppercase tracking-wider text-muted">
            Currently unavailable
          </p>
        ) : (
          <div className="mt-8">
            <label className="text-sm text-muted">Quantity</label>
            <div className="mt-2">
              <QuantitySelector value={quantity} onChange={setQuantity} />
            </div>
            <button
              onClick={handleAddToCart}
              className={`mt-4 w-full px-8 py-3 text-sm font-medium transition-colors ${
                added
                  ? "bg-green-600 text-white"
                  : "bg-accent text-background hover:bg-accent-hover"
              }`}
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
