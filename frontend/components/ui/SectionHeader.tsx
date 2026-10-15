import type { ReactNode } from "react";
import { cn } from "@/(core)/lib/utils";

type Props = {
  heading: string;
  text?: string;
  aside?: ReactNode;
  className?: string;
};

// Heading on the left, intro text (or any element) on the right — used by most sections.
export function SectionHeader({ heading, text, aside, className }: Props) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-2 md:items-end md:gap-16", className)}>
      <h2 className="max-w-xl text-4xl font-medium text-balance md:text-5xl lg:text-heading">{heading}</h2>
      {(text || aside) && (
        <div className="max-w-md md:justify-self-end">
          {text && <p className="text-base leading-relaxed text-muted">{text}</p>}
          {aside}
        </div>
      )}
    </div>
  );
}
