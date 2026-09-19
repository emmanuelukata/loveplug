"use client";

import { useState, useEffect } from "react";
import { Order, OrderStatus } from "@/lib/orders";
import Container from "@/components/Container";
import AdminGuard from "@/components/AdminGuard";
import { getAllOrders, updateOrderStatus } from "@/app/actions/admin";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const STATUS_OPTIONS: OrderStatus[] = [
  "PENDING_PAYMENT",
  "PAYMENT_SUBMITTED",
  "PAYMENT_CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "COMPLETED",
  "CANCELLED",
];

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  PENDING_PAYMENT: { bg: "#422006", text: "#facc15" },
  PAYMENT_SUBMITTED: { bg: "#172554", text: "#60a5fa" },
  PAYMENT_CONFIRMED: { bg: "#052e16", text: "#4ade80" },
  PROCESSING: { bg: "#1e1b4b", text: "#818cf8" },
  SHIPPED: { bg: "#3b0764", text: "#c084fc" },
  COMPLETED: { bg: "#052e16", text: "#4ade80" },
  CANCELLED: { bg: "#450a0a", text: "#f87171" },
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);
    const data = await getAllOrders();
    setOrders(data);
    setLoading(false);
  }

  async function handleStatusChange(reference: string, newStatus: OrderStatus) {
    setUpdating(reference);
    const result = await updateOrderStatus(reference, newStatus);
    if (result.success) {
      await loadOrders();
    }
    setUpdating(null);
  }

  return (
    <AdminGuard>
    <Container className="py-12 md:py-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#f8eef3" }}>
          Orders
        </h1>
        <button
          onClick={loadOrders}
          className="text-sm transition-colors"
          style={{ color: "#8c7180" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#f8eef3")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#8c7180")}
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="mt-8" style={{ color: "#8c7180" }}>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="mt-8" style={{ color: "#8c7180" }}>No orders yet.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((order) => {
            const sc = STATUS_COLORS[order.status] || { bg: "#22101a", text: "#8c7180" };
            return (
            <div key={order.reference} className="p-6" style={{ border: "1px solid #3d1e2c" }}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium tracking-wider" style={{ color: "#f8eef3" }}>
                    {order.reference}
                  </p>
                  <p className="text-sm" style={{ color: "#8c7180" }}>
                    {order.customer.fullName} · {order.customer.email}
                  </p>
                  <p className="text-sm" style={{ color: "#8c7180" }}>
                    {order.customer.phone} · {order.customer.city},{" "}
                    {order.customer.state}
                  </p>
                  <p className="text-xs" style={{ color: "#8c7180" }}>
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-lg font-medium" style={{ color: "#f8eef3" }}>
                    {formatPrice(order.subtotal)}
                  </p>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order.reference,
                        e.target.value as OrderStatus,
                      )
                    }
                    disabled={updating === order.reference}
                    className="rounded-full px-3 py-1 text-xs font-medium border-0 outline-none"
                    style={{ backgroundColor: sc.bg, color: sc.text }}
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 pt-4" style={{ borderTop: "1px solid #3d1e2c" }}>
                <p className="text-sm font-medium" style={{ color: "#f8eef3" }}>Items</p>
                <div className="mt-2">
                  {order.items.map((item) => (
                    <p key={item.productId} className="text-sm" style={{ color: "#8c7180" }}>
                      {item.name} × {item.quantity} —{" "}
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4" style={{ borderTop: "1px solid #3d1e2c" }}>
                <p className="text-sm font-medium" style={{ color: "#f8eef3" }}>
                  Delivery Address
                </p>
                <p className="text-sm" style={{ color: "#8c7180" }}>
                  {order.customer.address}, {order.customer.city},{" "}
                  {order.customer.state}
                </p>
                {order.customer.deliveryInstructions && (
                  <p className="mt-1 text-xs" style={{ color: "#8c7180" }}>
                    Note: {order.customer.deliveryInstructions}
                  </p>
                )}
              </div>
            </div>
            );
          })}
        </div>
      )}
    </Container>
    </AdminGuard>
  );
}
