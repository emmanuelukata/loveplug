import Link from "next/link";
import Container from "./Container";
import CartIcon from "./CartIcon";

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
          <CartIcon />
        </nav>
      </Container>
    </header>
  );
}
