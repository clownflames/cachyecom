import { desc, inArray } from "drizzle-orm";

import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { formatPrice } from "@/lib/utils";

import { OrderStatusSelect } from "./order-status-select";
import { OrderItemsDetails } from "./order-items-details";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Orders",
};

export default async function AdminOrdersPage() {
  const rows = await db.select().from(orders).orderBy(desc(orders.createdAt));

  const itemsByOrder = new Map<string, typeof orderItems.$inferSelect[]>();
  if (rows.length > 0) {
    const items = await db
      .select()
      .from(orderItems)
      .where(
        inArray(orderItems.orderId, rows.map((order) => order.id))
      );
    for (const item of items) {
      const list = itemsByOrder.get(item.orderId) ?? [];
      list.push(item);
      itemsByOrder.set(item.orderId, list);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black">Orders</h1>
        <p className="text-sm text-muted-foreground">
          {rows.length} orders total. QR payment verify karo aur status update karo.
        </p>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-10 text-center text-muted-foreground">
          Abhi koi order nahi aaya.
        </div>
      ) : (
        <div className="space-y-4">
          {rows.map((order) => {
            const items = itemsByOrder.get(order.id) ?? [];
            return (
              <div key={order.id} className="rounded-xl border border-border bg-card">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
                  <div>
                    <p className="font-black">#{order.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.orderDate} · {order.customerName} · {order.customerPhone}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold">{formatPrice(order.total)}</span>
                    <OrderStatusSelect orderId={order.id} current={order.paymentStatus} />
                  </div>
                </div>

                <div className="grid gap-4 p-5 md:grid-cols-2">
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold">Customer</p>
                    <p className="text-muted-foreground">{order.customerName}</p>
                    <p className="text-muted-foreground">{order.customerEmail}</p>
                    <p className="text-muted-foreground">{order.customerPhone}</p>
                    <p className="pt-2 font-semibold">Shipping Address</p>
                    <p className="text-muted-foreground">
                      {order.address}, {order.city}, {order.state} - {order.pincode}
                      {order.landmark ? ` (${order.landmark})` : ""}
                    </p>
                  </div>

                  <div className="space-y-1 text-sm">
                    <p className="font-semibold">Payment</p>
                    <p className="text-muted-foreground">
                      Method: {order.paymentMethod === "QR" ? "QR (UPI)" : "Cash on Delivery"}
                    </p>
                    <p className="text-muted-foreground">Status: {order.paymentStatus}</p>
                    {order.transactionId ? (
                      <p className="break-all text-muted-foreground">
                        Txn ID: <span className="font-medium">{order.transactionId}</span>
                      </p>
                    ) : null}
                  </div>
                </div>

                <OrderItemsDetails items={items} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
