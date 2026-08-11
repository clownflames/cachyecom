"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { OrderItemRow } from "@/db/schema";

export function OrderItemsDetails({
  items,
}: {
  items: OrderItemRow[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4 border-t border-border px-5 py-4">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen((v) => !v)}
        className="w-full justify-between sm:w-auto"
      >
        <span className="inline-flex items-center gap-2">
          <Package className="size-4" />
          {open ? "Hide Order Items" : "View Order Items"} ({items.length})
        </span>
        {open ? (
          <ChevronUp className="size-4" />
        ) : (
          <ChevronDown className="size-4" />
        )}
      </Button>

      {open ? (
        <div className="mt-3 overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-semibold">#</th>
                <th className="px-3 py-2 font-semibold">Product</th>
                <th className="px-3 py-2 font-semibold">Product ID</th>
                <th className="px-3 py-2 text-center font-semibold">Qty</th>
                <th className="px-3 py-2 text-right font-semibold">Unit Price</th>
                <th className="px-3 py-2 text-right font-semibold">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-3 py-2 text-muted-foreground">{index + 1}</td>
                  <td className="px-3 py-2 font-medium">{item.name}</td>
                  <td className="px-3 py-2 text-muted-foreground">{item.productId}</td>
                  <td className="px-3 py-2 text-center">{item.quantity}</td>
                  <td className="px-3 py-2 text-right">{formatPrice(item.unitPrice)}</td>
                  <td className="px-3 py-2 text-right font-semibold">
                    {formatPrice(item.lineSubtotal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
