import type { ReactNode } from "react";
import { cn } from "@/(core)/lib/utils";

// Small rounded label ("Our story", specialties, badges).
export function Pill({ children, tone = "dark", className }: { children: ReactNode; tone?: "dark" | "light" | "solid"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-4 py-1.5 text-sm",
        tone === "dark" && "border border-ink/20 text-ink",
        tone === "light" && "border border-white/60 text-white",
        tone === "solid" && "bg-white text-ink",
        className
      )}
    >
      {children}
    </span>
  );
}
