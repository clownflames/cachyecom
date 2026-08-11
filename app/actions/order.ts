"use server";

import crypto from "node:crypto";

import { db } from "@/db";
import { orderItems as orderItemsTable, orders } from "@/db/schema";
import {
  sendCustomerOrderEmail,
  sendStoreOrderEmail,
  type OrderData,
} from "@/lib/email";
import { orderFormSchema, sanitizeTransactionId } from "@/lib/order-schema";
import { getProductById } from "@/lib/products";

export type OrderResult =
  | {
      success: true;
      orderId: string;
      total: number;
      paymentMethod: "QR" | "COD";
      paymentStatus: string;
      customerEmail: string;
      transactionId?: string;
    }
  | { success: false; message: string };

function generateOrderId(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const suffix = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `BD-${yyyy}${mm}${dd}-${suffix}`;
}

function formatOrderDate(date: Date): string {
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Place an order.
 *
 * - Inputs are validated with Zod.
 * - Only productId + quantity are accepted from the browser.
 * - Prices are looked up from /lib/products.ts and totals are always
 *   recalculated on the server. Client-sent prices are never trusted.
 * - No database: the order is delivered via email (store + customer).
 */
export async function placeOrder(input: unknown): Promise<OrderResult> {
  const parsed = orderFormSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message:
        "Some details are incorrect. Please review the form and try again.",
    };
  }

  const { customer, address, paymentMethod, transactionId, items } =
    parsed.data;

  // Rebuild the order strictly from server-side product data.
  const orderItems: OrderData["items"] = [];
  let subtotal = 0;
  let discount = 0;

  for (const line of items) {
    const product = getProductById(line.productId);
    if (!product) {
      return {
        success: false,
        message:
          "One or more products in your order are no longer available. Please refresh and try again.",
      };
    }
    if (product.stock < line.quantity) {
      return {
        success: false,
        message: `"${product.name}" has only ${product.stock} item(s) in stock. Please reduce the quantity.`,
      };
    }
    orderItems.push({
      productId: product.id,
      name: product.name,
      quantity: line.quantity,
      unitPrice: product.salePrice,
      lineSubtotal: product.salePrice * line.quantity,
    });
    subtotal += product.salePrice * line.quantity;
    discount += (product.originalPrice - product.salePrice) * line.quantity;
  }

  const txn =
    paymentMethod === "QR" ? sanitizeTransactionId(transactionId) : "";
  const paymentStatus =
    paymentMethod === "QR" ? "Verification Pending" : "COD - Payment Pending";

  const now = new Date();
  const order: OrderData = {
    orderId: generateOrderId(now),
    orderDate: formatOrderDate(now),
    customer,
    address: {
      ...address,
      landmark: address.landmark || undefined,
    },
    items: orderItems,
    subtotal,
    discount,
    total: subtotal,
    paymentMethod,
    paymentStatus,
    transactionId: txn || undefined,
  };

  // Persist the order to the database (used by the admin dashboard).
  let savedToDb = false;
  try {
    await db.insert(orders).values({
      id: order.orderId,
      customerName: order.customer.name,
      customerPhone: order.customer.phone,
      customerEmail: order.customer.email,
      address: order.address.address,
      city: order.address.city,
      state: order.address.state,
      pincode: order.address.pincode,
      landmark: order.address.landmark || null,
      subtotal,
      discount,
      total: subtotal,
      paymentMethod,
      paymentStatus,
      transactionId: txn || null,
      orderDate: order.orderDate,
    });
    await db.insert(orderItemsTable).values(
      order.items.map((item) => ({
        orderId: order.orderId,
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        lineSubtotal: item.lineSubtotal,
      }))
    );
    savedToDb = true;
  } catch (error) {
    // Never fail the checkout just because the DB write failed.
    console.error("[BIG DEAL] Order DB save failed:", error);
  }

  try {
    // Email is still sent as a backup notification.
    await sendStoreOrderEmail(order);
    await sendCustomerOrderEmail(order);
  } catch (error) {
    // Log safely on the server only - never leak SMTP details to the client.
    console.error("[BIG DEAL] Order email sending failed:", error);
    if (!savedToDb) {
      return {
        success: false,
        message:
          "We could not submit your order right now. Please try again.",
      };
    }
  }

  return {
    success: true,
    orderId: order.orderId,
    total: subtotal,
    paymentMethod,
    paymentStatus,
    customerEmail: customer.email,
    transactionId: txn || undefined,
  };
}
