"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type Props = {
  text: string;
  as?: "h1" | "h2";
  className?: string;
  delay?: number;
};

// Headline whose words rise into place one after another on page load.
export function SplitHeading({ text, as: Tag = "h1", className, delay = 0.15 }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(el.querySelectorAll("[data-word]"), {
        yPercent: 110,
        duration: 1.1,
        delay,
        ease: "expo.out",
        stagger: 0.06,
      });
    });
    return () => mm.revert();
  }, [delay]);

  // Keep the editor's line breaks; each word is masked so it slides up from below
  const lines = text.split("\n");
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line
            .split(" ")
            .filter(Boolean)
            .map((word, wi) => (
              <span key={wi} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top">
                <span data-word className="inline-block">
                  {word}
                </span>
                {" "}
              </span>
            ))}
        </span>
      ))}
    </Tag>
  );
}
