import { Reveal } from "@/components/animation/Reveal";
import { SanityImage } from "@/components/ui/SanityImage";
import { hasImage } from "@/(core)/lib/image";
import type { BookingSectionData } from "@/types";
import { BookingForm } from "./BookingForm";

export function BookingSection({ heading, text, services, buttonLabel, image, contactItems }: BookingSectionData) {
  return (
    <section className="my-20 md:my-35">
      <div className="mx-auto grid max-w-site gap-4 px-4 md:px-8 lg:px-13 lg:grid-cols-[7fr_4fr] lg:gap-5">
        <Reveal className="rounded-card bg-white p-6 md:p-12">
          <h2 className="max-w-lg text-4xl font-medium text-balance md:text-5xl">{heading}</h2>
          {text && <p className="mt-4 max-w-lg leading-relaxed text-muted">{text}</p>}
          <BookingForm services={services ?? []} buttonLabel={buttonLabel ?? "Send booking request"} />
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col rounded-card bg-ink p-2.5 text-white">
          {hasImage(image) && (
            <div className="relative aspect-4/3 overflow-hidden rounded-card">
              <SanityImage image={image} sizes="(min-width: 1024px) 33vw, 100vw" />
            </div>
          )}
          <dl className="space-y-6 p-6 md:p-8">
            {contactItems?.map((item) => (
              <div key={item._key}>
                <dt className="text-sm text-white/50">{item.label}</dt>
                <dd className="mt-1 text-lg whitespace-pre-line">
                  {item.href ? (
                    <a href={item.href} className="hover:underline">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
