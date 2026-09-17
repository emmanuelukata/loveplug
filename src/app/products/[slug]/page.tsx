import { notFound } from "next/navigation";
import Container from "@/components/Container";
import ProductInfo from "@/components/ProductInfo";
import { products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return {
    title: product?.name ?? "Product",
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <Container className="py-8 md:py-16">
      <ProductInfo product={product} />
    </Container>
  );
}
