import { Reveal } from "@/components/animation/Reveal";
import { Button } from "@/components/ui/Button";
import type { FaqData, FaqSectionData } from "@/types";
import { FaqAccordion } from "./FaqAccordion";

export function FaqSection({ heading, text, button, faqs }: FaqSectionData) {
  const items = faqs.filter((f): f is FaqData => Boolean(f));
  if (items.length === 0) return null;

  return (
    <section className="my-20 md:my-35">
      <div className="mx-auto grid max-w-site gap-10 px-4 md:px-8 lg:px-13 lg:grid-cols-[2fr_3fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="max-w-md text-4xl font-medium text-balance md:text-5xl lg:text-heading">{heading}</h2>
          {text && <p className="mt-6 max-w-sm leading-relaxed text-muted">{text}</p>}
          <Button link={button} className="mt-8" />
        </Reveal>

        <Reveal>
          <FaqAccordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}
