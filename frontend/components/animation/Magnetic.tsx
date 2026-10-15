"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";

type Props = { children: ReactNode; className?: string; strength?: number };

const target = (el: HTMLElement) => el.querySelector("[data-magnetic]") ?? el.firstElementChild;

// While the wrapper is hovered (mouse only), pulls the element marked data-magnetic
// (or the first child) toward the cursor.
export function Magnetic({ children, className, strength = 0.25 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = el.getBoundingClientRect();
    gsap.to(target(el), {
      x: (event.clientX - box.left - box.width / 2) * strength,
      y: (event.clientY - box.top - box.height / 2) * strength,
      duration: 0.6,
      ease: "power3.out",
    });
  };
  const leave = () => {
    if (ref.current) gsap.to(target(ref.current), { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <div ref={ref} className={className} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </div>
  );
}
