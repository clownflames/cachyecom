export const SITE_NAME = "BIG DEAL";

export const SITE_TAGLINE = "BIG SALE IS LIVE NOW";

export const SITE_DESCRIPTION =
  "Shop amazing deals on mobiles, electronics, laptops, appliances and more.";

export const SITE_URL = "https://bigdeal-store.vercel.app";

export const CURRENCY = "INR";

/**
 * Store / admin email that receives every new order notification.
 * Falls back to the STORE_EMAIL environment variable, then to a default.
 */
export const STORE_EMAIL =
  process.env.STORE_EMAIL ?? "store@bigdeal.example.com";

/**
 * WhatsApp-friendly contact details. Keep empty to hide from UI.
 * Do not invent phone numbers or addresses.
 */
export const STORE_PHONE = process.env.STORE_PHONE ?? "";
export const STORE_ADDRESS = process.env.STORE_ADDRESS ?? "";
export const STORE_WHATSAPP = process.env.STORE_WHATSAPP ?? "";

/* ------------------------------------------------------------------ */
/* Admin dashboard                                                     */
/* ------------------------------------------------------------------ */

/**
 * Admin login credentials (from .env). No users table is used - the
 * single admin account is configured via environment variables.
 */
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@bigdeal.example.com";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "change-me";

/**
 * Secret used to sign the admin session cookie. Override it in .env with
 * a long random string.
 */
export const ADMIN_SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ??
  process.env.NEXT_SERVER_ACTIONS_ENCRYPTION_KEY ??
  "dev-insecure-session-secret-change-me";

/* ------------------------------------------------------------------ */
/* Payment configuration                                               */
/* ------------------------------------------------------------------ */

/**
 * UPI ID that customers pay to when using "Pay via QR Code".
 * Just the UPI ID (e.g. "name@bank"), NOT a full "upi://pay?..." link.
 * Uses a NEXT_PUBLIC_ var because it is read inside a client component.
 */
export const PAYMENT_UPI_ID =
  process.env.NEXT_PUBLIC_PAYMENT_UPI_ID ?? "bigdeal@upi";

/**
 * Name shown on the UPI payment screen / QR.
 */
export const PAYMENT_NAME =
  process.env.NEXT_PUBLIC_PAYMENT_NAME ?? "BIG DEAL";

/**
 * Optional static QR code image (e.g. "/qr-code.png").
 * - If set to a non-empty string, that image is shown on checkout.
 * - If left empty, a QR code is generated at runtime from PAYMENT_UPI_ID
 *   and the exact order amount using the `qrcode` package.
 */
export const PAYMENT_QR_CODE =
  process.env.NEXT_PUBLIC_PAYMENT_QR_CODE ?? "";

/* ------------------------------------------------------------------ */
/* Sale window                                                         */
/* ------------------------------------------------------------------ */

/**
 * End of the BIG SALE in ISO 8601 format.
 * Change this from one central place to move the sale end date.
 * Use a fixed timestamp so the countdown does not reset on refresh.
 */
export const SALE_END_DATE = "2026-09-30T23:59:59+05:30";

/**
 * Optional sale start date (only used to decide if the sale has not begun yet).
 */
export const SALE_START_DATE = "2026-01-01T00:00:00+05:30";

/* ------------------------------------------------------------------ */
/* Shipping                                                            */
/* ------------------------------------------------------------------ */

export const SHIPPING_INFO =
  "Shipping charges are calculated at checkout and are shown before you place the order.";

export const COD_AVAILABLE = true;
