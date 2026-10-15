"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Splits "1,200+" into prefix "", number 1200, suffix "+", keeping commas and decimals.
function parse(value: string) {
  const match = value.match(/^(\D*)([\d,]*\.?\d+)(.*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  const number = Number(digits.replace(/,/g, ""));
  // Years ("2012") read oddly when counted, so leave them static
  if (!digits.includes(",") && !digits.includes(".") && number >= 1900 && number <= 2100) return null;
  return {
    prefix,
    suffix,
    number,
    decimals: digits.includes(".") ? digits.split(".")[1].length : 0,
    commas: digits.includes(","),
  };
}

// Counts a figure up from zero when it scrolls into view. Renders the final value on the server.
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parsed = parse(value);
    if (!el || !parsed) return;
    const format = (n: number) =>
      parsed.prefix +
      n.toLocaleString("en-US", {
        minimumFractionDigits: parsed.decimals,
        maximumFractionDigits: parsed.decimals,
        useGrouping: parsed.commas,
      }) +
      parsed.suffix;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const counter = { n: 0 };
      el.textContent = format(0);
      gsap.to(counter, {
        n: parsed.number,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = format(counter.n);
        },
      });
      return () => {
        el.textContent = value;
      };
    });
    return () => mm.revert();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
