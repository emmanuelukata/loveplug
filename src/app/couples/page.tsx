import Container from "@/components/Container";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/lib/products";
import { getCategoryBySlug } from "@/lib/categories";

export const metadata = { title: "Couples" };

export default function CouplesPage() {
  const category = getCategoryBySlug("couples");
  const filtered = products.filter((p) => p.categoryId === "couples");
  return (
    <Container className="py-12 md:py-20">
      <h1 style={{ color: "#f8eef3", fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700 }}>{category?.name}</h1>
      <p style={{ color: "#8c7180", marginTop: 8 }}>{category?.description}</p>
      <div style={{ marginTop: 32 }}>
        <ProductGrid products={filtered} />
      </div>
    </Container>
  );
}
