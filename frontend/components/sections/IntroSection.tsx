import { Parallax } from "@/components/animation/Parallax";
import { Reveal } from "@/components/animation/Reveal";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { SanityImage } from "@/components/ui/SanityImage";
import { cn } from "@/(core)/lib/utils";
import type { IntroSectionData } from "@/types";

// Photo slots: wide, tall, square — echoing the gallery on the home page.
const SLOTS = ["col-span-2 aspect-16/10 md:col-span-6", "aspect-3/4 md:col-span-3", "aspect-square self-end md:col-span-3"];

export function IntroSection({ eyebrow, heading, body, button, images }: IntroSectionData) {
  return (
    <section className="my-20 md:my-35">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-13">
        <Reveal className="grid gap-8 lg:grid-cols-2 lg:gap-20">
          <div>
            {eyebrow && <Pill className="mb-6">{eyebrow}</Pill>}
            <h2 className="max-w-xl text-4xl font-medium text-balance md:text-5xl lg:text-heading">{heading}</h2>
          </div>
          <div className="space-y-5 lg:pt-16">
            {body?.map((paragraph, i) => (
              <p key={i} className={cn("leading-relaxed", i === 0 ? "text-xl md:text-2xl" : "text-base text-muted md:text-lg")}>
                {paragraph}
              </p>
            ))}
            <Button link={button} className="mt-3" />
          </div>
        </Reveal>

        {images && images.length > 0 && (
          <Reveal stagger className="mt-14 grid grid-cols-2 gap-4 md:mt-20 md:grid-cols-12 md:gap-8">
            {images.map((image, i) => (
              <Parallax key={image._key} speed={[-6, -16, -10][i] ?? -8} className={cn("relative overflow-hidden rounded-card", SLOTS[i])}>
                <SanityImage image={image} sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"} />
              </Parallax>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
