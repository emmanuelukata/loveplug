import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
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
    <div className="py-8 md:py-16">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <Breadcrumbs items={[
          { label: "Shop", href: "/products" },
          { label: product.name }
        ]} />
      </div>
      <ProductInfo product={product} />
    </div>
  );
}
