import Container from "@/components/Container";
import ProductGrid from "@/components/ProductGrid";
import { products, categories } from "@/lib/products";

export const metadata = {
  title: "Products",
};

export default function ProductsPage() {
  return (
    <Container className="py-12 md:py-20">
      <h1 className="text-3xl font-light tracking-tight text-foreground">
        Shop
      </h1>
      <p className="mt-2 text-muted">
        Browse our curated collection
      </p>
      <div className="mt-8">
        <ProductGrid products={products} categories={categories} />
      </div>
    </Container>
  );
}
