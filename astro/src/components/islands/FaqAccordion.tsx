import { useId, useState } from "react";
import { PlusIcon } from "./icons";
import { cn } from "@/lib/utils";
import type { FaqData } from "@/types";

// One answer open at a time; answers slide open (grid-rows 0fr → 1fr).
export function FaqAccordion({ items }: { items: FaqData[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?._id ?? null);
  const baseId = useId();

  return (
    <div className="space-y-3">
      {items.map((faq, i) => {
        const isOpen = open === faq._id;
        const panelId = `${baseId}-${i}`;
        return (
          <div key={faq._id} className={cn("rounded-card transition-colors duration-500", isOpen ? "bg-ink text-white" : "bg-white")}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : faq._id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-lg md:px-8 md:py-6 md:text-xl"
              >
                {faq.question}
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-full transition-[transform,background-color,color] duration-500",
                    isOpen ? "rotate-45 bg-white text-ink" : "bg-canvas"
                  )}
                >
                  <PlusIcon />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              className={cn(
                "grid transition-[grid-template-rows] duration-500 ease-out-expo",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl px-6 pr-16 pb-6 leading-relaxed text-white/75 md:px-8 md:pb-7">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
