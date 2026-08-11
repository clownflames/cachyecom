import Link from "next/link";

import { requireAdmin } from "@/lib/admin-auth";
import { SITE_NAME } from "@/lib/config";

import { AdminNav } from "@/components/admin-nav";
import { Button } from "@/components/ui/button";
import { logoutAction } from "../actions";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAdmin();

  return (
    <div className="flex min-h-screen bg-muted/40">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-card md:flex">
        <div className="flex h-16 items-center border-b border-border px-5">
          <Link href="/admin" className="text-lg font-black uppercase tracking-widest">
            {SITE_NAME}
            <span className="block text-xs font-medium normal-case tracking-normal text-muted-foreground">
              Admin
            </span>
          </Link>
        </div>

        <div className="flex-1 space-y-4 px-3 py-4">
          <AdminNav />
        </div>

        <div className="space-y-2 border-t border-border p-3">
          <Link href="/" target="_blank">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              View Store
            </Button>
          </Link>
          <form action={logoutAction}>
            <Button
              type="submit"
              variant="destructive"
              className="w-full"
              size="sm"
            >
              Logout
            </Button>
          </form>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 md:hidden">
          <Link href="/admin" className="text-lg font-black uppercase tracking-widest">
            {SITE_NAME} <span className="text-xs font-medium normal-case text-muted-foreground">Admin</span>
          </Link>
          <form action={logoutAction}>
            <Button type="submit" variant="destructive" size="sm">
              Logout
            </Button>
          </form>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
