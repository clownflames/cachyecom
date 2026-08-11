import nodemailer from "nodemailer";

import { SITE_NAME, STORE_EMAIL } from "./config";
import { formatPrice } from "./utils";

export type OrderCustomer = {
  name: string;
  phone: string;
  email: string;
};

export type OrderAddress = {
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
};

export type OrderProductLine = {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineSubtotal: number;
};

export type OrderData = {
  orderId: string;
  orderDate: string;
  customer: OrderCustomer;
  address: OrderAddress;
  items: OrderProductLine[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: "QR" | "COD";
  paymentStatus: string;
  transactionId?: string;
};

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: user
      ? { user, pass: password ?? "" }
      : undefined,
  });
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER);
}

function emailFrom(): string {
  return process.env.EMAIL_FROM ?? `"${SITE_NAME}" <${STORE_EMAIL}>`;
}

/**
 * Sends a single email. Returns true when the message was accepted.
 * Throws when sending fails.
 */
async function sendMail(to: string, subject: string, html: string) {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: emailFrom(),
    to,
    subject,
    html,
    text: html.replace(/<[^>]+>/g, ""),
  });
}

/* --------------------------- email builders --------------------------- */

function productRowsHtml(order: OrderData): string {
  return order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px;border:1px solid #eee;font-size:14px;">${item.name}</td>
        <td style="padding:10px;border:1px solid #eee;font-size:14px;text-align:center;">${item.quantity}</td>
        <td style="padding:10px;border:1px solid #eee;font-size:14px;text-align:right;">${formatPrice(
          item.unitPrice
        )}</td>
        <td style="padding:10px;border:1px solid #eee;font-size:14px;text-align:right;">${formatPrice(
          item.lineSubtotal
        )}</td>
      </tr>`
    )
    .join("");
}

function adminOrderHtml(order: OrderData): string {
  const qrSection =
    order.paymentMethod === "QR"
      ? `<p style="font-size:14px;margin:0;">Transaction ID / UTR: <strong>${order.transactionId}</strong></p>`
      : "";

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
    <div style="background:#b91c1c;padding:24px;text-align:center;">
      <h1 style="color:#ffffff;margin:0;font-size:22px;letter-spacing:1px;">NEW ORDER</h1>
      <p style="color:#fecaca;margin:6px 0 0;font-size:14px;">${SITE_NAME} - Order received</p>
    </div>
    <div style="padding:24px;">
      <h2 style="font-size:18px;margin:0 0 6px;">Order ID: ${order.orderId}</h2>
      <p style="font-size:14px;color:#6b7280;margin:0 0 20px;">Order Date: ${order.orderDate}</p>

      <h3 style="font-size:15px;margin:24px 0 8px;border-bottom:1px solid #eee;padding-bottom:6px;">Customer</h3>
      <table style="width:100%;font-size:14px;border-collapse:collapse;">
        <tr><td style="padding:4px 0;color:#6b7280;">Name:</td><td>${order.customer.name}</td></tr>
        <tr><td style="padding:4px 0;color:#6b7280;">Phone:</td><td>${order.customer.phone}</td></tr>
        <tr><td style="padding:4px 0;color:#6b7280;">Email:</td><td>${order.customer.email}</td></tr>
      </table>

      <h3 style="font-size:15px;margin:24px 0 8px;border-bottom:1px solid #eee;padding-bottom:6px;">Shipping Address</h3>
      <p style="font-size:14px;margin:0;line-height:1.6;">
        ${order.address.address}<br/>
        City: ${order.address.city}, State: ${order.address.state}<br/>
        Pincode: ${order.address.pincode}
        ${order.address.landmark ? `<br/>Landmark: ${order.address.landmark}` : ""}
      </p>

      <h3 style="font-size:15px;margin:24px 0 8px;border-bottom:1px solid #eee;padding-bottom:6px;">Products</h3>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="background:#f9fafb;">
          <th style="padding:10px;border:1px solid #eee;text-align:left;font-size:12px;">Product</th>
          <th style="padding:10px;border:1px solid #eee;text-align:center;font-size:12px;">Qty</th>
          <th style="padding:10px;border:1px solid #eee;text-align:right;font-size:12px;">Price</th>
          <th style="padding:10px;border:1px solid #eee;text-align:right;font-size:12px;">Subtotal</th>
        </tr>
        ${productRowsHtml(order)}
      </table>

      <h3 style="font-size:15px;margin:24px 0 8px;border-bottom:1px solid #eee;padding-bottom:6px;">Payment</h3>
      <p style="font-size:14px;margin:0;">Payment Method: <strong>${order.paymentMethod === "QR" ? "QR Payment (UPI)" : "Cash on Delivery"}</strong></p>
      <p style="font-size:14px;margin:4px 0 0;">Payment Status: <strong>${order.paymentStatus}</strong></p>
      ${qrSection}

      <h3 style="font-size:15px;margin:24px 0 8px;border-bottom:1px solid #eee;padding-bottom:6px;">Order Total</h3>
      <table style="width:100%;font-size:14px;border-collapse:collapse;">
        <tr><td style="padding:4px 0;color:#6b7280;">Subtotal:</td><td style="text-align:right;">${formatPrice(order.subtotal)}</td></tr>
        <tr><td style="padding:4px 0;color:#6b7280;">Discount:</td><td style="text-align:right;">- ${formatPrice(order.discount)}</td></tr>
        <tr style="font-weight:bold;"><td style="padding:8px 0;border-top:2px solid #eee;">Final Total:</td><td style="text-align:right;border-top:2px solid #eee;color:#b91c1c;font-size:16px;">${formatPrice(order.total)}</td></tr>
      </table>
    </div>
  </div>`;
}

function customerOrderHtml(order: OrderData): string {
  const paymentNote =
    order.paymentMethod === "QR"
      ? `<p style="font-size:14px;color:#6b7280;">Your transaction ID (${order.transactionId}) has been submitted and is <strong>pending verification</strong>. We will confirm your payment shortly.</p>`
      : `<p style="font-size:14px;color:#6b7280;">Your order is <strong>Cash on Delivery</strong>. Please keep the total amount ready when your order arrives.</p>`;

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
    <div style="background:#b91c1c;padding:24px;text-align:center;">
      <h1 style="color:#ffffff;margin:0;font-size:22px;">Order Confirmed</h1>
    </div>
    <div style="padding:24px;">
      <p style="font-size:15px;">Hi ${order.customer.name},</p>
      <p style="font-size:14px;line-height:1.7;">Thank you for your order. Your order has been received successfully. We'll process your order shortly.</p>

      <p style="font-size:16px;font-weight:bold;margin:20px 0 4px;">Order ID: #${order.orderId}</p>

      <h3 style="font-size:15px;margin:20px 0 8px;border-bottom:1px solid #eee;padding-bottom:6px;">Products</h3>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="background:#f9fafb;">
          <th style="padding:10px;border:1px solid #eee;text-align:left;font-size:12px;">Product</th>
          <th style="padding:10px;border:1px solid #eee;text-align:center;font-size:12px;">Qty</th>
          <th style="padding:10px;border:1px solid #eee;text-align:right;font-size:12px;">Subtotal</th>
        </tr>
        ${order.items
          .map(
            (item) => `
          <tr>
            <td style="padding:10px;border:1px solid #eee;font-size:14px;">${item.name}</td>
            <td style="padding:10px;border:1px solid #eee;font-size:14px;text-align:center;">${item.quantity}</td>
            <td style="padding:10px;border:1px solid #eee;font-size:14px;text-align:right;">${formatPrice(item.lineSubtotal)}</td>
          </tr>`
          )
          .join("")}
      </table>

      <table style="width:100%;font-size:14px;border-collapse:collapse;margin-top:16px;">
        <tr><td style="padding:4px 0;color:#6b7280;">Subtotal:</td><td style="text-align:right;">${formatPrice(order.subtotal)}</td></tr>
        <tr><td style="padding:4px 0;color:#6b7280;">Discount:</td><td style="text-align:right;">- ${formatPrice(order.discount)}</td></tr>
        <tr style="font-weight:bold;"><td style="padding:8px 0;border-top:2px solid #eee;">Total:</td><td style="text-align:right;border-top:2px solid #eee;color:#b91c1c;font-size:16px;">${formatPrice(order.total)}</td></tr>
      </table>

      <h3 style="font-size:15px;margin:20px 0 8px;border-bottom:1px solid #eee;padding-bottom:6px;">Payment Method</h3>
      <p style="font-size:14px;margin:0;">${order.paymentMethod === "QR" ? "QR Payment (UPI)" : "Cash on Delivery"}</p>
      ${paymentNote}

      <h3 style="font-size:15px;margin:20px 0 8px;border-bottom:1px solid #eee;padding-bottom:6px;">Shipping Address</h3>
      <p style="font-size:14px;margin:0;line-height:1.6;">
        ${order.customer.name}<br/>
        ${order.address.address}<br/>
        ${order.address.city}, ${order.address.state} - ${order.address.pincode}
        ${order.address.landmark ? `<br/>Landmark: ${order.address.landmark}` : ""}
      </p>

      <p style="font-size:13px;color:#9ca3af;margin-top:28px;">This is an automated email from ${SITE_NAME}. Do not reply to this email.</p>
    </div>
  </div>`;
}

/* ------------------------------ senders ------------------------------ */

/**
 * Sends the new-order notification to the store email.
 * In development, if SMTP is not configured, the email is logged to the
 * server console instead so the flow can still be tested end-to-end.
 * In production a missing/unusable SMTP setup throws an error, which the
 * caller turns into a user-facing failure (never a fake success).
 */
export async function sendStoreOrderEmail(order: OrderData): Promise<void> {
  if (!isEmailConfigured()) {
    if (process.env.NODE_ENV === "development") {
      console.log("[BIG DEAL][DEV] Store order email not sent - SMTP not configured.");
      console.log("[BIG DEAL][DEV] Order payload:", JSON.stringify(order, null, 2));
      return;
    }
    throw new Error("SMTP is not configured.");
  }
  await sendMail(STORE_EMAIL, `New Order Received - #${order.orderId}`, adminOrderHtml(order));
}

/**
 * Sends the order confirmation email to the customer.
 */
export async function sendCustomerOrderEmail(order: OrderData): Promise<void> {
  if (!isEmailConfigured()) {
    if (process.env.NODE_ENV === "development") {
      console.log("[BIG DEAL][DEV] Customer confirmation email not sent - SMTP not configured.");
      console.log("[BIG DEAL][DEV] Recipient:", order.customer.email);
      return;
    }
    throw new Error("SMTP is not configured.");
  }
  await sendMail(
    order.customer.email,
    `Order Confirmed - #${order.orderId}`,
    customerOrderHtml(order)
  );
}
