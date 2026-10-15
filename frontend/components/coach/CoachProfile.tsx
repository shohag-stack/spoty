import { PortableText } from "@portabletext/react";
import { Reveal } from "@/components/animation/Reveal";
import { SplitHeading } from "@/components/animation/SplitHeading";
import { Button } from "@/components/ui/Button";
import { CoachCard } from "@/components/ui/CoachCard";
import { Pill } from "@/components/ui/Pill";
import { SanityImage } from "@/components/ui/SanityImage";
import { COACHES_PATH } from "@/(core)/lib/routes";
import type { CoachCardData, CoachData } from "@/types";

type Props = { coach: CoachData; otherCoaches: CoachCardData[] };

// Template for /coaches/<slug>. Sections from Site settings follow it.
export function CoachProfile({ coach, otherCoaches }: Props) {
  const firstName = coach.name.split(" ")[0];

  return (
    <>
      {/* Page-top: padding for the space under the menu */}
      <section className="pt-32 md:pt-40">
        <div className="mx-auto grid max-w-site gap-10 px-4 md:px-8 lg:px-13 lg:grid-cols-2 lg:gap-20">
          <Reveal className="flex flex-col lg:py-6">
            {coach.role && <Pill className="mb-6 w-fit">{coach.role}</Pill>}
            <SplitHeading text={coach.name} className="text-5xl font-medium text-balance sm:text-6xl lg:text-display" />
            {coach.summary && <p className="mt-6 max-w-lg text-xl leading-snug text-muted md:text-2xl">{coach.summary}</p>}

            {coach.specialties && coach.specialties.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-2">
                {coach.specialties.map((item) => (
                  <li key={item} className="rounded-full bg-white px-4 py-2 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {coach.stats && coach.stats.length > 0 && (
              <dl className="mt-10 grid grid-cols-3 gap-3 lg:mt-auto lg:pt-10">
                {coach.stats.map((stat) => (
                  <div key={stat._key} className="rounded-card bg-white p-5">
                    <dd className="text-3xl md:text-4xl">{stat.value}</dd>
                    <dt className="mt-2 text-sm text-muted">{stat.label}</dt>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Button link={{ label: `Book a session with ${firstName}`, href: "/book" }} />
              <Button link={{ label: "All coaches", href: COACHES_PATH }} variant="outline-dark" />
            </div>
          </Reveal>

          <Reveal variant="clip" delay={0.1} className="relative aspect-4/5 overflow-hidden rounded-card lg:aspect-auto lg:min-h-170">
            <SanityImage image={coach.image} sizes="(min-width: 1024px) 50vw, 100vw" priority />
          </Reveal>
        </div>
      </section>

      {(coach.bio?.length || coach.achievements?.length) && (
        <section className="my-20 md:my-35">
          <div className="mx-auto grid max-w-site gap-10 px-4 md:px-8 lg:px-13 lg:grid-cols-[3fr_2fr] lg:gap-20">
            {coach.bio && coach.bio.length > 0 && (
              <Reveal>
                <h2 className="text-4xl font-medium md:text-5xl">About {firstName}</h2>
                <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
                  <PortableText value={coach.bio} />
                </div>
              </Reveal>
            )}
            {coach.achievements && coach.achievements.length > 0 && (
              <Reveal delay={0.1} className="self-start rounded-card bg-white p-7 md:p-9">
                <h2 className="text-2xl">Highlights</h2>
                <ol className="mt-6 divide-y divide-line">
                  {coach.achievements.map((item, i) => (
                    <li key={i} className="flex gap-5 py-4">
                      <span className="text-subtle tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {otherCoaches.length > 0 && (
        <section className="my-20 md:my-35">
          <div className="mx-auto max-w-site px-4 md:px-8 lg:px-13">
            <h2 className="text-4xl font-medium md:text-5xl">More coaches</h2>
            <Reveal stagger className="mt-10 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">
              {otherCoaches.map((other) => (
                <CoachCard key={other._id} coach={other} sizes="(min-width: 1024px) 33vw, 50vw" />
              ))}
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
