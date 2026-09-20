import { notFound } from "next/navigation";
import Container from "@/components/Container";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/lib/products";
import { collections, getCollectionBySlug } from "@/lib/collections";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  return { title: collection?.name ?? "Collection" };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const filtered = products.filter((p) => p.collections?.includes(slug));

  return (
    <Container className="py-12 md:py-20">
      <h1 style={{ color: "#f8eef3", fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700 }}>{collection.name}</h1>
      <p style={{ color: "#8c7180", marginTop: 8 }}>{collection.description}</p>
      <div style={{ marginTop: 32 }}>
        <ProductGrid products={filtered} />
      </div>
    </Container>
  );
}
