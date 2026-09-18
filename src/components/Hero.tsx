import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/products/couple-toys.jpg)" }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[var(--container-max)] px-[var(--container-padding)]">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#BF00FF]">
            Modern wellness essentials
          </p>
          <h1
            className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Set the mood,
            <br />
            <span className="text-[#BF00FF]">any room.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Premium lifestyle and wellness products designed for pleasure, comfort, and confidence. Simple, effective, and made for you.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="inline-block bg-[#BF00FF] px-10 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-[#9900CC] hover:scale-105"
            >
              Shop Now
            </Link>
            <Link
              href="#featured"
              className="inline-block border border-white/30 px-10 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:border-white hover:bg-white/10"
            >
              View Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#BF00FF]" />
    </section>
  );
}
