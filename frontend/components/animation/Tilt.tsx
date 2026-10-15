"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";

type Props = { children: ReactNode; className?: string; max?: number };

// Tilts its content in 3D toward the cursor (mouse only, skipped for reduced motion).
export function Tilt({ children, className, max = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = el.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    gsap.to(el, { rotateY: x * max, rotateX: -y * max, transformPerspective: 900, duration: 0.5, ease: "power3.out" });
  };
  const leave = () => {
    if (ref.current) gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3.out" });
  };

  return (
    <div ref={ref} className={className} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </div>
  );
}
