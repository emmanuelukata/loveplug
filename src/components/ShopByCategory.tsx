"use client";

import Link from "next/link";
import { categories } from "@/lib/categories";
import ScrollReveal from "./ScrollReveal";

export default function ShopByCategory() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#180a12" }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em]" style={{ color: "#ff2e88" }}>
              Browse
            </p>
            <h2
              className="mt-3 text-3xl font-bold tracking-tight md:text-4xl"
              style={{ fontFamily: "var(--font-display)", color: "#f8eef3" }}
            >
              Shop by Category
            </h2>
          </div>
        </ScrollReveal>
        <ScrollReveal stagger className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <Link key={category.id} href={`/${category.slug}`}>
              <div
                className="group flex items-center justify-center py-10 text-center transition-transform duration-300 hover:scale-105"
                style={{
                  backgroundColor: "#180a12",
                  border: "1px solid #3d1e2c",
                  borderRadius: 12,
                  minHeight: 160,
                }}
              >
                <span
                  className="text-base font-semibold tracking-wide transition-colors duration-300 group-hover:text-[#ff2e88]"
                  style={{ color: "#f8eef3" }}
                >
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
