"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const TEMPLATE_URL = "https://www.rayso.studio/templates/spoty-tennis-club-and-sports-academy-template";
const BG = "https://res.cloudinary.com/dq9ckspti/image/upload/v1777533939/coverjpg_uf6mej.jpg";
const LOGO = "https://res.cloudinary.com/dq9ckspti/image/upload/v1777534388/rayso-logo_fgdmli.png";

const slides = [
  { type: "logo" },
  { type: "text", text: "Premium Next.js Templates" },
] as const;

export function RaysoCta() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % slides.length), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed right-4 bottom-4 z-40 flex w-40 flex-col gap-1.5 md:right-6 md:bottom-6 md:w-44">
      {/* Slider */}
      <div className="relative aspect-[2/1] overflow-hidden rounded-xl shadow-lg">
        <div
          className="absolute inset-0 transition-transform duration-700 ease-in-out"
          style={{ transform: `translateY(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="absolute flex h-full w-full items-center justify-center"
              style={{ top: `${i * 100}%` }}
            >
              <Image src={BG} alt="" fill unoptimized className="object-cover" />
              <div className="absolute inset-0 z-10 bg-blue-950/60" />
              <div className="relative z-20 flex items-center justify-center text-center text-white">
                {slide.type === "logo" ? (
                  <Image src={LOGO} width={170} height={49} unoptimized alt="Rayso" className="w-3/5" />
                ) : (
                  <span className="px-3 text-[15px] leading-tight font-bold">{slide.text}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Link
        href={TEMPLATE_URL}
        className="group relative flex items-center justify-center rounded-full bg-lime-400 px-3 py-1.5 text-[14px] font-semibold shadow-lg text-neutral-900"
      >
        <div className="h-[1.7em] overflow-hidden">
          <div className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
            <span className="flex items-center justify-center">Get this Template</span>
            <span className="flex items-center justify-center">Get this Template</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
