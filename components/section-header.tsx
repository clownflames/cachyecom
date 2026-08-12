'use client'
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function SectionHeader({
  title,
  subtitle,
  href,
  hrefLabel = "View All",
  className,
  showSaleBadge = false,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  hrefLabel?: string;
  className?: string;
  showSaleBadge?: boolean;
}) {
  // Fake timer state (10-11 minutes)
  const [timeLeft, setTimeLeft] = useState(() => {
    const randomMinutes = 10 + Math.random();
    return Math.floor(randomMinutes * 60);
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const randomMinutes = 10 + Math.random();
          return Math.floor(randomMinutes * 60);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

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

      {showSaleBadge ? (
        // Timer left, Sale is Live right
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm font-bold text-[#212121]">
            <Clock className="size-4" />
            <span className="font-mono tabular-nums">{formatTime(timeLeft)}</span>
          </div>
          <div className="rounded-md bg-red-600 px-4 py-2 text-sm font-bold text-white">
            Sale is Live
          </div>
        </div>
      ) : (
        href && (
          <Link
            href={href}
            className="group flex items-center gap-1.5 text-sm font-bold text-[#2874f0] transition-colors hover:text-[#1c5cc0]"
          >
            {hrefLabel}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )
      )}
    </div>
  );
}