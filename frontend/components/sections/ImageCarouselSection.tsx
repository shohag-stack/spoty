import { Reveal } from "@/components/animation/Reveal";
import { Button } from "@/components/ui/Button";
import type { ImageCarouselSectionData } from "@/types";
import { CurvedCarousel } from "./CurvedCarousel";

// White band: full-bleed, so it uses inner padding instead of outer margins.
export function ImageCarouselSection({ heading, button, images }: ImageCarouselSectionData) {
  return (
    <section className="overflow-hidden bg-white py-20 md:pt-35 md:pb-10">
      <Reveal className="mx-auto max-w-site px-4 md:px-8 lg:px-13">
        <h2 className="mx-auto max-w-277 text-center text-4xl font-medium text-balance md:text-5xl lg:text-heading">{heading}</h2>
      </Reveal>
      <CurvedCarousel images={images ?? []} />
      {button?.href && (
        <div className="mt-12 flex justify-center px-4">
          <Button link={button} />
        </div>
      )}
    </section>
  );
}
