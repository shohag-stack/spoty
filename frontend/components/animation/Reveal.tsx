"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  className?: string;
  /** Animate each direct child one after another instead of the wrapper as a whole. */
  stagger?: boolean;
  delay?: number;
  /** "clip" opens the element like a window instead of fading it up (for photos). */
  variant?: "fade" | "clip";
};

// Fades content up as it scrolls into view. Static when reduced motion is preferred.
export function Reveal({ children, className, stagger = false, delay = 0, variant = "fade" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const scrollTrigger = { trigger: el, start: "top 88%", once: true };
      if (variant === "clip") {
        gsap.from(el, { clipPath: "inset(14% 10% 14% 10% round 1.5rem)", duration: 1.4, delay, ease: "expo.out", scrollTrigger });
        gsap.from(el.querySelectorAll("img"), { scale: 1.25, duration: 1.6, delay, ease: "expo.out", scrollTrigger });
        return;
      }
      const targets = stagger ? Array.from(el.children) : el;
      gsap.from(targets, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay,
        ease: "expo.out",
        stagger: stagger ? 0.08 : 0,
        scrollTrigger,
      });
    });
    return () => mm.revert();
  }, [stagger, delay, variant]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
