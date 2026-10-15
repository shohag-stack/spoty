"use client";

import { useState } from "react";
import { useReducedMotion } from "@/components/animation/useReducedMotion";
import { urlFor } from "@/(core)/sanity/lib/image";
import type { SanityImage } from "@/types";

type Props = {
  video: { url: string; mimeType?: string };
  poster?: SanityImage;
};

// Silent looping background video. Skipped for visitors who prefer reduced motion,
// so the photo underneath stays visible; fades in once it can play.
export function HeroBackgroundVideo({ video, poster }: Props) {
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <video
      className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster?.asset ? urlFor(poster).width(1920).auto("format").url() : undefined}
      onCanPlay={() => setReady(true)}
      aria-hidden="true"
    >
      <source src={video.url} type={video.mimeType} />
    </video>
  );
}
