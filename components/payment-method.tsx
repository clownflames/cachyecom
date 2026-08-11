"use client";

import { Banknote, QrCode, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type PaymentMethodValue = "QR" | "COD";

const options: {
  value: PaymentMethodValue;
  label: string;
  desc: string;
  icon: LucideIcon;
}[] = [
  {
    value: "QR",
    label: "Pay via QR Code",
    desc: "Scan & pay instantly with any UPI app",
    icon: QrCode,
  },
  {
    value: "COD",
    label: "Cash on Delivery",
    desc: "Pay when your order is delivered",
    icon: Banknote,
  },
];

export function PaymentMethodRadio({
  value,
  onChange,
}: {
  value: PaymentMethodValue;
  onChange: (value: PaymentMethodValue) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Payment Method
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all",
                selected
                  ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                  : "border-border hover:border-muted-foreground/40"
              )}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span
                className={cn(
                  "grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors",
                  selected ? "border-primary" : "border-muted-foreground/40"
                )}
                aria-hidden="true"
              >
                {selected && (
                  <span className="size-2.5 rounded-full bg-primary" />
                )}
              </span>
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-muted">
                <option.icon className="size-5 text-primary" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-semibold">{option.label}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {option.desc}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
