"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { orders } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-auth";

import { PAYMENT_STATUSES } from "./order-status-select";

export async function updateOrderStatus(input: {
  orderId: string;
  status: string;
}): Promise<void> {
  await requireAdmin();

  const { orderId, status } = input;
  if (!orderId || !(PAYMENT_STATUSES as readonly string[]).includes(status)) {
    return;
  }

  await db
    .update(orders)
    .set({ paymentStatus: status })
    .where(eq(orders.id, orderId));

  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}
