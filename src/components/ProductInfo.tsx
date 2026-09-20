"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { useCart } from "@/lib/cart-context";
import { products } from "@/lib/products";
import QuantitySelector from "./QuantitySelector";

const COLOR_MAP: Record<string, string> = {
  Rose: "#e8a0b4",
  Lavender: "#b8a9d4",
  Black: "#2a2a2a",
  "Skin Tone": "#d4a574",
};

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
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] ?? "");
  const [wishlisted, setWishlisted] = useState(false);
  const { addItem } = useCart();

  const isUnavailable = product.availability === "UNAVAILABLE";

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

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
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48 }}
        className="product-layout"
      >
        <style>{`
          @media (min-width: 768px) {
            .product-layout { grid-template-columns: 55% 1fr !important; }
          }
        `}</style>

        <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", backgroundColor: "#3d1e2c", borderRadius: 8 }}>
          {product.badge && (
            <span style={{
              position: "absolute",
              top: 16,
              left: 16,
              zIndex: 2,
              padding: "6px 14px",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#ff2e88",
              border: "1px solid #ff2e88",
              borderRadius: 999,
              backgroundColor: "rgba(13,5,9,0.7)",
              backdropFilter: "blur(4px)",
            }}>
              {product.badge}
            </span>
          )}
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 55vw"
            priority
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {product.badge && (
            <span style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              padding: "6px 14px",
              fontSize: 12,
              fontWeight: 500,
              color: "#ff2e88",
              border: "1px solid #3d1e2c",
              borderRadius: 999,
              letterSpacing: "0.04em",
            }}>
              {product.badge}
            </span>
          )}

          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            color: "#f8eef3",
            margin: 0,
          }}>
            {product.name}
          </h1>

          <p style={{ fontSize: "1.5rem", fontWeight: 600, color: "#ff2e88", margin: 0 }}>
            {formatPrice(product.price)}
          </p>

          <p style={{ lineHeight: 1.7, color: "#c9a9ba", margin: 0 }}>
            {product.description}
          </p>

          {isUnavailable ? (
            <p style={{ fontSize: 13, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8c7180", margin: 0, marginTop: 16 }}>
              Currently unavailable
            </p>
          ) : (
            <>
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <label style={{ fontSize: 14, color: "#c9a9ba" }}>
                    Size · <span style={{ color: "#f8eef3" }}>{selectedSize}</span>
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                    {product.sizes.map((size) => {
                      const isSelected = size === selectedSize;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          style={{
                            padding: "10px 20px",
                            fontSize: 13,
                            fontWeight: 500,
                            border: isSelected ? "none" : "1px solid #3d1e2c",
                            borderRadius: 999,
                            cursor: "pointer",
                            backgroundColor: isSelected ? "#f8eef3" : "transparent",
                            color: isSelected ? "#0d0509" : "#c9a9ba",
                            transition: "all 0.15s",
                          }}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {product.colors && product.colors.length > 0 && (
                <div>
                  <label style={{ fontSize: 14, color: "#c9a9ba" }}>
                    Color · <span style={{ color: "#f8eef3" }}>{selectedColor}</span>
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                    {product.colors.map((color) => {
                      const isSelected = color === selectedColor;
                      return (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "10px 18px",
                            fontSize: 13,
                            fontWeight: 500,
                            border: isSelected ? "1px solid #ff2e88" : "1px solid #3d1e2c",
                            borderRadius: 999,
                            cursor: "pointer",
                            backgroundColor: isSelected ? "rgba(255,46,136,0.08)" : "transparent",
                            color: isSelected ? "#f8eef3" : "#c9a9ba",
                            transition: "all 0.15s",
                          }}
                        >
                          <span style={{
                            width: 14,
                            height: 14,
                            borderRadius: "50%",
                            backgroundColor: COLOR_MAP[color] ?? "#8c7180",
                            border: "1px solid rgba(255,255,255,0.15)",
                            flexShrink: 0,
                          }} />
                          {color}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <label style={{ fontSize: 14, color: "#c9a9ba" }}>Quantity</label>
                <div style={{ marginTop: 10 }}>
                  <QuantitySelector value={quantity} onChange={setQuantity} />
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <button
                  onClick={handleAddToCart}
                  style={{
                    flex: 1,
                    padding: "14px 32px",
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    backgroundColor: added ? "#16a34a" : "#ff2e88",
                    color: "#f8eef3",
                    transition: "all 0.15s",
                  }}
                >
                  {added ? "✓ Added to Cart" : "Add to Cart"}
                </button>
                <button
                  onClick={() => setWishlisted((w) => !w)}
                  style={{
                    width: 50,
                    height: 50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #3d1e2c",
                    borderRadius: 8,
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    color: wishlisted ? "#ff2e88" : "#c9a9ba",
                    transition: "all 0.15s",
                    flexShrink: 0,
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                    fill={wishlisted ? "#ff2e88" : "none"}
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div style={{ marginTop: 64 }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#f8eef3",
            marginBottom: 24,
          }}>
            You may also like
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.slug}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#180a12",
                  borderRadius: 8,
                  overflow: "hidden",
                  textDecoration: "none",
                  transition: "transform 0.15s",
                }}
              >
                <div style={{ position: "relative", aspectRatio: "1/1", backgroundColor: "#22101a" }}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#f8eef3", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.name}
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "#ff2e88", margin: "6px 0 0" }}>
                    {formatPrice(item.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
