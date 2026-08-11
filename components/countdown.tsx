"use client";

import { useEffect, useState } from "react";
import { Timer, CircleAlert } from "lucide-react";

import { SALE_END_DATE } from "@/lib/config";
import { cn } from "@/lib/utils";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(endTime: number, now: number): TimeLeft {
  const diff = Math.max(0, endTime - now);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

function TimeBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="grid h-14 w-16 place-items-center rounded-lg bg-white text-2xl font-black tabular-nums text-primary shadow-sm sm:h-16 sm:w-20 sm:text-3xl">
        {value}
      </div>
      <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground/80 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export function Countdown({ className }: { className?: string }) {
  const [now, setNow] = useState<number | null>(null);
  const endTime = new Date(SALE_END_DATE).getTime();

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    const frame = window.requestAnimationFrame(() => setNow(Date.now()));
    return () => {
      window.clearInterval(id);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  if (now === null) {
    // Static placeholder on the server + first client render to avoid
    // hydration mismatches.
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-3 rounded-xl bg-primary px-5 py-4 text-primary-foreground sm:gap-4 sm:px-8",
          className
        )}
        aria-hidden="true"
      >
        <Timer className="size-5" />
        <span className="text-sm font-semibold uppercase tracking-wider">
          Sale ends in
        </span>
        <TimeBox value="00" label="Days" />
        <span className="text-xl font-bold">:</span>
        <TimeBox value="00" label="Hours" />
        <span className="text-xl font-bold">:</span>
        <TimeBox value="00" label="Minutes" />
        <span className="text-xl font-bold">:</span>
        <TimeBox value="00" label="Seconds" />
      </div>
    );
  }

  const timeLeft = getTimeLeft(endTime, now);
  const ended = endTime - now <= 0;

  if (ended) {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-3 rounded-xl bg-foreground px-5 py-4 text-background sm:px-8",
          className
        )}
        role="status"
      >
        <CircleAlert className="size-5" aria-hidden="true" />
        <div>
          <p className="text-base font-black uppercase tracking-widest sm:text-lg">
            SALE ENDED
          </p>
          <p className="text-xs text-background/70">
            This sale has ended. Check back soon for new deals.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-4 text-primary-foreground sm:gap-3 sm:px-8",
        className
      )}
      role="timer"
      aria-live="off"
      aria-label={`Sale ends in ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`}
    >
      <div className="mr-1 flex items-center gap-1.5 sm:mr-3">
        <Timer className="size-5" aria-hidden="true" />
        <span className="text-xs font-bold uppercase tracking-wider sm:text-sm">
          Sale ends in
        </span>
      </div>
      <TimeBox value={pad(timeLeft.days)} label="Days" />
      <span className="text-lg font-bold">:</span>
      <TimeBox value={pad(timeLeft.hours)} label="Hours" />
      <span className="text-lg font-bold">:</span>
      <TimeBox value={pad(timeLeft.minutes)} label="Minutes" />
      <span className="text-lg font-bold">:</span>
      <TimeBox value={pad(timeLeft.seconds)} label="Seconds" />
    </div>
  );
}
