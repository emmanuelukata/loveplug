import Link from "next/link";
import Container from "./Container";

export default function Hero() {
  return (
    <section className="py-24 md:py-32">
      <Container className="max-w-2xl text-center">
        <h1 className="text-4xl font-light tracking-tight text-foreground md:text-5xl">
          Quality essentials,
          <br />
          thoughtfully made
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          Discover our curated collection of lifestyle and wellness products.
          Simple, premium, and made for you.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-block bg-accent px-8 py-3 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
        >
          Shop Now
        </Link>
      </Container>
    </section>
  );
}
