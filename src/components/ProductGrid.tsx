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
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-4 py-2 text-sm transition-colors ${
            selectedCategory === "All"
              ? "text-white"
              : "text-muted hover:text-foreground"
          }`}
          style={selectedCategory === "All" ? { backgroundColor: "#BF00FF" } : undefined}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-sm transition-colors ${
              selectedCategory === category
                ? "text-white"
                : "text-muted hover:text-foreground"
            }`}
            style={selectedCategory === category ? { backgroundColor: "#BF00FF" } : undefined}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-12 text-center text-muted">
          No products in this category.
        </p>
      )}
    </div>
  );
}
