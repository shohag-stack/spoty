import type { ReactNode } from "react";
import { buttonLabelRow } from "@/lib/button";
import { cn } from "@/lib/utils";

// React twin of components/ui/ButtonLabel.astro: the label rolls up on hover and a copy rolls in.
export function ButtonLabel({ children }: { children: ReactNode }) {
  return (
    <span className="relative block overflow-hidden">
      <span className={cn(buttonLabelRow, "group-hover/btn:-translate-y-full")}>{children}</span>
      <span aria-hidden="true" className={cn(buttonLabelRow, "absolute inset-0 translate-y-full group-hover/btn:translate-y-0")}>
        {children}
      </span>
    </span>
  );
}
