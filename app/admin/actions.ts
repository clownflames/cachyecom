"use server";

import { redirect } from "next/navigation";

import {
  checkAdminCredentials,
  createAdminSession,
  destroyAdminSession,
} from "@/lib/admin-auth";

export type LoginState = { error?: string } | null;

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!checkAdminCredentials(email, password)) {
    return { error: "Invalid email or password. Please try again." };
  }

  await createAdminSession(email);
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroyAdminSession();
  redirect("/admin/login");
}
