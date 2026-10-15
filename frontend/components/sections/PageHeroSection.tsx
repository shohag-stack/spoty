import { Parallax } from "@/components/animation/Parallax";
import { SplitHeading } from "@/components/animation/SplitHeading";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { SanityImage } from "@/components/ui/SanityImage";
import type { PageHeroSectionData } from "@/types";

// Page-top banner for inner pages. Full-bleed, so no outer margin.
export function PageHeroSection({ backgroundImage, eyebrow, heading, text, button }: PageHeroSectionData) {
  return (
    <section className="relative flex min-h-150 overflow-hidden bg-ink md:h-165">
      <Parallax speed={16} className="absolute inset-x-0 -inset-y-24">
        <SanityImage image={backgroundImage} sizes="100vw" priority />
      </Parallax>
      <div className="absolute inset-0 bg-linear-to-tr from-black/65 via-black/25 to-black/30" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-site flex-col justify-end px-4 pt-40 pb-14 text-white md:px-8 lg:px-13 md:pb-18">
        {eyebrow && (
          <Pill tone="light" className="mb-6 w-fit md:mb-8">
            {eyebrow}
          </Pill>
        )}
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <SplitHeading text={heading} className="max-w-4xl text-5xl font-medium text-balance sm:text-6xl lg:text-7xl" />
          {(text || button?.href) && (
            <div className="max-w-sm">
              {text && <p className="text-base leading-relaxed text-white/85 md:text-lg">{text}</p>}
              <Button link={button} variant="white" className="mt-6" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
