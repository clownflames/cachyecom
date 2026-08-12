"use client";

import { useEffect, useState } from "react";
import { Timer, CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

function getRandomDuration(): number {
  return Math.random() < 0.5 ? 10 * 60 : 11 * 60;
}

export function RandomTimer({ className }: { className?: string }) {
  const [duration, setDuration] = useState<number>(getRandomDuration);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setDuration((prev) => {
        const newDuration = prev - 1;
        if (newDuration <= 0) {
          setDuration(getRandomDuration());
          return getRandomDuration();
        }
        return newDuration;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (now === null) {
    return null;
  }

  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#212121] shadow-sm sm:px-5 sm:py-3",
        className
      )}
      role="timer"
      aria-live="polite"
    >
      <Timer className="size-4 fill-current text-[#ff6161]" aria-hidden="true" />
      <span className="font-semibold text-[#ff6161]">
        {minutes}:{seconds < 10 ? "0" : ""}{seconds}
      </span>
      <span className="text-[10px] text-gray-500 uppercase tracking-wider">
        min
      </span>
    </div>
  );
}