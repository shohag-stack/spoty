"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/components/animation/useInView";
import { useSwipe } from "@/components/animation/useSwipe";
import { QuoteIcon } from "@/components/icons";
import { SanityImage } from "@/components/ui/SanityImage";
import { SliderButton } from "@/components/ui/SliderButton";
import type { TestimonialData } from "@/types";

const pad = (n: number) => String(n).padStart(2, "0");

function PhotoCard({ item, sizes, large = false }: { item: TestimonialData; sizes: string; large?: boolean }) {
  return (
    <>
      <SanityImage image={item.image} sizes={sizes} />
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent px-5 pt-16 pb-5 text-left text-white">
        <p className={large ? "text-xl font-medium md:text-2xl" : "text-lg font-medium md:text-xl"}>{item.name}</p>
        {item.role && <p className={large ? "text-base md:text-xl" : "text-sm md:text-base"}>{item.role}</p>}
      </div>
    </>
  );
}

export function TestimonialSlider({ heading, items }: { heading: string; items: TestimonialData[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>();
  const count = items.length;
  const go = (step: number) => setIndex((i) => (i + step + count) % count);
  const swipe = useSwipe(() => go(1), () => go(-1));
  const current = items[index];
  const next = items[(index + 1) % count];

  useEffect(() => {
    if (!inView || paused || count < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => clearInterval(id);
  }, [inView, paused, count]);

  return (
    <div ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* Heading + progress */}
      <div className="grid items-end gap-10 lg:grid-cols-[424fr_766fr] lg:gap-36">
        <h2 className="max-w-106 text-4xl font-medium text-balance md:text-5xl lg:text-heading">{heading}</h2>
        <div className="relative pt-24">
          <div className="h-1 rounded-full bg-line" aria-hidden="true">
            <div
              className="relative h-full rounded-full bg-ink transition-[width] duration-700 ease-out-expo"
              style={{ width: `${((index + 1) / count) * 100}%` }}
            >
              <div className="absolute right-0 bottom-4 aspect-93/84 w-23 overflow-hidden rounded-xl">
                <SanityImage key={current._id} image={current.image} sizes="92px" className="animate-fade-in" />
              </div>
            </div>
          </div>
          {/* Each slice of the bar jumps to that testimonial */}
          {count > 1 && (
            <div className="absolute inset-x-0 -bottom-3 flex h-7">
              {items.map((item, i) => (
                <button
                  key={item._id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial ${i + 1}: ${item.name}`}
                  aria-current={i === index}
                  className="group/seg relative flex-1 cursor-pointer"
                >
                  <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 scale-y-100 bg-ink/0 transition-[background-color,scale] duration-300 group-hover/seg:scale-y-200 group-hover/seg:bg-ink/25" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="mt-12 flex items-center gap-8 md:mt-20" aria-live="polite">
        {count > 1 && (
          <div className="hidden w-77.5 shrink-0 flex-col gap-6 lg:flex">
            <button
              type="button"
              onClick={() => go(1)}
              className="group relative aspect-310/282 w-full overflow-hidden rounded-card"
              aria-label={`Next testimonial: ${next.name}`}
            >
              <div key={next._id} className="absolute inset-0 animate-fade-in transition-transform duration-700 group-hover:scale-105">
                <PhotoCard item={next} sizes="312px" />
              </div>
              <span className="absolute top-4 right-4 rounded-full bg-white px-3 py-1 text-xs font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Up next
              </span>
            </button>
            <div className="flex gap-3">
              <SliderButton direction="prev" onClick={() => go(-1)} label="Previous testimonial" />
              <SliderButton direction="next" onClick={() => go(1)} label="Next testimonial" />
            </div>
          </div>
        )}

        <div className="grid flex-1 touch-pan-y gap-2.5 rounded-card bg-white p-2.5 md:gap-11.5 select-none md:grid-cols-[395fr_579fr]" {...swipe}>
          <div key={`photo-${current._id}`} className="relative aspect-4/5 animate-fade-in overflow-hidden rounded-card md:aspect-395/510">
            <PhotoCard item={current} sizes="(min-width: 768px) 30vw, 100vw" large />
          </div>
          <div className="flex flex-col p-5 md:pt-12.5 md:pr-9.5 md:pb-6.5 md:pl-0">
            <QuoteIcon className="ml-2 h-8 w-auto text-line md:h-10.5" />
            <blockquote key={`quote-${current._id}`} className="mt-6 max-w-126 animate-fade-in text-2xl leading-snug italic md:mt-7.75 md:text-4xl md:leading-tight">
              {current.quote}
            </blockquote>
            <div className="mt-10 flex items-center justify-between gap-4 md:mt-auto md:pt-10">
              <p className="text-3xl font-semibold md:text-4xl">
                {pad(index + 1)}
              </p>
              {count > 1 && (
                <div className="flex gap-3 lg:hidden">
                  <SliderButton direction="prev" onClick={() => go(-1)} label="Previous testimonial" />
                  <SliderButton direction="next" onClick={() => go(1)} label="Next testimonial" />
                </div>
              )}
              <p className="text-3xl font-semibold text-subtle md:text-4xl">{pad(count)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
