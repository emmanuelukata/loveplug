import Container from "@/components/Container";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/lib/products";
import { getCategoryBySlug } from "@/lib/categories";

export const metadata = { title: "Women" };

export default function WomenPage() {
  const category = getCategoryBySlug("women");
  const filtered = products.filter((p) => p.categoryId === "women");
  return (
    <Container className="py-12 md:py-20">
      <h1 style={{ color: "#f8eef3", fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700 }}>{category?.name}</h1>
      <p style={{ color: "#8c7180", marginTop: 8 }}>{category?.description}</p>
      <div style={{ marginTop: 32 }}>
        <ProductGrid products={filtered} categories={category?.subcategories ?? []} />
      </div>
    </Container>
  );
}
