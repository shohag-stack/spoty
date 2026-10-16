import { useEffect, useState } from "react";
import { useInView } from "./useInView";
import { useSwipe } from "./useSwipe";
import { SanityImage } from "./SanityImage";
import { cn } from "@/lib/utils";
import type { SanityImage as SanityImageType } from "@/types";

// Per distance from the centre: card height (as a % of the row) and how far it turns away.
const SHAPES = [
  { height: 68, rotate: 0 },
  { height: 84, rotate: 16 },
  { height: 100, rotate: 24 },
];

export function CurvedCarousel({ images }: { images: SanityImageType[] }) {
  const count = images.length;
  const [active, setActive] = useState(Math.floor(count / 2));
  const [paused, setPaused] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>();

  useEffect(() => {
    if (!inView || paused || count < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % count), 3500);
    return () => clearInterval(id);
  }, [inView, paused, count]);

  const go = (step: number) => setActive((i) => (i + step + count) % count);
  const swipe = useSwipe(() => go(1), () => go(-1));

  if (count === 0) return null;

  // Shortest signed distance from the active card, so the row wraps around
  const offsetOf = (i: number) => {
    let d = i - active;
    if (d > count / 2) d -= count;
    if (d < -count / 2) d += count;
    return d;
  };

  return (
    <div
      ref={ref}
      className="relative mt-12 aspect-4/3 md:mt-7 cursor-grab touch-pan-y perspective-distant select-none active:cursor-grabbing sm:aspect-2/1 lg:aspect-1440/560"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(1);
        if (event.key === "ArrowLeft") go(-1);
      }}
      {...swipe}
      role="region"
      aria-roledescription="carousel"
      aria-label="Photos"
    >
      {images.map((image, i) => {
        const offset = offsetOf(i);
        const distance = Math.abs(offset);
        const shape = SHAPES[Math.min(distance, 2)];
        const hidden = distance > 2;
        return (
          <button
            key={image._key ?? i}
            type="button"
            onClick={() => setActive(i)}
            tabIndex={hidden ? -1 : 0}
            aria-label={`Show photo ${i + 1}`}
            aria-current={offset === 0}
            className={cn(
              "absolute top-1/2 left-1/2 w-[62%] overflow-hidden rounded-card transition-[transform,height,opacity] duration-900 ease-out-expo sm:w-[40%] lg:w-[26.4%]",
              hidden ? "pointer-events-none opacity-0" : "opacity-100"
            )}
            style={{
              height: `${shape.height}%`,
              transform: `translate(calc(-50% + ${offset} * 109%), -50%) rotateY(${-Math.sign(offset) * shape.rotate}deg)`,
              zIndex: 10 - distance,
            }}
          >
            <SanityImage image={image} sizes="(min-width: 1024px) 27vw, (min-width: 640px) 40vw, 62vw" className="pointer-events-none" />
          </button>
        );
      })}
    </div>
  );
}
