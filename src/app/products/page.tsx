import Container from "@/components/Container";

export const metadata = {
  title: "Products",
};

export default function ProductsPage() {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-3xl font-light tracking-tight text-foreground">
        Products
      </h1>
      <p className="mt-4 text-muted">Catalog coming soon</p>
    </Container>
  );
}
