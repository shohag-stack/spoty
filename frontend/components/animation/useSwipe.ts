"use client";

import { useRef, type MouseEvent, type PointerEvent } from "react";

// Pointer handlers that call onNext / onPrev after a horizontal swipe or drag.
// The click that ends a drag is swallowed, so dragging over a card doesn't also select it.
export function useSwipe(onNext: () => void, onPrev: () => void, threshold = 40) {
  const start = useRef<number | null>(null);
  const dragged = useRef(false);

  return {
    onPointerDown: (event: PointerEvent) => {
      start.current = event.clientX;
    },
    onPointerUp: (event: PointerEvent) => {
      if (start.current === null) return;
      const delta = event.clientX - start.current;
      start.current = null;
      dragged.current = Math.abs(delta) >= threshold;
      if (delta <= -threshold) onNext();
      else if (delta >= threshold) onPrev();
    },
    onPointerCancel: () => {
      start.current = null;
    },
    onClickCapture: (event: MouseEvent) => {
      if (!dragged.current) return;
      dragged.current = false;
      event.preventDefault();
      event.stopPropagation();
    },
  };
}
