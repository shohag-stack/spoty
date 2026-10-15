"use client";

import { useState } from "react";
import { useSwipe } from "@/components/animation/useSwipe";
import { SanityImage } from "@/components/ui/SanityImage";
import { SliderButton } from "@/components/ui/SliderButton";
import { cn } from "@/(core)/lib/utils";
import type { SanityImage as SanityImageType } from "@/types";

type Props = { images: SanityImageType[]; text?: string };

// Large photo + the next photo as a preview; the round buttons step through them.
export function FeatureGallery({ images, text }: Props) {
  const [index, setIndex] = useState(0);
  const count = images.length;
  const go = (step: number) => setIndex((i) => (i + step + count) % count);
  const swipe = useSwipe(() => go(1), () => go(-1));

  const layer = (active: number) =>
    images.map((image, i) => (
      <div
        key={image._key ?? i}
        className={cn("absolute inset-0 transition-opacity duration-700", i === active ? "opacity-100" : "opacity-0")}
        aria-hidden={i !== active}
      >
        <SanityImage image={image} sizes="(min-width: 1024px) 24vw, 60vw" />
      </div>
    ));

  return (
    <div className="grid grid-cols-[322fr_206fr] gap-x-6 gap-y-7.5 md:gap-x-19">
      <div className="relative aspect-322/258 touch-pan-y overflow-hidden rounded-card bg-line select-none" {...swipe}>{count > 0 && layer(index)}</div>
      <button type="button" onClick={() => go(1)} aria-label="Next photo" className="group relative aspect-206/165 self-start overflow-hidden rounded-card bg-line">
        {count > 1 && layer((index + 1) % count)}
        <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
      </button>

      {text ? <p className="max-w-80.5 text-sm text-muted md:mt-3 md:text-body">{text}</p> : <span />}

      {count > 1 && (
        <div className="flex gap-3 md:gap-5">
          <SliderButton direction="prev" onClick={() => go(-1)} label="Previous photo" size="lg" />
          <SliderButton direction="next" onClick={() => go(1)} label="Next photo" size="lg" />
        </div>
      )}
    </div>
  );
}
