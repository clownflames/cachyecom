import { count, desc, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { orders, products } from "@/db/schema";
import { formatNumber, formatPrice } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-black">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export default async function AdminDashboardPage() {
  const [productCount] = await db
    .select({ value: count() })
    .from(products);
  const [orderCount] = await db.select({ value: count() }).from(orders);
  const [revenue] = await db
    .select({ value: sql<number>`coalesce(sum(${orders.total}), 0)` })
    .from(orders);
  const [pendingCount] = await db
    .select({ value: count() })
    .from(orders)
    .where(
      eq(
        orders.paymentStatus,
        "Verification Pending"
      )
    );

  const recentOrders = await db
    .select()
    .from(orders)
    .orderBy(desc(orders.createdAt))
    .limit(8);

  const lowStock = await db
    .select({ id: products.id, name: products.name, stock: products.stock })
    .from(products)
    .where(sql`${products.stock} < 10`)
    .orderBy(products.stock)
    .limit(5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Store overview at a glance.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Products" value={formatNumber(productCount.value)} />
        <StatCard label="Total Orders" value={formatNumber(orderCount.value)} />
        <StatCard label="Revenue" value={formatPrice(Number(revenue.value))} />
        <StatCard
          label="Pending Payments"
          value={formatNumber(pendingCount.value)}
          hint="QR orders waiting for verification"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-black">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              View all
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="px-5 py-8 text-sm text-muted-foreground">
              No orders yet. Orders placed on the store will appear here.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {recentOrders.map((order) => (
                <li key={order.id} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <p className="text-sm font-semibold">#{order.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.customerName} · {order.paymentMethod}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{formatPrice(order.total)}</p>
                    <p className="text-xs text-muted-foreground">{order.paymentStatus}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-black">Low Stock</h2>
            <Link
              href="/admin/products"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Manage
            </Link>
          </div>
          {lowStock.length === 0 ? (
            <p className="px-5 py-8 text-sm text-muted-foreground">
              All products have sufficient stock.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {lowStock.map((product) => (
                <li key={product.id} className="flex items-center justify-between px-5 py-3">
                  <p className="truncate text-sm font-medium">{product.name}</p>
                  <span className="ml-4 shrink-0 rounded-md bg-destructive/10 px-2 py-1 text-xs font-bold text-destructive">
                    {product.stock} left
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
