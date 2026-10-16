import { ChevronLeftIcon, ChevronRightIcon } from "./icons";
import { cn } from "@/lib/utils";

type Props = {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
  size?: "md" | "lg";
  className?: string;
};

// Round slider arrow. Rests as a white circle; on hover black fills in from the centre and
// the arrow slides out and back in the direction of travel. Presses shrink it slightly.
export function SliderButton({ direction, onClick, label, size = "md", className }: Props) {
  const Icon = direction === "prev" ? ChevronLeftIcon : ChevronRightIcon;
  const out = direction === "prev" ? "group-hover/slider:-translate-x-[180%]" : "group-hover/slider:translate-x-[180%]";
  const enter = direction === "prev" ? "translate-x-[180%]" : "-translate-x-[180%]";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "group/slider relative grid shrink-0 place-items-center overflow-hidden rounded-full border border-ring bg-white text-subtle",
        "transition-[border-color,color,scale] duration-300 hover:border-ink hover:text-white active:scale-90",
        size === "md" ? "size-12 md:size-16" : "size-14 md:size-22",
        className
      )}
    >
      <span className="absolute inset-0 scale-0 rounded-full bg-ink transition-transform duration-500 ease-out-expo group-hover/slider:scale-100" />
      <span className="relative grid overflow-hidden">
        <Icon className={cn("col-start-1 row-start-1 size-6 transition-transform duration-500 ease-out-expo md:size-7", out)} />
        <Icon
          className={cn(
            "col-start-1 row-start-1 size-6 transition-transform duration-500 ease-out-expo group-hover/slider:translate-x-0 md:size-7",
            enter
          )}
        />
      </span>
    </button>
  );
}
