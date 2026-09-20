import Link from "next/link";
import Container from "@/components/Container";
import { collections } from "@/lib/collections";

export const metadata = { title: "Collections" };

export default function CollectionsPage() {
  return (
    <Container className="py-12 md:py-20">
      <h1 style={{ color: "#f8eef3", fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700 }}>Collections</h1>
      <p style={{ color: "#8c7180", marginTop: 8 }}>Browse our curated collections.</p>
      <div style={{ marginTop: 32 }} className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.slug}`}
            style={{
              backgroundColor: "#180a12",
              border: "1px solid #3d1e2c",
              borderRadius: 12,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              transition: "background-color 0.2s, border-color 0.2s",
            }}
            className="hover:border-[#ff2e88]"
          >
            <h2 style={{ color: "#f8eef3", fontSize: "1.125rem", fontWeight: 600 }}>{collection.name}</h2>
            <p style={{ color: "#8c7180", fontSize: "0.875rem" }}>{collection.description}</p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
