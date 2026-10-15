import { Reveal } from "@/components/animation/Reveal";
import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/components/ui/SanityImage";
import { cn } from "@/(core)/lib/utils";
import type { FeatureSplitSectionData } from "@/types";
import { FeatureGallery } from "./FeatureGallery";

export function FeatureSplitSection({ mainImage, heading, text, gallery, button, flip }: FeatureSplitSectionData) {
  return (
    <section className="my-20 md:my-35">
      <div className="mx-auto grid max-w-site gap-12 px-4 md:px-8 lg:px-13 lg:grid-cols-[652fr_604fr] lg:gap-20">
        <Reveal variant="clip" className={cn("relative aspect-4/5 overflow-hidden rounded-card lg:aspect-652/752", flip && "lg:order-2")}>
          <SanityImage image={mainImage} sizes="(min-width: 1024px) 50vw, 100vw" />
        </Reveal>

        <div className="flex flex-col gap-12 lg:gap-20 lg:pt-31.5">
          <Reveal>
            <h2 className="max-w-151 text-4xl font-medium text-balance md:text-5xl lg:text-heading">{heading}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <FeatureGallery images={gallery ?? []} text={text} />
            <Button link={button} className="mt-8" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
