import Link from "next/link";
import { Tilt } from "@/components/animation/Tilt";
import { ArrowUpRightIcon } from "@/components/icons";
import { coachHref } from "@/(core)/lib/routes";
import type { CoachCardData } from "@/types";
import { SanityImage } from "./SanityImage";

// Portrait card with the name on the photo (same style as the testimonial photos).
export function CoachCard({ coach, sizes }: { coach: CoachCardData; sizes: string }) {
  return (
    <Tilt>
      <Link href={coachHref(coach.slug)} className="group relative block aspect-3/4 overflow-hidden rounded-card bg-line">
        <SanityImage image={coach.image} sizes={sizes} className="transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/65 to-transparent px-5 pt-20 pb-5 text-white">
          <p className="text-xl md:text-2xl">{coach.name}</p>
          {coach.role && <p className="text-sm text-white/85">{coach.role}</p>}
        </div>
        <span className="absolute top-4 right-4 grid size-12 scale-75 place-items-center rounded-full bg-white text-ink opacity-0 transition-[opacity,transform] duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
          <ArrowUpRightIcon />
        </span>
      </Link>
    </Tilt>
  );
}
