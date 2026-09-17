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
      <div className="relative aspect-square overflow-hidden bg-border">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {isUnavailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <span className="text-sm font-medium uppercase tracking-wider text-muted">
              Sold Out
            </span>
          </div>
        )}
      </div>
      <div className="mt-3">
        <p className="text-xs uppercase tracking-wider text-muted">
          {product.category}
        </p>
        <h3 className="mt-1 text-sm font-medium text-foreground">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
