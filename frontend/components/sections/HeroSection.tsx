import { Parallax } from "@/components/animation/Parallax";
import { Reveal } from "@/components/animation/Reveal";
import { SplitHeading } from "@/components/animation/SplitHeading";
import { PhoneIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/components/ui/SanityImage";
import { hasImage } from "@/(core)/lib/image";
import { telHref } from "@/(core)/lib/utils";
import type { HeroSectionData } from "@/types";
import { HeroBackgroundVideo } from "./HeroBackgroundVideo";
import { HeroCardMedia } from "./HeroCardMedia";

export function HeroSection({ backgroundImage, backgroundVideo, phoneLabel, phoneNumber, heading, button, cardAvatars, cardText, cardImage, cardVideo }: HeroSectionData) {
  const hasCard = Boolean(cardText || hasImage(cardImage));

  return (
    // Figma: the card hangs 205px below the photo; the next section starts 149px below the photo.
    <section className="relative lg:mb-37">
      <div className="relative flex h-dvh min-h-160 overflow-hidden bg-ink">
        <Parallax speed={16} className="absolute inset-x-0 -inset-y-28">
          <SanityImage image={backgroundImage} sizes="100vw" priority />
          {backgroundVideo?.url && <HeroBackgroundVideo video={backgroundVideo} poster={backgroundImage} />}
        </Parallax>
        <div className="absolute inset-0 bg-linear-to-tr from-black/55 via-black/15 to-black/25" aria-hidden="true" />

        <div className="relative mx-auto flex w-full max-w-site flex-col justify-end px-4 pt-header pb-16 text-white md:px-8 md:pb-17.5 lg:px-13">
          {phoneNumber && (
            <a
              href={telHref(phoneNumber)}
              className="group/phone mb-8 inline-flex w-fit items-center gap-1.75 rounded-full border border-white bg-white/20 py-1.75 pr-8.75 pl-1.75 text-base font-medium backdrop-blur-[2px] transition-[background-color,color,scale] duration-300 hover:bg-white hover:text-ink active:scale-96 md:mb-10"
            >
              <span className="grid size-9 place-items-center rounded-full bg-white text-ink transition-colors duration-300 group-hover/phone:bg-ink group-hover/phone:text-white">
                <PhoneIcon className="group-hover/phone:animate-[ring_0.6s_ease-in-out]" />
              </span>
              {phoneLabel || phoneNumber}
            </a>
          )}
          <SplitHeading text={heading} className="max-w-240 text-5xl font-medium text-balance sm:text-6xl lg:max-w-200 lg:text-display" />
          <Button link={button} variant="white" className="mt-8 w-fit md:mt-10" />
        </div>
      </div>

      {hasCard && (
        <div className="relative -mt-16 px-4 md:px-8 lg:px-13 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:-bottom-51.25 lg:mt-0">
          <Reveal delay={0.5} className="mx-auto flex max-w-site justify-end">
            <div className="pointer-events-auto w-full overflow-hidden bg-white [clip-path:url(#hero-card-clip)] sm:max-w-96.5">
              <div className="px-7.75 pt-25 pb-10">
                {cardAvatars && cardAvatars.length > 0 && (
                  <div className="mb-4.25 flex -space-x-3.75">
                    {cardAvatars.map((avatar) => (
                      <div key={avatar._key} className="relative size-14.25 overflow-hidden rounded-full ring-2 ring-white">
                        <SanityImage image={avatar} sizes="56px" />
                      </div>
                    ))}
                  </div>
                )}
                {cardText && <p className="text-3xl font-medium">{cardText}</p>}
              </div>
              {hasImage(cardImage) && <HeroCardMedia image={cardImage} video={cardVideo} />}
            </div>
          </Reveal>
        </div>
      )}
    </section>
  );
}
