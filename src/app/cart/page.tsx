import Container from "@/components/Container";

export const metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-3xl font-light tracking-tight text-foreground">
        Cart
      </h1>
      <p className="mt-4 text-muted">Cart coming soon</p>
    </Container>
  );
}
