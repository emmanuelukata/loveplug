import Link from "next/link";
import Container from "./Container";

export default function CTA() {
  return (
    <section className="py-24 md:py-32">
      <Container className="max-w-xl text-center">
        <h2 className="text-3xl font-light tracking-tight text-foreground">
          Ready to explore?
        </h2>
        <p className="mt-4 text-muted leading-relaxed">
          Browse our collection and find something you love.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-block bg-accent px-8 py-3 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
        >
          View Collection
        </Link>
      </Container>
    </section>
  );
}
