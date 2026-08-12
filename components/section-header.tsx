import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  subtitle,
  href,
  hrefLabel = "View All",
  className,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  hrefLabel?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-5 flex flex-wrap items-end justify-between gap-3 sm:mb-7",
        className
      )}
    >
      <div>
        <h2 className="text-xl font-bold tracking-tight text-[#212121] sm:text-2xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-[#878787]">{subtitle}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="group flex items-center gap-1.5 text-sm font-bold text-[#2874f0] transition-colors hover:text-[#1c5cc0]"
        >
          {hrefLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
