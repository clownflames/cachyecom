import {
  BadgePercent,
  HandCoins,
  Headset,
  ShieldCheck,
  Truck,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: BadgePercent,
    title: "Unbeatable Prices",
    text: "Massive discounts with up to 99% OFF across categories.",
  },
  {
    icon: Zap,
    title: "Big Sale Deals",
    text: "Limited-time offers refreshed constantly - grab them fast.",
  },
  {
    icon: Truck,
    title: "Fast & Easy Delivery",
    text: "Quick dispatch and doorstep delivery across India.",
  },
  {
    icon: HandCoins,
    title: "Cash on Delivery",
    text: "Pay when your order reaches you - zero advance needed.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    text: "Safe QR / UPI payment options and verified ordering.",
  },
  {
    icon: Headset,
    title: "Friendly Support",
    text: "Our support team helps you before and after your order.",
  },
];

export function WhyShopSection() {
  return (
    <section
      aria-labelledby="why-heading"
      className="rounded-lg bg-white shadow-sm"
    >
      <div className="border-b border-border px-4 py-3 sm:px-5">
        <h2
          id="why-heading"
          className="text-base font-bold tracking-tight text-[#212121] sm:text-lg"
        >
          Why Shop With Us
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-px bg-[#f1f3f6] p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="flex items-start gap-3 bg-white p-4"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f1f3f6] text-[#2874f0]">
              <f.icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-[#212121]">{f.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-[#878787]">
                {f.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}