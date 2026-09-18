"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  categories,
}: {
  products: Product[];
  categories: string[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filtered =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div>
      <div className="flex flex-wrap gap-1">
        <button
          onClick={() => setSelectedCategory("All")}
          className="px-5 py-2.5 text-sm transition-colors"
          style={{
            color: selectedCategory === "All" ? "#BF00FF" : "#555555",
            fontWeight: selectedCategory === "All" ? 700 : 500,
          }}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className="px-5 py-2.5 text-sm transition-colors"
            style={{
              color: selectedCategory === category ? "#BF00FF" : "#555555",
              fontWeight: selectedCategory === category ? 700 : 500,
            }}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-12 text-center" style={{ color: "#555555" }}>
          No products in this category.
        </p>
      )}
    </div>
  );
}
