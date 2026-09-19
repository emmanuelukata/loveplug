"use client";

import Link from "next/link";
import Container from "./Container";

const featuredProducts = [
  { name: "Air Suction", category: "Pressure Toys", price: "₦15,000", image: "/products/air-suction.jpg", slug: "air-sucction" },
  { name: "G-spot Vibrator", category: "Vibrators", price: "₦18,000", image: "/products/g-spot-vibrator.jpg", slug: "g-spot-vibrator" },
  { name: "Couple Toys", category: "Couples", price: "₦22,000", image: "/products/couple-toys.jpg", slug: "couple-toys" },
];

export default function CTA() {
  return (
    <>
      {/* Featured Products */}
      <section id="featured" className="py-20 md:py-28" style={{ backgroundColor: "#0d0509" }}>
        <Container>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em]" style={{ color: "#ff2e88" }}>Best Sellers</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl" style={{ fontFamily: "var(--font-display)", color: "#f8eef3" }}>
                Featured products
              </h2>
            </div>
            <Link href="/products" className="hidden text-sm font-medium transition-colors hover:opacity-80 md:block" style={{ color: "#ff2e88" }}>
              View all &rarr;
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <Link key={product.slug} href={`/products/${product.slug}`} className="group">
                <div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: "#180a12" }}>
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(to top, rgba(13,5,9,0.6), transparent)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-block px-6 py-2 text-xs font-semibold uppercase tracking-wider text-white" style={{ backgroundColor: "#ff2e88" }}>Quick Add</span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-wider" style={{ color: "#8c7180" }}>{product.category}</p>
                  <h3 className="mt-1 text-base font-medium" style={{ color: "#f8eef3" }}>{product.name}</h3>
                  <p className="mt-1 text-sm font-medium" style={{ color: "#ff2e88" }}>{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center md:hidden">
            <Link href="/products" className="inline-block text-sm font-medium transition-colors hover:opacity-80" style={{ color: "#ff2e88" }}>
              View all products &rarr;
            </Link>
          </div>
        </Container>
      </section>

      {/* Brand Story */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#180a12" }}>
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em]" style={{ color: "#ff2e88" }}>Our Story</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight md:text-4xl" style={{ fontFamily: "var(--font-display)", color: "#f8eef3" }}>
                Modern intimacy,<br />redefined.
              </h2>
              <p className="mt-6 text-lg leading-relaxed" style={{ color: "#c9a9ba" }}>
                Loveplug is built at the intersection of design, health, and culture. We make intimacy simple, inclusive, and essential to everyday wellbeing.
              </p>
              <div className="mt-8">
                <Link href="/products" className="inline-block px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:opacity-90" style={{ backgroundColor: "#ff2e88" }}>
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: "#22101a" }}>
              <img src="/products/g-spot-vibrator.jpg" alt="Loveplug product" className="h-full w-full object-cover" />
            </div>
          </div>
        </Container>
      </section>

      {/* Trust Bar */}
      <section className="py-12" style={{ borderTop: "1px solid #3d1e2c", borderBottom: "1px solid #3d1e2c", backgroundColor: "#0d0509" }}>
        <Container>
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#f8eef3" }}>Nationwide Delivery</h3>
              <p className="mt-2 text-sm" style={{ color: "#8c7180" }}>We ship to every state in Nigeria. Fast and reliable.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#f8eef3" }}>Secure Payment</h3>
              <p className="mt-2 text-sm" style={{ color: "#8c7180" }}>Bank transfer with manual verification for your security.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#f8eef3" }}>Exchange Policy</h3>
              <p className="mt-2 text-sm" style={{ color: "#8c7180" }}>Not satisfied? Exchange defective products hassle-free.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#0d0509" }}>
        <Container className="max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl" style={{ fontFamily: "var(--font-display)", color: "#f8eef3" }}>
            Stay in the loop
          </h2>
          <p className="mt-4 leading-relaxed" style={{ color: "#8c7180" }}>
            Sign up for updates, promotions, and early access to new products.
          </p>
          <form className="mt-8 flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" className="flex-1 px-5 py-4 text-sm outline-none" style={{ border: "1px solid #3d1e2c", color: "#f8eef3", backgroundColor: "#180a12" }} />
            <button type="submit" className="px-8 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all hover:opacity-90" style={{ backgroundColor: "#ff2e88", color: "#f8eef3" }}>
              Subscribe
            </button>
          </form>
        </Container>
      </section>
    </>
  );
}
