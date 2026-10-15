"use client";

import { useState } from "react";
import { PlayCircleIcon } from "@/components/icons";
import { SanityImage } from "@/components/ui/SanityImage";
import type { SanityImage as SanityImageType } from "@/types";

type Props = {
  image: SanityImageType;
  video?: { url: string; mimeType?: string } | null;
};

// Photo at the bottom of the hero card. With a video, the play button swaps it for the player.
export function HeroCardMedia({ image, video }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-386/175 overflow-hidden rounded-card bg-ink">
      {playing && video ? (
        <video className="absolute inset-0 size-full object-cover" autoPlay controls playsInline>
          <source src={video.url} type={video.mimeType} />
        </video>
      ) : (
        <>
          <SanityImage image={image} sizes="(min-width: 640px) 384px, 100vw" />
          {video && (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="absolute top-1/2 left-1/2 size-26.75 -translate-1/2 rounded-full backdrop-blur-[2px] transition-transform duration-300 hover:scale-110"
              aria-label="Play video"
            >
              <PlayCircleIcon className="size-full" />
            </button>
          )}
        </>
      )}
    </div>
  );
}
