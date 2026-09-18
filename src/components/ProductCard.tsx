import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function ProductCard({ product }: { product: Product }) {
  const isUnavailable = product.availability === "UNAVAILABLE";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-border">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-block px-6 py-2 text-xs font-semibold uppercase tracking-wider text-white" style={{ backgroundColor: "#BF00FF" }}>
            Quick Add
          </span>
        </div>
        {isUnavailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <span className="text-sm font-medium uppercase tracking-wider text-muted">
              Sold Out
            </span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-xs uppercase tracking-wider text-muted">
          {product.category}
        </p>
        <h3 className="mt-1 text-base font-medium text-foreground">
          {product.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-primary">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
