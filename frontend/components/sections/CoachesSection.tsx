import { Reveal } from "@/components/animation/Reveal";
import { Button } from "@/components/ui/Button";
import { CoachCard } from "@/components/ui/CoachCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { CoachCardData, CoachesSectionData } from "@/types";

export function CoachesSection({ heading, text, coaches, button }: CoachesSectionData) {
  const items = coaches.filter((c): c is CoachCardData => Boolean(c?.slug));

  return (
    <section className="my-20 md:my-35">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-13">
        <Reveal>
          <SectionHeader heading={heading} text={text} />
        </Reveal>
        <Reveal stagger className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:gap-5 lg:grid-cols-4">
          {items.map((coach) => (
            <CoachCard key={coach._id} coach={coach} sizes="(min-width: 1024px) 25vw, 50vw" />
          ))}
        </Reveal>
        {button?.href && (
          <div className="mt-12 flex justify-center">
            <Button link={button} />
          </div>
        )}
      </div>
    </section>
  );
}
