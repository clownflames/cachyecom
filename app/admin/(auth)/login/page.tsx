import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { hasAdminSession } from "@/lib/admin-auth";
import { SITE_NAME } from "@/lib/config";

import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await hasAdminSession()) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-black uppercase tracking-widest">
            {SITE_NAME}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Admin Dashboard
          </p>
        </div>

        <LoginForm />

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link href="/" className="hover:underline">
            &larr; Back to store
          </Link>
        </p>
      </div>
    </div>
  );
}
