"use client";

import { useState, useMemo } from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

type SortOption = "featured" | "newest" | "price-low" | "price-high";

export default function ProductGrid({ products, categories }: { products: Product[]; categories: string[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const filtered = useMemo(() => {
    const base = selectedCategory === "All" ? products : products.filter((p) => p.category === selectedCategory);

    const sorted = [...base];
    switch (sortBy) {
      case "featured":
        sorted.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        break;
      case "newest":
        sorted.sort((a, b) => Number(b.id) - Number(a.id));
        break;
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
    }
    return sorted;
  }, [products, selectedCategory, sortBy]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1">
        <button
          onClick={() => setSelectedCategory("All")}
          className="px-5 py-2.5 text-sm transition-colors"
          style={{ color: selectedCategory === "All" ? "#ff2e88" : "#8c7180", fontWeight: selectedCategory === "All" ? 700 : 500 }}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className="px-5 py-2.5 text-sm transition-colors"
            style={{ color: selectedCategory === category ? "#ff2e88" : "#8c7180", fontWeight: selectedCategory === category ? 700 : 500 }}
          >
            {category}
          </button>
        ))}
        <div className="ml-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 text-sm outline-none"
            style={{
              backgroundColor: "transparent",
              border: "1px solid #3d1e2c",
              color: "#c9a9ba",
              borderRadius: 9999,
            }}
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-12 text-center" style={{ color: "#8c7180" }}>No products in this category.</p>
      )}
    </div>
  );
}
