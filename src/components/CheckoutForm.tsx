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
    // Clear error when user starts typing
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
        <h1 className="text-3xl font-light tracking-tight text-foreground">
          Checkout
        </h1>
        <p className="mt-4 text-muted">Your cart is empty</p>
        <Link
          href="/products"
          className="mt-8 inline-block bg-accent px-8 py-3 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
        >
          Continue Shopping
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-12 md:py-20">
      <Link
        href="/cart"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to Cart
      </Link>
      <h1 className="text-3xl font-light tracking-tight text-foreground">
        Checkout
      </h1>

      <div className="mt-6 flex items-center gap-2 text-sm">
        <span className="text-foreground font-medium">Cart</span>
        <span className="text-muted">→</span>
        <span className="text-foreground font-medium">Checkout</span>
        <span className="text-muted">→</span>
        <span className="text-muted">Confirmation</span>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Order Summary */}
        <div>
          <h2 className="text-lg font-medium text-foreground">
            Order Summary
          </h2>
          <div className="mt-4 divide-y divide-border">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between py-3">
                <div>
                  <p className="text-sm text-foreground">{item.name}</p>
                  <p className="text-xs text-muted">
                    Qty: {item.quantity} × {formatPrice(item.price)}
                  </p>
                </div>
                <p className="text-sm text-foreground">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-border pt-4">
            <p className="text-sm text-muted">Total</p>
            <p className="text-lg font-medium text-foreground">
              {formatPrice(total)}
            </p>
          </div>
        </div>

        {/* Delivery Form */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <h2 className="text-lg font-medium text-foreground">
            Delivery Information
          </h2>

          <div>
            <label
              htmlFor="fullName"
              className="block text-sm text-muted"
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className={`mt-1 block w-full border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors ${
                errors.fullName
                  ? "border-red-500"
                  : "border-border focus:border-foreground"
              }`}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-muted">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors ${
                errors.email
                  ? "border-red-500"
                  : "border-border focus:border-foreground"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm text-muted">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className={`mt-1 block w-full border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors ${
                errors.phone
                  ? "border-red-500"
                  : "border-border focus:border-foreground"
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm text-muted">
              Delivery Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className={`mt-1 block w-full border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors ${
                errors.address
                  ? "border-red-500"
                  : "border-border focus:border-foreground"
              }`}
            />
            {errors.address && (
              <p className="mt-1 text-xs text-red-500">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm text-muted">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                className={`mt-1 block w-full border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors ${
                  errors.city
                    ? "border-red-500"
                    : "border-border focus:border-foreground"
                }`}
              />
              {errors.city && (
                <p className="mt-1 text-xs text-red-500">{errors.city}</p>
              )}
            </div>
            <div>
              <label htmlFor="state" className="block text-sm text-muted">
                State
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`mt-1 block w-full border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors ${
                  errors.state
                    ? "border-red-500"
                    : "border-border focus:border-foreground"
                }`}
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
              className="block text-sm text-muted"
            >
              Delivery Instructions (optional)
            </label>
            <textarea
              id="deliveryInstructions"
              name="deliveryInstructions"
              value={formData.deliveryInstructions}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground"
            />
          </div>

          {serverError && (
            <p className="text-sm text-red-500">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent py-3 text-sm font-medium text-background transition-colors hover:bg-accent-hover disabled:opacity-50"
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </Container>
  );
}
