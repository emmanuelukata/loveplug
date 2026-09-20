"use client";

import { useState, useMemo } from "react";
import { Product } from "@/types/product";
import { categories } from "@/lib/categories";
import ProductCard from "./ProductCard";

type SortOption = "featured" | "newest" | "price-low" | "price-high";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

export default function ProductGrid({ products }: { products: Product[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const filtered = useMemo(() => {
    let result = selectedCategory === "all" ? products : products.filter((p) => p.categoryId === selectedCategory);

    switch (sortBy) {
      case "newest":
        result = [...result].sort((a, b) => Number(b.id) - Number(a.id));
        break;
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "featured":
      default:
        result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    return result;
  }, [products, selectedCategory, sortBy]);

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          <button
            onClick={() => setSelectedCategory("all")}
            style={{
              padding: "10px 20px",
              fontSize: 14,
              fontWeight: selectedCategory === "all" ? 700 : 500,
              color: selectedCategory === "all" ? "#ff2e88" : "#8c7180",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: "10px 20px",
                fontSize: 14,
                fontWeight: selectedCategory === cat.id ? 700 : 500,
                color: selectedCategory === cat.id ? "#ff2e88" : "#8c7180",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          style={{
            padding: "8px 12px",
            fontSize: 13,
            color: "#c9a9ba",
            backgroundColor: "transparent",
            border: "1px solid #3d1e2c",
            borderRadius: 8,
            cursor: "pointer",
            outline: "none",
          }}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} style={{ backgroundColor: "#180a12", color: "#f8eef3" }}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="product-grid" style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px 16px" }}>
        <style>{`
          @media (min-width: 640px) { .product-grid { grid-template-columns: repeat(3, 1fr) !important; } }
          @media (min-width: 1024px) { .product-grid { grid-template-columns: repeat(4, 1fr) !important; } }
        `}</style>
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p style={{ marginTop: 48, textAlign: "center", color: "#8c7180" }}>No products in this category.</p>
      )}
    </div>
  );
}
