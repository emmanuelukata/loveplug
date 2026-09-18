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

const STATUS_COLORS: Record<string, string> = {
  PENDING_PAYMENT: "bg-yellow-100 text-yellow-800",
  PAYMENT_SUBMITTED: "bg-blue-100 text-blue-800",
  PAYMENT_CONFIRMED: "bg-green-100 text-green-800",
  PROCESSING: "bg-indigo-100 text-indigo-800",
  SHIPPED: "bg-purple-100 text-purple-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
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
        <h1 className="text-3xl font-light tracking-tight text-foreground">
          Orders
        </h1>
        <button
          onClick={loadOrders}
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="mt-8 text-muted">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="mt-8 text-muted">No orders yet.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <div key={order.reference} className="border border-border p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium tracking-wider text-foreground">
                    {order.reference}
                  </p>
                  <p className="text-sm text-muted">
                    {order.customer.fullName} · {order.customer.email}
                  </p>
                  <p className="text-sm text-muted">
                    {order.customer.phone} · {order.customer.city},{" "}
                    {order.customer.state}
                  </p>
                  <p className="text-xs text-muted">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-lg font-medium text-foreground">
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
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      STATUS_COLORS[order.status] || "bg-gray-100 text-gray-800"
                    } border-0 outline-none`}
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 border-t border-border pt-4">
                <p className="text-sm font-medium text-foreground">Items</p>
                <div className="mt-2">
                  {order.items.map((item) => (
                    <p key={item.productId} className="text-sm text-muted">
                      {item.name} × {item.quantity} —{" "}
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-4 border-t border-border pt-4">
                <p className="text-sm font-medium text-foreground">
                  Delivery Address
                </p>
                <p className="text-sm text-muted">
                  {order.customer.address}, {order.customer.city},{" "}
                  {order.customer.state}
                </p>
                {order.customer.deliveryInstructions && (
                  <p className="mt-1 text-xs text-muted">
                    Note: {order.customer.deliveryInstructions}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
    </AdminGuard>
  );
}
