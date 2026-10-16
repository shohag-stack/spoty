import type { SanityImage } from "@/types";
import { urlFor } from "./sanity";

// Turns a Sanity hotspot into a CSS object-position so cropping keeps the focal point.
export function imagePosition(image?: SanityImage) {
  if (!image?.hotspot) return "50% 50%";
  return `${Math.round(image.hotspot.x * 100)}% ${Math.round(image.hotspot.y * 100)}%`;
}

export function hasImage(image?: SanityImage | null): image is SanityImage {
  return Boolean(image?.asset?._ref);
}

// Same breakpoints next/image uses, so the browser picks a similar file.
const WIDTHS = [64, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];

/**
 * Attributes for a Sanity photo that fills its (relative) parent, cropped around
 * the hotspot. Shared by <SanityImage> in .astro files and in React islands.
 */
export function imageAttrs(image: SanityImage, sizes: string) {
  const base = urlFor(image).auto("format").fit("max").quality(75);
  return {
    src: base.width(1200).url(),
    srcset: WIDTHS.map((w) => `${base.width(w).url()} ${w}w`).join(", "),
    sizes,
    alt: image.alt ?? "",
    style: {
      objectPosition: imagePosition(image),
      // Blurred preview while the photo loads
      ...(image.lqip && { backgroundImage: `url(${image.lqip})`, backgroundSize: "cover" }),
    },
  };
}
