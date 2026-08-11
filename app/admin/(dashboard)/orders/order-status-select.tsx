"use client";

import { updateOrderStatus } from "./actions";

export const PAYMENT_STATUSES = [
  "Verification Pending",
  "Payment Verified",
  "Payment Failed",
  "COD - Payment Pending",
  "COD - Delivered",
  "Cancelled",
] as const;

export function OrderStatusSelect({
  orderId,
  current,
}: {
  orderId: string;
  current: string;
}) {
  return (
    <select
      defaultValue={current}
      onChange={(e) => updateOrderStatus({ orderId, status: e.target.value })}
      className="rounded-md border border-input bg-background px-2 py-1.5 text-sm"
    >
      {PAYMENT_STATUSES.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}
