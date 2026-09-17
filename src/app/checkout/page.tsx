import Container from "@/components/Container";

export const metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-3xl font-light tracking-tight text-foreground">
        Checkout
      </h1>
      <p className="mt-4 text-muted">Checkout coming soon</p>
    </Container>
  );
}
