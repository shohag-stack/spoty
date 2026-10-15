"use client";

import Image, { type ImageLoaderProps } from "next/image";
import { urlFor } from "@/(core)/sanity/lib/image";
import { hasImage, imagePosition } from "@/(core)/lib/image";
import { cn } from "@/(core)/lib/utils";
import type { SanityImage as SanityImageType } from "@/types";

type Props = {
  image?: SanityImageType | null;
  sizes: string;
  className?: string;
  priority?: boolean;
  alt?: string;
};

// Fills its (relative) parent. Crops with object-cover around the Sanity hotspot.
export function SanityImage({ image, sizes, className, priority, alt }: Props) {
  if (!hasImage(image)) return null;
  const base = urlFor(image).auto("format").fit("max");
  const loader = ({ width, quality }: ImageLoaderProps) => base.width(width).quality(quality ?? 75).url();

  return (
    <Image
      src={base.url()}
      loader={loader}
      alt={alt ?? image.alt ?? ""}
      fill
      sizes={sizes}
      priority={priority}
      placeholder={image.lqip ? "blur" : "empty"}
      blurDataURL={image.lqip}
      className={cn("object-cover", className)}
      style={{ objectPosition: imagePosition(image) }}
    />
  );
}
