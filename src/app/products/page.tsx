import Container from "@/components/Container";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/lib/products";

export const metadata = {
  title: "Shop",
};

export default function ProductsPage() {
  return (
    <Container className="py-12 md:py-20">
      <h1 style={{ color: "#f8eef3", fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700 }}>
        Shop
      </h1>
      <p style={{ color: "#8c7180", marginTop: 8 }}>
        Browse our curated collection
      </p>
      <div style={{ marginTop: 32 }}>
        <ProductGrid products={products} />
      </div>
    </Container>
  );
}
