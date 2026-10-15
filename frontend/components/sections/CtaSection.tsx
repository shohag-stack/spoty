import { Magnetic } from "@/components/animation/Magnetic";
import { Parallax } from "@/components/animation/Parallax";
import { Reveal } from "@/components/animation/Reveal";
import { SparkleIcon } from "@/components/icons";
import { SanityImage } from "@/components/ui/SanityImage";
import { StarImage } from "@/components/ui/StarImage";
import { isExternal } from "@/(core)/lib/utils";
import type { CtaSectionData } from "@/types";
import Link from "next/link";

// Layout from the Figma frame: equal side columns keep the heading on the page centre;
// left photo 248×275 (130px down) and right photo 351×187 (84px down) hug their edges,
// star photo above the heading. Photos drift at different speeds.
export function CtaSection({ heading, floatingImages = [], bannerImage, button }: CtaSectionData) {
  const [left, star, right] = floatingImages;
  const href = button?.href ?? "/";

  return (
    <section className="mt-20 md:mt-18">
      {(heading || floatingImages.length > 0) && (
        <div className="mx-auto grid max-w-site grid-cols-2 items-start gap-4 px-4 md:grid-cols-[1fr_minmax(0,37.5rem)_1fr] md:gap-8 md:px-8 lg:px-13">
          {left && (
            <Parallax speed={-14} className="order-2 w-full md:order-none md:mt-32 md:max-w-62 md:justify-self-start">
              <Reveal variant="clip" className="relative aspect-248/275 overflow-hidden rounded-4xl">
                <SanityImage image={left} sizes="(min-width: 768px) 20vw, 50vw" />
              </Reveal>
            </Parallax>
          )}
          <div className="order-1 col-span-2 flex flex-col items-center text-center md:order-none md:col-span-1 md:pt-16">
            {star && (
              <Parallax speed={-24}>
                <StarImage image={star} className="w-28 transition-transform duration-700 hover:rotate-12 md:w-33" />
              </Parallax>
            )}
            {heading && (
              <Reveal>
                <h2 className="mt-10 max-w-122 text-3xl font-normal text-balance md:mt-16.5 md:text-title">{heading}</h2>
              </Reveal>
            )}
          </div>
          {right && (
            <Parallax speed={-8} className="order-3 w-full md:order-none md:mt-21 md:max-w-87.75 md:justify-self-end">
              <Reveal variant="clip" delay={0.1} className="relative aspect-351/187 overflow-hidden rounded-4xl">
                <SanityImage image={right} sizes="(min-width: 768px) 26vw, 50vw" />
              </Reveal>
            </Parallax>
          )}
        </div>
      )}

      {/* Full-width banner: stars turn slowly, the pill follows the cursor */}
      <Magnetic strength={0.12} className="mt-14 md:mt-19">
        <Link
          href={href}
          {...(isExternal(href) && { target: "_blank", rel: "noopener noreferrer" })}
          className="group relative flex h-48 items-center justify-center overflow-hidden md:h-62"
        >
          <SanityImage image={bannerImage} sizes="100vw" className="transition-transform duration-1000 group-hover:scale-105" />
          <SparkleIcon className="absolute top-1/2 left-[6.7%] hidden size-24 -translate-y-1/2 text-white motion-safe:animate-[spin_18s_linear_infinite] sm:block lg:size-35" />
          <SparkleIcon className="absolute top-1/2 right-[6.7%] hidden size-24 -translate-y-1/2 text-white motion-safe:animate-[spin_18s_linear_infinite_reverse] sm:block lg:size-35" />
          <span data-magnetic className="relative rounded-full bg-white px-8 py-3 text-3xl transition-[background-color,color] duration-500 group-hover:bg-ink group-hover:text-white sm:text-5xl md:px-20 md:py-4 lg:text-7xl">
            {button?.label}
          </span>
        </Link>
      </Magnetic>
    </section>
  );
}
