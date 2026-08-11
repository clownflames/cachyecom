"use client";

import { useState, useTransition, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { CircleAlert, Loader2, Lock, ShoppingBag } from "lucide-react";

import { placeOrder } from "@/app/actions/order";
import { useCart } from "@/components/cart-provider";
import { PaymentMethodRadio, type PaymentMethodValue } from "@/components/payment-method";
import { QrPayment } from "@/components/qr-payment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { orderFormSchema } from "@/lib/order-schema";
import { formatPrice } from "@/lib/utils";

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id}>
        {label}
        {required && (
          <span className="text-destructive" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs font-medium text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function CheckoutClient() {
  const { hydrated, lines, subtotal, discount, count, clearCart } = useCart();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodValue>("QR");
  const [transactionId, setTransactionId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setField = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[`customer.${key}`]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[`customer.${key}`];
        return next;
      });
    }
  };

  const submitOrder = (e: FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const payload = {
      customer: {
        name: form.name,
        phone: form.phone,
        email: form.email,
      },
      address: {
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        landmark: form.landmark,
      },
      paymentMethod,
      transactionId,
      items: lines.map((line) => ({
        productId: line.productId,
        quantity: line.quantity,
      })),
    };

    const parsed = orderFormSchema.safeParse(payload);
    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const path = issue.path.join(".");
        if (!nextErrors[path]) nextErrors[path] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    startTransition(async () => {
      const result = await placeOrder(payload);
      if (result.success) {
        clearCart();
        const params = new URLSearchParams({
          orderId: result.orderId,
          total: String(result.total),
          method: result.paymentMethod,
          email: result.customerEmail,
        });
        router.push(`/order-success?${params.toString()}`);
      } else {
        setServerError(result.message);
      }
    });
  };

  if (!hydrated) {
    return (
      <div className="mt-8 space-y-4" aria-busy="true">
        <div className="h-64 animate-pulse rounded-xl border border-border bg-muted/50" />
        <div className="h-64 animate-pulse rounded-xl border border-border bg-muted/50" />
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-border py-16 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-muted">
          <ShoppingBag className="size-8 text-muted-foreground" />
        </span>
        <h2 className="mt-4 text-lg font-bold">Nothing to check out</h2>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Your cart is empty. Add some products before heading to checkout.
        </p>
        <Button
          type="button"
          onClick={() => router.push("/products")}
          className="mt-6 rounded-lg px-8"
          size="lg"
        >
          Browse Products
        </Button>
      </div>
    );
  }

  const isQr = paymentMethod === "QR";

  return (
    <form
      onSubmit={submitOrder}
      noValidate
      className="mt-6 grid gap-6 lg:grid-cols-[1fr_400px]"
    >
      {/* Left column */}
      <div className="space-y-6">
        {serverError && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive"
          >
            <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-semibold">We could not submit your order</p>
              <p className="mt-0.5">{serverError}</p>
            </div>
          </div>
        )}

        {errors.items && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive"
          >
            <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            <p>{errors.items}</p>
          </div>
        )}

        {/* Customer information */}
        <section
          aria-labelledby="customer-heading"
          className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5"
        >
          <h2 id="customer-heading" className="text-base font-black">
            Customer Information
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field id="name" label="Full Name" required error={errors["customer.name"]}>
              <Input
                id="name"
                autoComplete="name"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="e.g. Rahul Sharma"
                aria-invalid={!!errors["customer.name"]}
                aria-describedby={
                  errors["customer.name"] ? "name-error" : undefined
                }
              />
            </Field>
            <Field id="phone" label="Mobile Number" required error={errors["customer.phone"]}>
              <Input
                id="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) =>
                  setField("phone", e.target.value.replace(/[^0-9+]/g, ""))
                }
                placeholder="10-digit mobile number"
                maxLength={13}
                aria-invalid={!!errors["customer.phone"]}
                aria-describedby={
                  errors["customer.phone"] ? "phone-error" : undefined
                }
              />
            </Field>
            <div className="sm:col-span-2">
              <Field id="email" label="Email Address" required error={errors["customer.email"]}>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="you@example.com"
                  aria-invalid={!!errors["customer.email"]}
                  aria-describedby={
                    errors["customer.email"] ? "email-error" : undefined
                  }
                />
              </Field>
            </div>
          </div>
        </section>

        {/* Address */}
        <section
          aria-labelledby="address-heading"
          className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5"
        >
          <h2 id="address-heading" className="text-base font-black">
            Delivery Address
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field id="address" label="House / Building, Street / Area" required error={errors["address.address"]}>
                <Textarea
                  id="address"
                  rows={2}
                  autoComplete="street-address"
                  value={form.address}
                  onChange={(e) => setField("address", e.target.value)}
                  placeholder="House no, building, street, area"
                  aria-invalid={!!errors["address.address"]}
                  aria-describedby={
                    errors["address.address"] ? "address-error" : undefined
                  }
                />
              </Field>
            </div>
            <Field id="city" label="City" required error={errors["address.city"]}>
              <Input
                id="city"
                autoComplete="address-level2"
                value={form.city}
                onChange={(e) => setField("city", e.target.value)}
                placeholder="e.g. Mumbai"
                aria-invalid={!!errors["address.city"]}
                aria-describedby={
                  errors["address.city"] ? "city-error" : undefined
                }
              />
            </Field>
            <Field id="state" label="State" required error={errors["address.state"]}>
              <Input
                id="state"
                autoComplete="address-level1"
                value={form.state}
                onChange={(e) => setField("state", e.target.value)}
                placeholder="e.g. Maharashtra"
                aria-invalid={!!errors["address.state"]}
                aria-describedby={
                  errors["address.state"] ? "state-error" : undefined
                }
              />
            </Field>
            <Field id="pincode" label="Pincode" required error={errors["address.pincode"]}>
              <Input
                id="pincode"
                type="tel"
                inputMode="numeric"
                autoComplete="postal-code"
                value={form.pincode}
                onChange={(e) =>
                  setField("pincode", e.target.value.replace(/[^0-9]/g, ""))
                }
                placeholder="6-digit pincode"
                maxLength={6}
                aria-invalid={!!errors["address.pincode"]}
                aria-describedby={
                  errors["address.pincode"] ? "pincode-error" : undefined
                }
              />
            </Field>
            <Field id="landmark" label="Landmark" error={errors["address.landmark"]}>
              <Input
                id="landmark"
                value={form.landmark}
                onChange={(e) => setField("landmark", e.target.value)}
                placeholder="Optional - near any famous place"
                maxLength={120}
              />
            </Field>
          </div>
        </section>

        {/* Payment */}
        <section
          aria-labelledby="payment-heading"
          className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5"
        >
          <h2 id="payment-heading" className="text-base font-black">
            Payment
          </h2>
          <div className="mt-4">
            <PaymentMethodRadio
              value={paymentMethod}
              onChange={(v) => {
                setPaymentMethod(v);
                if (v === "COD") setErrors((prev) => {
                  const next = { ...prev };
                  delete next.transactionId;
                  return next;
                });
              }}
            />
          </div>

          {isQr ? (
            <div className="mt-5">
              <QrPayment amount={subtotal} />
              <div className="mt-4">
                <Field
                  id="transactionId"
                  label="Transaction ID / UTR"
                  required
                  error={errors.transactionId}
                >
                  <Input
                    id="transactionId"
                    value={transactionId}
                    onChange={(e) =>
                      setTransactionId(
                        e.target.value.replace(/[^A-Za-z0-9.\-_:/ ]/g, "")
                      )
                    }
                    placeholder="Enter your UPI Transaction ID / UTR"
                    maxLength={60}
                    aria-invalid={!!errors.transactionId}
                    aria-describedby={
                      errors.transactionId ? "transactionId-error" : undefined
                    }
                  />
                </Field>
                <p className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
                  <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                  Entering a Transaction ID does not confirm payment. Your order
                  is placed with <strong>Payment Status: Verification Pending</strong>{" "}
                  until we verify it manually.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-5 rounded-xl bg-muted/50 p-4 text-sm">
              <p className="font-semibold">Pay when your order is delivered.</p>
              <p className="mt-1 text-muted-foreground">
                Keep the total amount ready in cash. Our delivery partner will
                collect it when your order arrives.
              </p>
            </div>
          )}
        </section>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="w-full rounded-xl py-4 text-sm font-bold"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Placing Order...
            </>
          ) : isQr ? (
            "Confirm Payment & Place Order"
          ) : (
            "Place COD Order"
          )}
        </Button>
        <p className="-mt-3 text-center text-xs text-muted-foreground">
          By placing this order you agree to our{" "}
          <a href="/terms" className="font-medium text-primary hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="/refund-policy" className="font-medium text-primary hover:underline">
            Refund Policy
          </a>
          .
        </p>
      </div>

      {/* Right column - order summary */}
      <aside
        aria-label="Order summary"
        className="h-fit rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5 lg:sticky lg:top-24"
      >
        <h2 className="text-base font-black">Order Summary</h2>
        <ul className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
          {lines.map((line) => (
            <li key={line.productId} className="flex items-center gap-3 text-sm">
              <div className="relative grid size-12 shrink-0 place-items-center rounded-lg bg-muted text-xs font-bold">
                {line.quantity}
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 font-medium">{line.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatPrice(line.salePrice)} × {line.quantity}
                </p>
              </div>
              <p className="font-semibold">{formatPrice(line.lineSubtotal)}</p>
            </li>
          ))}
        </ul>

        <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal ({count} items)</dt>
            <dd className="font-medium">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Discount</dt>
            <dd className="font-medium text-emerald-600">
              - {formatPrice(discount)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd className="font-medium">Calculated on delivery</dd>
          </div>
        </dl>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="font-bold">Total</span>
          <span className="text-2xl font-black">{formatPrice(subtotal)}</span>
        </div>
        <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
          You save {formatPrice(discount)} on this order.
        </p>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Prices are recalculated securely when you place the order.
        </p>
      </aside>
    </form>
  );
}
