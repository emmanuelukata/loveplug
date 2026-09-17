"use server";

import { products } from "@/lib/products";
import {
  saveOrder,
  generateOrderReference,
  type Order,
  type OrderItem,
} from "@/lib/orders";

interface CheckoutInput {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  deliveryInstructions: string;
  cartItems: Array<{
    productId: string;
    quantity: number;
  }>;
}

interface OrderResult {
  success: boolean;
  reference?: string;
  error?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  return /^[\d\s\-+()]{10,}$/.test(phone);
}

export async function createOrder(input: CheckoutInput): Promise<OrderResult> {
  // 1. Validate customer information
  if (!input.fullName.trim()) {
    return { success: false, error: "Full name is required" };
  }
  if (!input.email.trim() || !validateEmail(input.email)) {
    return { success: false, error: "Valid email is required" };
  }
  if (!input.phone.trim() || !validatePhone(input.phone)) {
    return { success: false, error: "Valid phone number is required" };
  }
  if (!input.address.trim()) {
    return { success: false, error: "Delivery address is required" };
  }
  if (!input.city.trim()) {
    return { success: false, error: "City is required" };
  }
  if (!input.state) {
    return { success: false, error: "State is required" };
  }

  // 2. Validate cart items
  if (!input.cartItems || input.cartItems.length === 0) {
    return { success: false, error: "Cart is empty" };
  }

  // 3. Validate product IDs, quantities, availability, and retrieve authoritative prices
  const orderItems: OrderItem[] = [];
  let subtotal = 0;

  for (const cartItem of input.cartItems) {
    const product = products.find((p) => p.id === cartItem.productId);

    if (!product) {
      return {
        success: false,
        error: `Product not found: ${cartItem.productId}`,
      };
    }

    if (product.availability !== "AVAILABLE") {
      return {
        success: false,
        error: `"${product.name}" is currently unavailable`,
      };
    }

    if (cartItem.quantity < 1) {
      return {
        success: false,
        error: `Invalid quantity for "${product.name}"`,
      };
    }

    // Use the server-side price, never trust the browser
    const itemTotal = product.price * cartItem.quantity;
    subtotal += itemTotal;

    orderItems.push({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      quantity: cartItem.quantity,
    });
  }

  // 4. Generate order reference
  const reference = generateOrderReference();

  // 6. Create order
  const now = new Date().toISOString();
  const order: Order = {
    reference,
    status: "PENDING_PAYMENT",
    items: orderItems,
    subtotal,
    customer: {
      fullName: input.fullName.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
      address: input.address.trim(),
      city: input.city.trim(),
      state: input.state,
      deliveryInstructions: input.deliveryInstructions.trim(),
    },
    paymentReceiptUrl: null,
    createdAt: now,
    updatedAt: now,
  };

  // 7. Save order
  await saveOrder(order);

  // 8. Return confirmation
  return { success: true, reference };
}
