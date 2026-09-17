import Link from "next/link";
import Container from "./Container";

export default function Header() {
  return (
    <header className="border-b border-border">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-medium tracking-tight">
          Store
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted">
          <Link href="/products" className="transition-colors hover:text-foreground">
            Shop
          </Link>
          <Link href="/cart" className="transition-colors hover:text-foreground">
            Cart
          </Link>
        </nav>
      </Container>
    </header>
  );
}
