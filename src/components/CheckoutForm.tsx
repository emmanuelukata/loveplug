"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { nigerianStates } from "@/lib/states";
import { createOrder } from "@/app/actions/order";
import Container from "./Container";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  deliveryInstructions: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email address";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^[\d\s\-+()]{10,}$/.test(data.phone)) {
    errors.phone = "Invalid phone number";
  }

  if (!data.address.trim()) {
    errors.address = "Delivery address is required";
  }

  if (!data.city.trim()) {
    errors.city = "City is required";
  }

  if (!data.state) {
    errors.state = "State is required";
  }

  return errors;
}

export default function CheckoutForm() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    deliveryInstructions: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    const result = await createOrder({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      deliveryInstructions: formData.deliveryInstructions,
      cartItems: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    });

    if (result.success && result.reference) {
      clearCart();
      router.push(`/order/${result.reference}`);
    } else {
      setServerError(result.error || "Failed to place order. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <Container className="py-24 text-center">
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#f8eef3" }}>
          Checkout
        </h1>
        <p className="mt-4" style={{ color: "#8c7180" }}>Your cart is empty</p>
        <Link
          href="/products"
          className="mt-8 inline-block text-sm font-semibold uppercase tracking-wider transition-all hover:opacity-90"
          style={{ backgroundColor: "#ff2e88", color: "#f8eef3", padding: "14px 32px", borderRadius: 9999 }}
        >
          Continue Shopping
        </Link>
      </Container>
    );
  }

  const inputStyle = { backgroundColor: "transparent", color: "#f8eef3", borderColor: "#3d1e2c" };
  const inputFocusStyle = { borderColor: "#f8eef3" };

  return (
    <Container className="py-12 md:py-20">
      <Link
        href="/cart"
        className="mb-6 inline-flex items-center gap-1 text-sm transition-colors"
        style={{ color: "#8c7180" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#f8eef3")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#8c7180")}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to Cart
      </Link>
      <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#f8eef3" }}>
        Checkout
      </h1>

      <div className="mt-6 flex items-center gap-2 text-sm">
        <span className="font-medium" style={{ color: "#f8eef3" }}>Cart</span>
        <span style={{ color: "#8c7180" }}>→</span>
        <span className="font-medium" style={{ color: "#f8eef3" }}>Checkout</span>
        <span style={{ color: "#8c7180" }}>→</span>
        <span style={{ color: "#8c7180" }}>Confirmation</span>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Order Summary */}
        <div>
          <h2 className="text-lg font-medium" style={{ color: "#f8eef3" }}>
            Order Summary
          </h2>
          <div className="mt-4">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between py-3" style={{ borderBottom: "1px solid #3d1e2c" }}>
                <div>
                  <p className="text-sm" style={{ color: "#f8eef3" }}>{item.name}</p>
                  <p className="text-xs" style={{ color: "#8c7180" }}>
                    Qty: {item.quantity} × {formatPrice(item.price)}
                  </p>
                </div>
                <p className="text-sm" style={{ color: "#f8eef3" }}>
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between pt-4" style={{ borderTop: "1px solid #3d1e2c" }}>
            <p className="text-sm" style={{ color: "#8c7180" }}>Total</p>
            <p className="text-lg font-medium" style={{ color: "#f8eef3" }}>
              {formatPrice(total)}
            </p>
          </div>
        </div>

        {/* Delivery Form */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <h2 className="text-lg font-medium" style={{ color: "#f8eef3" }}>
            Delivery Information
          </h2>

          <div>
            <label
              htmlFor="fullName"
              className="block text-sm"
              style={{ color: "#8c7180" }}
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 text-sm outline-none transition-colors"
              style={{ ...inputStyle, border: `1px solid ${errors.fullName ? "#ef4444" : "#3d1e2c" }` }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#f8eef3")}
              onBlur={(e) => (e.currentTarget.style.borderColor = errors.fullName ? "#ef4444" : "#3d1e2c")}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm" style={{ color: "#8c7180" }}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 text-sm outline-none transition-colors"
              style={{ ...inputStyle, border: `1px solid ${errors.email ? "#ef4444" : "#3d1e2c" }` }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#f8eef3")}
              onBlur={(e) => (e.currentTarget.style.borderColor = errors.email ? "#ef4444" : "#3d1e2c")}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm" style={{ color: "#8c7180" }}>
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 text-sm outline-none transition-colors"
              style={{ ...inputStyle, border: `1px solid ${errors.phone ? "#ef4444" : "#3d1e2c" }` }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#f8eef3")}
              onBlur={(e) => (e.currentTarget.style.borderColor = errors.phone ? "#ef4444" : "#3d1e2c")}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm" style={{ color: "#8c7180" }}>
              Delivery Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 text-sm outline-none transition-colors"
              style={{ ...inputStyle, border: `1px solid ${errors.address ? "#ef4444" : "#3d1e2c" }` }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#f8eef3")}
              onBlur={(e) => (e.currentTarget.style.borderColor = errors.address ? "#ef4444" : "#3d1e2c")}
            />
            {errors.address && (
              <p className="mt-1 text-xs text-red-500">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm" style={{ color: "#8c7180" }}>
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 text-sm outline-none transition-colors"
                style={{ ...inputStyle, border: `1px solid ${errors.city ? "#ef4444" : "#3d1e2c" }` }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#f8eef3")}
                onBlur={(e) => (e.currentTarget.style.borderColor = errors.city ? "#ef4444" : "#3d1e2c")}
              />
              {errors.city && (
                <p className="mt-1 text-xs text-red-500">{errors.city}</p>
              )}
            </div>
            <div>
              <label htmlFor="state" className="block text-sm" style={{ color: "#8c7180" }}>
                State
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 text-sm outline-none transition-colors"
                style={{ ...inputStyle, border: `1px solid ${errors.state ? "#ef4444" : "#3d1e2c" }` }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#f8eef3")}
                onBlur={(e) => (e.currentTarget.style.borderColor = errors.state ? "#ef4444" : "#3d1e2c")}
              >
                <option value="">Select state</option>
                {nigerianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="mt-1 text-xs text-red-500">{errors.state}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="deliveryInstructions"
              className="block text-sm"
              style={{ color: "#8c7180" }}
            >
              Delivery Instructions (optional)
            </label>
            <textarea
              id="deliveryInstructions"
              name="deliveryInstructions"
              value={formData.deliveryInstructions}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full px-4 py-3 text-sm outline-none transition-colors"
              style={{ ...inputStyle, border: "1px solid #3d1e2c" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#f8eef3")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#3d1e2c")}
            />
          </div>

          {serverError && (
            <p className="text-sm text-red-500">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-sm font-semibold uppercase tracking-wider transition-all hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#ff2e88", color: "#f8eef3", padding: "14px 32px", borderRadius: 9999 }}
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </Container>
  );
}
