import Link from "next/link";
import { SearchX } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
      <SearchX className="size-16 text-primary" aria-hidden="true" />
      <p className="mt-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
        404
      </p>
      <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        The page you are looking for does not exist or may have been moved during
        the sale shuffle.
      </p>
      <Link
        href="/"
        className={cn(buttonVariants({ size: "lg" }), "mt-6 rounded-lg px-8")}
      >
        Back to Home
      </Link>
    </div>
  );
}
