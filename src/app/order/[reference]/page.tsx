import { Metadata } from "next";
import OrderConfirmation from "@/components/OrderConfirmation";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

export default function OrderConfirmationPage() {
  return <OrderConfirmation />;
}
