import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center" style={{ backgroundColor: "#0d0509" }}>
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/products/heroImage/forHeroSection.jpg)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,5,9,0.85), rgba(13,5,9,0.5))" }} />
      <div className="relative z-10 mx-auto w-full max-w-[var(--container-max)] px-[var(--container-padding)]">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em]" style={{ color: "#ff2e88" }}>Modern wellness essentials</p>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl" style={{ fontFamily: "var(--font-display)", color: "#f8eef3" }}>
            Set the mood,<br /><span style={{ color: "#ff2e88" }}>any room.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: "#c9a9ba" }}>
            Premium lifestyle and wellness products designed for pleasure, comfort, and confidence. Simple, effective, and made for you.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/products" className="inline-block px-10 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:scale-105" style={{ backgroundColor: "#ff2e88" }}>
              Shop Now
            </Link>
            <Link href="#featured" className="inline-block px-10 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all hover:bg-white hover:text-black" style={{ color: "#f8eef3", border: "2px solid #f8eef3" }}>
              View Collection
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: "#ff2e88" }} />
    </section>
  );
}
