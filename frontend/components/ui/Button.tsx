import Link from "next/link";
import type { ReactNode } from "react";
import { cn, isExternal } from "@/(core)/lib/utils";
import type { LinkData } from "@/types";

type Variant = "black" | "white" | "outline-light" | "outline-dark";
type Size = "sm" | "nav" | "md" | "lg" | "xl";

const variants: Record<Variant, string> = {
  black: "bg-ink text-white hover:bg-neutral-800",
  white: "bg-white text-ink hover:bg-canvas",
  "outline-light": "border border-white/70 text-white hover:border-white hover:bg-white hover:text-ink",
  "outline-dark": "border border-ink/70 text-ink hover:border-ink hover:bg-ink hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "px-3.5 py-2 text-sm",
  nav: "px-3.5 py-2.5 text-base font-semibold", // menu button (Figma)
  xl: "p-7.5 text-xl", // newsletter subscribe (Figma)
  md: "px-8.75 py-4 text-base",
  lg: "px-10 py-5 text-lg",
};

// Shared by <Button> links and plain <button>s (forms) so every pill behaves the same.
export function buttonClasses(variant: Variant = "black", size: Size = "md", className?: string) {
  return cn(
    "group/btn inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap",
    "transition-[color,background-color,border-color,scale] duration-300 active:scale-96",
    sizes[size],
    variants[variant],
    className
  );
}

// On hover the label rolls up and an identical copy rolls in from below.
export function ButtonLabel({ children }: { children: ReactNode }) {
  const row = "flex items-center justify-center gap-2 transition-transform duration-500 ease-out-expo motion-reduce:transition-none";
  return (
    <span className="relative block overflow-hidden">
      <span className={cn(row, "group-hover/btn:-translate-y-full")}>{children}</span>
      <span aria-hidden="true" className={cn(row, "absolute inset-0 translate-y-full group-hover/btn:translate-y-0")}>
        {children}
      </span>
    </span>
  );
}

type Props = {
  link?: LinkData | null;
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: ReactNode;
};

// Pill button from the design. Renders nothing without a label and link.
export function Button({ link, variant = "black", size = "md", className, children }: Props) {
  if (!link?.href || !(link.label || children)) return null;
  const classes = buttonClasses(variant, size, className);
  const content = <ButtonLabel>{children ?? link.label}</ButtonLabel>;

  if (isExternal(link.href)) {
    const newTab = link.href.startsWith("http");
    return (
      <a href={link.href} className={classes} {...(newTab && { target: "_blank", rel: "noopener noreferrer" })}>
        {content}
      </a>
    );
  }
  return (
    <Link href={link.href} className={classes}>
      {content}
    </Link>
  );
}
