import { Metadata } from "next";
import CartContents from "@/components/CartContents";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return <CartContents />;
}
