"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { ExternalLink, QrCode } from "lucide-react";

import {
  PAYMENT_NAME,
  PAYMENT_QR_CODE,
  PAYMENT_UPI_ID,
} from "@/lib/config";
import { formatPrice } from "@/lib/utils";

function BuildUpiLink({
  app,
  amount,
}: {
  app: "gpay" | "phonepe" | "amazon";
  amount: number;
}) {
  const pa = encodeURIComponent(PAYMENT_UPI_ID);
  const pn = encodeURIComponent(PAYMENT_NAME);
  const am = Math.round(amount);
  const tn = encodeURIComponent("Order payment");
  const common = `pa=${pa}&pn=${pn}&am=${am}&cu=INR&tn=${tn}`;
  switch (app) {
    case "gpay":
      return `https://pay.google.com/gp/p/ui/pay?${common}`;
    case "phonepe":
      return `upi://pay?${common}&app=phonepe`;
    case "amazon":
      return `upi://pay?${common}&app=amazon`;
  }
}

function BrandIcon({ icon }: { icon: "gpay" | "phonepe" | "amazon" }) {
  const common = {
    className: "size-6 shrink-0",
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    focusable: false,
  } as const;

  switch (icon) {
    case "gpay":
      return (
        <svg {...common}>
          <path
            fill="currentColor"
            d="M3.963 7.235A3.963 3.963 0 00.422 9.419a3.963 3.963 0 000 3.559 3.963 3.963 0 003.541 2.184c1.07 0 1.97-.352 2.627-.957.748-.69 1.18-1.71 1.18-2.916a4.722 4.722 0 00-.07-.806H3.964v1.526h2.14a1.835 1.835 0 01-.79 1.205c-.356.241-.814.379-1.35.379-1.034 0-1.911-.697-2.225-1.636a2.375 2.375 0 010-1.517c.314-.94 1.191-1.636 2.225-1.636a2.152 2.152 0 011.52.594l1.132-1.13a3.808 3.808 0 00-2.652-1.033zm6.501.55v6.9h.886V11.89h1.465c.603 0 1.11-.196 1.522-.588a1.911 1.911 0 00.635-1.464 1.92 1.92 0 00-.635-1.456 2.125 2.125 0 00-1.522-.598zm2.427.85a1.156 1.156 0 01.823.365 1.176 1.176 0 010 1.686 1.171 1.171 0 01-.877.357H11.35V8.635h1.487a1.156 1.156 0 01.054 0zm4.124 1.175c-.842 0-1.477.308-1.907.925l.781.491c.288-.417.68-.626 1.175-.626a1.255 1.255 0 01.856.323 1.009 1.009 0 01.366.785v.202c-.34-.193-.774-.289-1.3-.289-.617 0-1.11.145-1.479.434-.37.288-.554.677-.554 1.165a1.476 1.476 0 00.525 1.156c.35.308.785.463 1.305.463.61 0 1.098-.27 1.465-.81h.038v.655h.848v-2.909c0-.61-.19-1.09-.568-1.44-.38-.35-.896-.525-1.551-.525zm2.263.154l1.946 4.422-1.098 2.38h.915L24 9.963h-.965l-1.368 3.391h-.02l-1.406-3.39zm-2.146 2.368c.494 0 .88.11 1.156.33 0 .372-.147.696-.44.973a1.413 1.413 0 01-.997.414 1.081 1.081 0 01-.69-.232.708.708 0 01-.293-.578c0-.257.12-.47.363-.647.24-.173.54-.26.9-.26Z"
          />
        </svg>
      );
    case "phonepe":
      return (
        <svg {...common}>
          <path
            fill="currentColor"
            d="M10.206 9.941h2.949v4.692c-.402.201-.938.268-1.34.268-1.072 0-1.609-.536-1.609-1.743V9.941zm13.47 4.816c-1.523 6.449-7.985 10.442-14.433 8.919C2.794 22.154-1.199 15.691.324 9.243 1.847 2.794 8.309-1.199 14.757.324c6.449 1.523 10.442 7.985 8.919 14.433zm-6.231-5.888a.887.887 0 0 0-.871-.871h-1.609l-3.686-4.222c-.335-.402-.871-.536-1.407-.402l-1.274.401c-.201.067-.268.335-.134.469l4.021 3.82H6.386c-.201 0-.335.134-.335.335v.67c0 .469.402.871.871.871h.938v3.217c0 2.413 1.273 3.82 3.418 3.82.67 0 1.206-.067 1.877-.335v2.145c0 .603.469 1.072 1.072 1.072h.938a.432.432 0 0 0 .402-.402V9.874h1.542c.201 0 .335-.134.335-.335v-.67z"
          />
        </svg>
      );
    case "amazon":
      return (
        <svg {...common}>
          <path
            fill="currentColor"
            d="M14.3781 4.9945c-.3732-.3227-.953-.4843-1.7401-.4843-.3895 0-.779.0355-1.1684.1054-.3901.0706-.7172.1636-.9824.2797-.0993.0418-.166.0849-.1991.1304-.0331.0456-.05.1267-.05.2422v.3352c0 .1491.0537.224.1617.224a.337.337 0 0 0 .1061-.0187c.0374-.0125.0687-.0225.093-.0312.6385-.1904 1.247-.2859 1.8275-.2859.4968 0 .8451.0912 1.0442.274.1991.1823.2984.4969.2984.9444v.8201c-.5799-.141-1.1023-.211-1.5667-.211-.729 0-1.3088.1804-1.74.5406-.4308.3601-.6467.8432-.6467 1.448 0 .5642.1741 1.013.5224 1.3488.3477.3358.8201.503 1.4168.503.3564 0 .7147-.0705 1.0754-.2109.3608-.1404.6897-.3402.988-.5967l.0625.41c.025.1574.116.236.274.236h.5343c.1654 0 .249-.083.249-.2484V6.4987c-.0006-.6797-.1872-1.1809-.5599-1.5042zm-.6091 4.6c-.2734.2072-.5593.3645-.8576.4725-.2984.108-.5842.1617-.8576.1617-.3233 0-.5717-.085-.7459-.2547-.1741-.1698-.2609-.412-.2609-.7271 0-.721.4682-1.0817 1.4044-1.0817.2153 0 .4369.015.6647.0437.2278.0293.4456.0687.6529.118zM8.7726 6.402c-.1204-.402-.292-.744-.5161-1.0255-.2235-.2815-.4969-.4975-.8202-.6466-.3227-.1492-.6834-.2235-1.0816-.2235-.3727 0-.7378.07-1.0936.211-.3563.141-.6921.3483-1.0073.6216l-.0618-.3982c-.025-.1654-.1205-.2484-.2865-.2484h-.5468c-.1654 0-.2484.083-.2484.2484v8.3662c0 .166.083.2484.2484.2484h.7334c.166 0 .2484-.083.2484-.2484v-2.9086c.5387.4887 1.181.7334 1.9268.7334.4057 0 .7746-.0811 1.106-.2422.3314-.1616.6129-.3876.845-.6778.2323-.2896.4126-.6416.5406-1.0567.1286-.4144.1929-.8788.1929-1.3925.0012-.505-.0593-.9587-.1792-1.3606zM5.982 10.1369c-.5642 0-1.111-.1985-1.6409-.5967V6.0724c.5218-.3813 1.0773-.5717 1.666-.5717 1.1271 0 1.6907.7752 1.6907 2.3243-.0006 1.5417-.5723 2.3119-1.7158 2.3119zm13.0005 1.963l2.735-6.9612c.0575-.141.0868-.2403.0868-.2984 0-.0992-.058-.1491-.1741-.1491h-.696c-.1329 0-.2234.0212-.274.0624-.0499.0418-.0992.133-.1491.274l-1.6784 4.8228-1.7401-4.8228c-.05-.141-.0993-.2322-.1492-.274-.05-.0412-.141-.0624-.274-.0624h-.7459c-.116 0-.1741.0499-.1741.1491 0 .058.0287.1573.0868.2984l2.3992 5.917-.236.6341c-.141.3982-.2983.6716-.4724.8208-.1741.1491-.4188.2234-.7334.2234-.141 0-.2528-.0087-.3352-.025-.083-.0162-.1454-.025-.1866-.025-.1242 0-.1866.0787-.1866.236v.3233c0 .1161.0206.201.0624.2547.0412.0536.1074.0936.1991.118.2066.0574.4432.0873.7084.0873.4725 0 .8557-.1242 1.1497-.3732.2952-.2478.5543-.6585.7777-1.2302m2.7113 4.4233c-2.6276 1.9393-6.4369 2.9704-9.7174 2.9704-4.5975 0-8.7375-1.6996-11.8701-4.5283-.246-.2221-.0269-.5255.269-.3532 3.3798 1.9667 7.5597 3.1513 11.877 3.1513 2.9123 0 6.1136-.6042 9.0596-1.8537.4437-.1891.8163.2921.382.6135m1.0928-1.2483c.3364.4307-.3738 2.204-.691 2.996-.096.2396.11.3364.3271.1548 1.4094-1.179 1.7739-3.65 1.4855-4.0071-.2865-.3539-2.7506-.6585-4.2548.3976-.2316.1623-.1916.387.0649.3557.847-.101 2.7325-.3276 3.0683.103Z"
          />
        </svg>
      );
  }
}

const appConfig = {
  gpay: {
    label: (
      <span className="font-black">
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">o</span>
        <span className="text-[#4285F4]">g</span>
        <span className="text-[#34A853]">l</span>
        <span className="text-[#EA4335]">e</span>{" "}
        <span className="text-[#1f1f1f]">Pay</span>
      </span>
    ),
    bg: "border border-border bg-white text-[#4285F4]",
  },
  phonepe: {
    label: (
      <span className="text-white">
        Phone<span className="text-[#ffe500]">Pe</span>
      </span>
    ),
    bg: "bg-[#5f259f] text-white",
  },
  amazon: {
    label: (
      <span className="text-white">
        Amazon <span className="text-[#ff9900]">Pay</span>
      </span>
    ),
    bg: "bg-[#232f3e] text-white",
  },
} as const;

function CheckoutLinkBadge({
  app,
  amount,
}: {
  app: "gpay" | "phonepe" | "amazon";
  amount: number;
}) {
  const href = BuildUpiLink({ app, amount });
  const config = appConfig[app];

  return (
    <a
      href={href}
      rel="noreferrer"
      target={app === "gpay" ? "_blank" : undefined}
      aria-label={`Pay with ${app === "gpay" ? "Google Pay" : app === "phonepe" ? "PhonePe" : "Amazon Pay"}`}
      className={`group flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-bold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${config.bg}`}
    >
      <BrandIcon icon={app} />
      {config.label}
      <ExternalLink
        className="size-4 shrink-0 opacity-50 transition-opacity group-hover:opacity-100"
        aria-hidden="true"
      />
    </a>
  );
}

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

      <p className="mt-5 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Or pay directly with
      </p>
      <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        <CheckoutLinkBadge app="gpay" amount={amount} />
        <CheckoutLinkBadge app="phonepe" amount={amount} />
        <CheckoutLinkBadge app="amazon" amount={amount} />
      </div>

      <ol className="mt-5 space-y-2 rounded-lg bg-muted/50 p-4 text-sm">
        <li className="flex gap-2">
          <span className="font-bold text-primary">1.</span>
          Tap a pay button (GPay, PhonePe, Amazon Pay) to open the app directly
          with the exact amount.
        </li>
        <li className="flex gap-2">
          <span className="font-bold text-primary">2.</span>
          Or scan the QR code using any UPI app and pay the{" "}
          <strong>exact order amount</strong> shown above.
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