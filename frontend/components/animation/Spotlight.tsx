"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/(core)/lib/utils";

type Props = { children: ReactNode; className?: string; tone?: "dark" | "light" };

// Card wrapper with a soft glow that follows the cursor.
export function Spotlight({ children, className, tone = "dark" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${event.clientX - box.left}px`);
    el.style.setProperty("--spot-y", `${event.clientY - box.top}px`);
  };

  return (
    <div ref={ref} onPointerMove={move} className={cn("group/spot relative isolate overflow-hidden", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100",
          tone === "dark"
            ? "bg-[radial-gradient(420px_circle_at_var(--spot-x)_var(--spot-y),rgb(0_0_0/0.07),transparent_65%)]"
            : "bg-[radial-gradient(420px_circle_at_var(--spot-x)_var(--spot-y),rgb(255_255_255/0.16),transparent_65%)]"
        )}
      />
      {children}
    </div>
  );
}
