import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Midnight Oud Candle",
    slug: "midnight-oud-candle",
    description:
      "Hand-poured soy candle with rich oud and warm amber notes. Burns for 40 hours.",
    price: 12500,
    category: "Candles",
    image: "/products/candle-1.svg",
    availability: "AVAILABLE",
  },
  {
    id: "2",
    name: "Vanilla Bean Candle",
    slug: "vanilla-bean-candle",
    description:
      "Creamy vanilla with hints of caramel and warm sandalwood. Clean-burning soy wax.",
    price: 10000,
    category: "Candles",
    image: "/products/candle-2.svg",
    availability: "AVAILABLE",
  },
  {
    id: "3",
    name: "Lavender Dreams Candle",
    slug: "lavender-dreams-candle",
    description:
      "Calming French lavender blended with soft cedarwood. Perfect for unwinding.",
    price: 10000,
    category: "Candles",
    image: "/products/candle-3.svg",
    availability: "UNAVAILABLE",
  },
  {
    id: "4",
    name: "Glow Serum",
    slug: "glow-serum",
    description:
      "Lightweight vitamin C serum with hyaluronic acid. Brightens and hydrates.",
    price: 18500,
    category: "Skincare",
    image: "/products/serum-1.svg",
    availability: "AVAILABLE",
  },
  {
    id: "5",
    name: "Rose Water Mist",
    slug: "rose-water-mist",
    description:
      "Pure rose water facial mist. Hydrates, tones, and refreshes throughout the day.",
    price: 8500,
    category: "Skincare",
    image: "/products/mist-1.svg",
    availability: "AVAILABLE",
  },
  {
    id: "6",
    name: "Shea Body Butter",
    slug: "shea-body-butter",
    description:
      "Rich, nourishing body butter made with raw shea butter and coconut oil.",
    price: 7500,
    category: "Skincare",
    image: "/products/butter-1.svg",
    availability: "AVAILABLE",
  },
  {
    id: "7",
    name: "Relaxation Bath Salts",
    slug: "relaxation-bath-salts",
    description:
      "Epsom salts infused with lavender and chamomile essential oils. Soothes tired muscles.",
    price: 6500,
    category: "Bath",
    image: "/products/salts-1.svg",
    availability: "AVAILABLE",
  },
  {
    id: "8",
    name: "Charcoal Soap Bar",
    slug: "charcoal-soap-bar",
    description:
      "Activated charcoal soap with tea tree oil. Deep cleansing for all skin types.",
    price: 3500,
    category: "Bath",
    image: "/products/soap-1.svg",
    availability: "AVAILABLE",
  },
];

export const categories = [...new Set(products.map((p) => p.category))];
