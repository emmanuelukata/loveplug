import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getOrder } from "@/lib/orders";
import OrderConfirmation from "@/components/OrderConfirmation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ reference: string }>;
}): Promise<Metadata> {
  const { reference } = await params;
  return { title: `Order ${reference}` };
}

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  const order = await getOrder(reference);

  if (!order) {
    notFound();
  }

  return <OrderConfirmation order={order} />;
}
