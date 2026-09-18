import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-secondary text-tertiary">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[var(--container-max)] px-[var(--container-padding)]">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Modern wellness essentials
          </p>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
            Set the mood,
            <br />
            <span className="text-primary">any room.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-tertiary/70">
            Premium lifestyle and wellness products designed for pleasure, comfort, and confidence. Simple, effective, and made for you.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="inline-block bg-primary px-10 py-4 text-sm font-semibold uppercase tracking-wider text-tertiary transition-all hover:bg-accent-hover hover:scale-105"
            >
              Shop Now
            </Link>
            <Link
              href="#featured"
              className="inline-block border border-tertiary/30 px-10 py-4 text-sm font-semibold uppercase tracking-wider text-tertiary transition-all hover:border-tertiary hover:bg-tertiary/10"
            >
              View Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
    </section>
  );
}
