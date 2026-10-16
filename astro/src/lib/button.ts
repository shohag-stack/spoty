import { cn } from "./utils";

export type ButtonVariant = "black" | "white" | "outline-light" | "outline-dark";
export type ButtonSize = "sm" | "nav" | "md" | "lg" | "xl";

const variants: Record<ButtonVariant, string> = {
  black: "bg-ink text-white hover:bg-neutral-800",
  white: "bg-white text-ink hover:bg-canvas",
  "outline-light": "border border-white/70 text-white hover:border-white hover:bg-white hover:text-ink",
  "outline-dark": "border border-ink/70 text-ink hover:border-ink hover:bg-ink hover:text-white",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2 text-sm",
  nav: "px-3.5 py-2.5 text-base font-semibold", // menu button (Figma)
  xl: "p-7.5 text-xl", // newsletter subscribe (Figma)
  md: "px-8.75 py-4 text-base",
  lg: "px-10 py-5 text-lg",
};

// Shared by <Button> links and plain <button>s (forms) so every pill behaves the same.
export function buttonClasses(variant: ButtonVariant = "black", size: ButtonSize = "md", className?: string) {
  return cn(
    "group/btn inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap",
    "transition-[color,background-color,border-color,scale] duration-300 active:scale-96",
    sizes[size],
    variants[variant],
    className
  );
}

// On hover the label rolls up and an identical copy rolls in from below.
export const buttonLabelRow =
  "flex items-center justify-center gap-2 transition-transform duration-500 ease-out-expo motion-reduce:transition-none";
