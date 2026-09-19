"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart, CartItem as CartItemType } from "@/lib/cart-context";
import QuantitySelector from "./QuantitySelector";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-4">
      <Link
        href={`/products/${item.slug}`}
        className="relative h-24 w-24 flex-shrink-0 overflow-hidden"
        style={{ backgroundColor: "#3d1e2c" }}
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </Link>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link
            href={`/products/${item.slug}`}
            className="text-sm font-medium hover:underline"
            style={{ color: "#f8eef3" }}
          >
            {item.name}
          </Link>
          <p className="mt-0.5 text-sm" style={{ color: "#8c7180" }}>
            {formatPrice(item.price)}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <QuantitySelector
            value={item.quantity}
            onChange={(q) => updateQuantity(item.productId, q)}
          />
          <button
            onClick={() => removeItem(item.productId)}
            className="text-xs transition-colors"
            style={{ color: "#8c7180" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f8eef3")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8c7180")}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
