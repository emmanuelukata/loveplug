"use client";

import Link from "next/link";
import Container from "./Container";

const featuredProducts = [
  {
    name: "Air Suction",
    category: "Pressure Toys",
    price: "₦15,000",
    image: "/products/air-suction.jpg",
    slug: "air-sucction",
  },
  {
    name: "G-spot Vibrator",
    category: "Vibrators",
    price: "₦18,000",
    image: "/products/g-spot-vibrator.jpg",
    slug: "g-spot-vibrator",
  },
  {
    name: "Couple Toys",
    category: "Couples",
    price: "₦22,000",
    image: "/products/couple-toys.jpg",
    slug: "couple-toys",
  },
];

export default function CTA() {
  return (
    <>
      {/* Featured Products */}
      <section id="featured" className="py-20 md:py-28">
        <Container>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Best Sellers
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Featured products
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden text-sm font-medium text-primary transition-colors hover:text-accent-hover md:block"
            >
              View all &rarr;
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-border">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-block bg-primary px-6 py-2 text-xs font-semibold uppercase tracking-wider text-tertiary">
                      Quick Add
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-wider text-muted">
                    {product.category}
                  </p>
                  <h3 className="mt-1 text-base font-medium text-foreground">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-primary font-medium">
                    {product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link
              href="/products"
              className="inline-block text-sm font-medium text-primary transition-colors hover:text-accent-hover"
            >
              View all products &rarr;
            </Link>
          </div>
        </Container>
      </section>

      {/* Brand Story */}
      <section className="bg-secondary py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Our Story
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-tertiary md:text-4xl">
                Modern intimacy,
                <br />
                redefined.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-tertiary/70">
                Loveplug is built at the intersection of design, health, and culture. We make intimacy simple, inclusive, and essential to everyday wellbeing.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-block bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-wider text-tertiary transition-all hover:bg-accent-hover"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="/products/g-spot-vibrator.jpg"
                alt="Loveplug product"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-border py-12">
        <Container>
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Nationwide Delivery
              </h3>
              <p className="mt-2 text-sm text-muted">
                We ship to every state in Nigeria. Fast and reliable.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Secure Payment
              </h3>
              <p className="mt-2 text-sm text-muted">
                Bank transfer with manual verification for your security.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Exchange Policy
              </h3>
              <p className="mt-2 text-sm text-muted">
                Not satisfied? Exchange defective products hassle-free.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="py-20 md:py-28">
        <Container className="max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Stay in the loop
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Sign up for updates, promotions, and early access to new products.
          </p>
          <form className="mt-8 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-wider text-tertiary transition-colors hover:bg-accent-hover"
            >
              Subscribe
            </button>
          </form>
        </Container>
      </section>
    </>
  );
}
