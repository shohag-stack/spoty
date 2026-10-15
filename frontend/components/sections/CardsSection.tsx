import { Reveal } from "@/components/animation/Reveal";
import { Spotlight } from "@/components/animation/Spotlight";
import { ArrowUpRightIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/components/ui/SanityImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { hasImage } from "@/(core)/lib/image";
import { cn } from "@/(core)/lib/utils";
import type { CardsSectionData } from "@/types";

const COLUMNS = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function CardsSection({ heading, text, cards, columns = 3 }: CardsSectionData) {
  return (
    <section className="my-20 md:my-35">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-13">
        <Reveal>
          <SectionHeader heading={heading} text={text} />
        </Reveal>
        <Reveal stagger className={cn("mt-12 grid gap-4 md:mt-16 md:gap-5", COLUMNS[columns])}>
          {cards?.map((card) => {
            const withImage = hasImage(card.image);
            return (
              <div key={card._key}>
                <Spotlight className="h-full rounded-card bg-white transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/5">
                  <article className="group flex h-full flex-col p-2.5">
                    {withImage && (
                      <div className="relative aspect-4/3 overflow-hidden rounded-card">
                        <SanityImage
                          image={card.image}
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className={cn("flex flex-1 flex-col", withImage ? "p-5 md:p-6" : "p-6 md:p-8")}>
                      {card.label && <p className={cn("text-subtle", withImage ? "text-sm" : "mb-10 text-5xl")}>{card.label}</p>}
                      <h3 className="mt-1 text-2xl">{card.title}</h3>
                      {card.text && <p className="mt-3 leading-relaxed text-muted">{card.text}</p>}
                      {card.link?.href && (
                        <div className="mt-auto pt-6">
                          <Button link={card.link} variant="outline-dark" size="sm">
                            {card.link.label}
                            <ArrowUpRightIcon className="size-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </article>
                </Spotlight>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
