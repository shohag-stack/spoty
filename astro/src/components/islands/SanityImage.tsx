import { hasImage, imageAttrs } from "@/lib/image";
import { cn } from "@/lib/utils";
import type { SanityImage as SanityImageType } from "@/types";

type Props = {
  image?: SanityImageType | null;
  sizes: string;
  className?: string;
  alt?: string;
};

// React twin of components/ui/SanityImage.astro, for photos inside islands.
// Fills its (relative) parent. Crops with object-cover around the Sanity hotspot.
export function SanityImage({ image, sizes, className, alt }: Props) {
  if (!hasImage(image)) return null;
  const attrs = imageAttrs(image, sizes);
  return (
    <img
      src={attrs.src}
      srcSet={attrs.srcset}
      sizes={attrs.sizes}
      alt={alt ?? attrs.alt}
      loading="lazy"
      decoding="async"
      className={cn("absolute inset-0 size-full object-cover", className)}
      style={attrs.style}
    />
  );
}
