export type Availability = "AVAILABLE" | "UNAVAILABLE";

export interface ProductVariant {
  size?: string;
  color?: string;
  priceAdjustment?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  categoryId: string;
  productType: string;
  image: string;
  availability: Availability;
  badge?: string;
  featured?: boolean;
  sizes?: string[];
  colors?: string[];
  variants?: ProductVariant[];
  collections?: string[];
}
