export type Availability = "AVAILABLE" | "UNAVAILABLE";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  image: string;
  availability: Availability;
}
