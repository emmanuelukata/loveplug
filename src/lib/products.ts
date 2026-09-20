import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Air Sucction",
    slug: "air-sucction",
    description:
      "Suction and pressure toy designed for intense, targeted stimulation. Body-safe silicone with multiple intensity levels.",
    price: 15000,
    category: "Air-suction/Pressure Toys",
    image: "/products/air-suction.jpg",
    availability: "AVAILABLE",
    badge: "Best Seller",
    sizes: ["S", "M", "L"],
    colors: ["Rose", "Lavender", "Black"],
  },
  {
    id: "2",
    name: "Dildo",
    slug: "dildo",
    description:
      "Classic design with a realistic feel. Made from premium body-safe silicone for comfortable, pleasurable use.",
    price: 12000,
    category: "Dildo",
    image: "/products/dildo.jpg",
    availability: "AVAILABLE",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Skin Tone", "Rose", "Black"],
  },
  {
    id: "3",
    name: "G-spot Vibrator",
    slug: "g-spot-vibrator",
    description:
      "Ergonomically curved to hit the G-spot with ease. Powerful vibrations with multiple speed settings.",
    price: 18000,
    category: "G-spot Vibrators",
    image: "/products/g-spot-vibrator.jpg",
    availability: "AVAILABLE",
    badge: "Best Seller",
    sizes: ["S", "M", "L"],
    colors: ["Rose", "Lavender"],
  },
  {
    id: "4",
    name: "G-spot Vibrator 2",
    slug: "g-spot-vibrator-2",
    description:
      "Upgraded G-spot vibrator with deeper vibrations and a smoother tip. Whisper-quiet and fully waterproof.",
    price: 20000,
    category: "G-spot Vibrators",
    image: "/products/g-spot-vibrator-2.jpg",
    availability: "AVAILABLE",
    sizes: ["M", "L", "XL"],
    colors: ["Rose", "Black"],
  },
  {
    id: "5",
    name: "G-spot Vibrator 3",
    slug: "g-spot-vibrator-3",
    description:
      "Premium G-spot vibrator with rotating beads and thrusting action. Multi-function for customizable pleasure.",
    price: 25000,
    category: "G-spot Vibrators",
    image: "/products/g-spot-vibrator-3.jpg",
    availability: "AVAILABLE",
    badge: "New",
    sizes: ["M", "L", "XL"],
    colors: ["Rose", "Lavender", "Black"],
  },
  {
    id: "6",
    name: "Couple Toys",
    slug: "couple-toys",
    description:
      "Designed for shared pleasure. Worn during intimacy to enhance sensations for both partners.",
    price: 22000,
    category: "Couple Toys",
    image: "/products/couple-toys.jpg",
    availability: "AVAILABLE",
    sizes: ["S", "M", "L"],
    colors: ["Rose", "Lavender"],
  },
];

export const categories = [...new Set(products.map((p) => p.category))];
