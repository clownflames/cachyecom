import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  Banknote,
  CircleCheck,
  Mail,
  QrCode,
  ShieldCheck,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Order Received",
  description: "Your order has been received. Thank you for shopping with us!",
  robots: { index: false },
};

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const orderId = Array.isArray(params.orderId)
    ? params.orderId[0]
    : (params.orderId ?? "");
  const total = Array.isArray(params.total)
    ? params.total[0]
    : (params.total ?? "");
  const method = Array.isArray(params.method)
    ? params.method[0]
    : (params.method ?? "");
  const email = Array.isArray(params.email)
    ? params.email[0]
    : (params.email ?? "");

  const isQr = method === "QR";

  if (!orderId) {
    return (
      <div className="mx-auto flex min-h-[50vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
        <BadgeCheck className="size-16 text-primary" aria-hidden="true" />
        <h1 className="mt-4 text-2xl font-black sm:text-3xl">
          Order Submitted
        </h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Thank you for shopping with us! Your order details were sent to your
          email. If you have any questions, check your inbox or contact our
          support team.
        </p>
        <Link
          href="/products"
          className={cn(buttonVariants({ size: "lg" }), "mt-6 rounded-lg px-8")}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-3 py-10 sm:px-6 sm:py-14">
      <div className="text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
          <CircleCheck className="size-10" aria-hidden="true" />
        </span>
        <h1 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">
          Order Received
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you for your order. We are on it!
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="border-b border-border bg-muted/40 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Order ID
          </p>
          <p className="mt-1 text-lg font-black tracking-wide">
            #{orderId}
          </p>
        </div>

        <div className="space-y-5 px-5 py-5 sm:px-6">
          {/* Total */}
          <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
            <span className="text-sm font-semibold">Order Total</span>
            <span className="text-2xl font-black">
              {total ? formatPrice(Number(total)) : "--"}
            </span>
          </div>

          {/* Payment */}
          <div className="flex items-start gap-3 rounded-xl border border-border p-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
              {isQr ? (
                <QrCode className="size-5" aria-hidden="true" />
              ) : (
                <Banknote className="size-5" aria-hidden="true" />
              )}
            </span>
            <div className="text-sm">
              <p className="font-semibold">
                Payment Method: {isQr ? "QR Payment (UPI)" : "Cash on Delivery"}
              </p>
              {isQr ? (
                <>
                  <p className="mt-1 flex items-center gap-1.5 text-muted-foreground">
                    <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
                    Payment verification status:{" "}
                    <span className="font-semibold text-amber-600">
                      Pending verification
                    </span>
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    We will verify your payment and confirm it shortly.
                  </p>
                </>
              ) : (
                <p className="mt-1 text-muted-foreground">
                  Payment: Cash on Delivery. Pay when your order arrives.
                </p>
              )}
            </div>
          </div>

          {/* Email note */}
          <p className="flex items-center justify-center gap-1.5 text-center text-sm text-muted-foreground">
            <Mail className="size-4 text-primary" aria-hidden="true" />
            Order details have been sent to{" "}
            <span className="font-semibold text-foreground">
              {email || "your email"}
            </span>
            .
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/products"
          className={cn(buttonVariants({ size: "lg" }), "w-full rounded-lg px-8 sm:w-auto")}
        >
          Continue Shopping
        </Link>
        <Link
          href="/contact"
          className={cn(
            buttonVariants({ size: "lg", variant: "outline" }),
            "w-full rounded-lg px-8 sm:w-auto"
          )}
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
