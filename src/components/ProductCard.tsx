import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(price);
}

export default function ProductCard({ product }: { product: Product }) {
  const isUnavailable = product.availability === "UNAVAILABLE";
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: "#180a12" }}>
        <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(to top, rgba(13,5,9,0.5), transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-block px-6 py-2 text-xs font-semibold uppercase tracking-wider text-white" style={{ backgroundColor: "#ff2e88" }}>Quick Add</span>
        </div>
        {isUnavailable && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(13,5,9,0.8)" }}>
            <span className="text-sm font-medium uppercase tracking-wider" style={{ color: "#8c7180" }}>Sold Out</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-xs uppercase tracking-wider" style={{ color: "#8c7180" }}>{product.category}</p>
        <h3 className="mt-1 text-base font-medium" style={{ color: "#f8eef3" }}>{product.name}</h3>
        <p className="mt-1 text-sm font-medium" style={{ color: "#ff2e88" }}>{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
