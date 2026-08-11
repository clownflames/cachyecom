import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_SESSION_SECRET } from "./config";

export const ADMIN_COOKIE_NAME = "admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

type SessionPayload = {
  email: string;
  exp: number;
};

function base64UrlEncode(input: string | Buffer): string {
  return Buffer.from(input).toString("base64url");
}

function base64UrlDecode(input: string): string {
  return Buffer.from(input, "base64url").toString("utf8");
}

function sign(payload: string): string {
  return crypto
    .createHmac("sha256", ADMIN_SESSION_SECRET)
    .update(payload)
    .digest("base64url");
}

function createToken(payload: SessionPayload): string {
  const body = base64UrlEncode(JSON.stringify(payload));
  return `${body}.${sign(body)}`;
}

function verifyToken(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = sign(body);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(body)) as SessionPayload;
    if (!payload.email || typeof payload.exp !== "number") return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    if (payload.email !== ADMIN_EMAIL) return null;
    return payload;
  } catch {
    return null;
  }
}

/** Creates a signed session cookie for the admin. */
export async function createAdminSession(email: string): Promise<void> {
  const payload: SessionPayload = {
    email,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  };
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, createToken(payload), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

/** Checks whether the current request has a valid admin session. */
export async function hasAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifyToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value) !== null;
}

/**
 * Guards a page. If the request is not from the admin, redirects to the
 * login page. Returns true when the caller should render.
 */
export async function requireAdmin(): Promise<boolean> {
  const ok = await hasAdminSession();
  if (!ok) redirect("/admin/login");
  return true;
}

/** Clears the admin session cookie. */
export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

/** Validates login credentials against the .env values. */
export function checkAdminCredentials(email: string, password: string): boolean {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return false;
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}
