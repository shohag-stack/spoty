import { CountUp } from "@/components/animation/CountUp";
import { Reveal } from "@/components/animation/Reveal";
import type { StatsSectionData } from "@/types";

export function StatsSection({ heading, stats }: StatsSectionData) {
  return (
    <section className="my-20 md:my-35">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-13">
        {heading && (
          <Reveal>
            <h2 className="mb-10 max-w-2xl text-4xl font-medium text-balance md:mb-14 md:text-5xl lg:text-heading">{heading}</h2>
          </Reveal>
        )}
        <Reveal stagger className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {stats?.map((stat) => (
            <div key={stat._key} className="group flex min-h-44 flex-col justify-between rounded-card bg-white p-6 transition-colors duration-500 hover:bg-ink hover:text-white md:min-h-60 md:p-8">
              <CountUp value={stat.value} className="text-5xl tabular-nums md:text-7xl" />
              <p className="mt-6 text-sm text-muted transition-colors duration-500 group-hover:text-white/70 md:text-base">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
