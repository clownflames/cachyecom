"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";

import {
  PAYMENT_NAME,
  PAYMENT_QR_CODE,
  PAYMENT_UPI_ID,
} from "@/lib/config";
import { formatPrice } from "@/lib/utils";

export function QrPayment({ amount }: { amount: number }) {
  const [qrSrc, setQrSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (PAYMENT_QR_CODE) {
      const frame = window.requestAnimationFrame(() => {
        if (!cancelled) setQrSrc(PAYMENT_QR_CODE);
      });
      return () => {
        cancelled = true;
        window.cancelAnimationFrame(frame);
      };
    }

    const upi = `upi://pay?pa=${encodeURIComponent(
      PAYMENT_UPI_ID
    )}&pn=${encodeURIComponent(PAYMENT_NAME)}&am=${Math.round(
      amount
    )}&cu=INR`;

    QRCode.toDataURL(upi, {
      width: 420,
      margin: 2,
      errorCorrectionLevel: "M",
    })
      .then((url) => {
        if (!cancelled) setQrSrc(url);
      })
      .catch(() => {
        if (!cancelled) setQrSrc(null);
      });

    return () => {
      cancelled = true;
    };
  }, [amount]);

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="text-center text-base font-black uppercase tracking-widest">
        Scan &amp; Pay
      </h3>

      <div className="mx-auto mt-4 flex w-fit items-center justify-center rounded-xl border border-border bg-white p-3 shadow-sm">
        {qrSrc ? (
          <Image
            src={qrSrc}
            alt="UPI payment QR code - scan to pay"
            width={230}
            height={230}
            unoptimized
            className="h-[200px] w-[200px] object-contain sm:h-[230px] sm:w-[230px]"
          />
        ) : (
          <div
            className="grid h-[200px] w-[200px] place-items-center text-center text-xs text-muted-foreground sm:h-[230px] sm:w-[230px]"
            aria-busy="true"
          >
            Generating QR code...
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Amount to Pay:{" "}
        <span className="text-lg font-black text-foreground">
          {formatPrice(amount)}
        </span>
      </p>
      <p className="mt-1 text-center text-xs text-muted-foreground">
        Pay to UPI ID: <span className="font-semibold">{PAYMENT_UPI_ID}</span>
        {"  "}·{"  "}
        {PAYMENT_NAME}
      </p>

      <ol className="mt-5 space-y-2 rounded-lg bg-muted/50 p-4 text-sm">
        <li className="flex gap-2">
          <span className="font-bold text-primary">1.</span>
          Scan the QR code using any UPI app (GPay, PhonePe, Paytm, etc.).
        </li>
        <li className="flex gap-2">
          <span className="font-bold text-primary">2.</span>
          Pay the <strong>exact order amount</strong> shown above.
        </li>
        <li className="flex gap-2">
          <span className="font-bold text-primary">3.</span>
          After payment, enter your Transaction ID / UTR below.
        </li>
        <li className="flex gap-2">
          <span className="font-bold text-primary">4.</span>
          Submit the order. We will verify your payment manually.
        </li>
      </ol>
    </div>
  );
}
