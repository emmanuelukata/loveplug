export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  subcategories: string[];
}

export const categories: Category[] = [
  {
    id: "couples",
    name: "Couples",
    slug: "couples",
    description: "Products designed for shared pleasure and intimacy.",
    subcategories: ["Couple Toys", "Massage & Sensory", "Games & Conversation", "Couples Kits"],
  },
  {
    id: "men",
    name: "Men",
    slug: "men",
    description: "Products crafted for male pleasure and wellness.",
    subcategories: ["Massagers", "Rings", "Sleeves & Strokers", "Accessories"],
  },
  {
    id: "women",
    name: "Women",
    slug: "women",
    description: "Products designed for female pleasure and wellness.",
    subcategories: ["Bullet Vibrators", "Stimulators", "G-Spot Vibrators", "Rabbit Vibrators", "Wand Massagers", "Wearable Vibrators", "Remote-Controlled Vibrators"],
  },
  {
    id: "lubricants-care",
    name: "Lubricants & Care",
    slug: "lubricants-care",
    description: "Lubricants, cleaners, and intimate care products.",
    subcategories: ["Lubricants", "Cleaning", "Intimate Care", "Storage"],
  },
  {
    id: "date-night-gifts",
    name: "Date Night & Gifts",
    slug: "date-night-gifts",
    description: "Curated products for romantic occasions and gifting.",
    subcategories: ["Date Night", "Vacation", "Conversation & Games", "Massage & Sensory", "Gift Boxes"],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
