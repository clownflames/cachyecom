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
    <section aria-labelledby="why-heading">
      <div className="mb-5 text-center sm:mb-7">
        <h2
          id="why-heading"
          className="text-xl font-black tracking-tight sm:text-2xl lg:text-3xl"
        >
          Why Shop With Us
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The BIG DEAL promise - great products, great prices, great service.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
              <f.icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {f.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
