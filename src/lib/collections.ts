export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export const collections: Collection[] = [
  {
    id: "date-night",
    name: "Date Night",
    slug: "date-night",
    description: "Set the mood for a romantic evening together.",
  },
  {
    id: "vacation",
    name: "Vacation",
    slug: "vacation",
    description: "Compact essentials for getaways and travel.",
  },
  {
    id: "gift-ideas",
    name: "Gift Ideas",
    slug: "gift-ideas",
    description: "Thoughtful gifts for someone special.",
  },
  {
    id: "beginner-couples",
    name: "Beginner Couples",
    slug: "beginner-couples",
    description: "Approachable products for couples just starting out.",
  },
  {
    id: "premium-couples",
    name: "Premium Couples",
    slug: "premium-couples",
    description: "Elevated experiences for discerning couples.",
  },
  {
    id: "new-arrivals",
    name: "New Arrivals",
    slug: "new-arrivals",
    description: "The latest additions to our collection.",
  },
  {
    id: "featured",
    name: "Featured",
    slug: "featured",
    description: "Our hand-picked selection of standout products.",
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
