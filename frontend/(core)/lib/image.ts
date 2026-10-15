import type { SanityImage } from "@/types";

// Turns a Sanity hotspot into a CSS object-position so cropping keeps the focal point.
export function imagePosition(image?: SanityImage) {
  if (!image?.hotspot) return "50% 50%";
  return `${Math.round(image.hotspot.x * 100)}% ${Math.round(image.hotspot.y * 100)}%`;
}

export function hasImage(image?: SanityImage | null): image is SanityImage {
  return Boolean(image?.asset?._ref);
}
