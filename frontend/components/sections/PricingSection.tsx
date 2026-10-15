import { Reveal } from "@/components/animation/Reveal";
import { Spotlight } from "@/components/animation/Spotlight";
import { CheckIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/(core)/lib/utils";
import type { PricingSectionData } from "@/types";

export function PricingSection({ heading, text, plans, note }: PricingSectionData) {
  return (
    <section className="my-20 md:my-35">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-13">
        <Reveal>
          <SectionHeader heading={heading} text={text} />
        </Reveal>
        <Reveal stagger className="mt-12 grid gap-4 md:mt-16 md:gap-5 lg:grid-cols-3">
          {plans?.map((plan) => (
            <div key={plan._key}>
              <Spotlight
                tone={plan.featured ? "light" : "dark"}
                className={cn(
                  "h-full rounded-card transition-transform duration-500 ease-out-expo hover:-translate-y-1.5",
                  plan.featured ? "bg-ink text-white" : "bg-white",
                )}
              >
                <article className="flex h-full flex-col p-7 md:p-9">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-2xl">{plan.name}</h3>
                    {plan.featured && plan.badge && <Pill tone="solid">{plan.badge}</Pill>}
                  </div>
                  {plan.description && (
                    <p className={cn("mt-3 leading-relaxed", plan.featured ? "text-white/70" : "text-muted")}>{plan.description}</p>
                  )}
                  <p className="mt-10 flex items-baseline gap-2">
                    <span className="text-6xl md:text-7xl">{plan.price}</span>
                    {plan.period && <span className={plan.featured ? "text-white/70" : "text-muted"}>{plan.period}</span>}
                  </p>
                  {plan.features && plan.features.length > 0 && (
                    <ul className={cn("mt-8 space-y-3.5 border-t pt-8", plan.featured ? "border-white/15" : "border-line")}>
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex gap-3">
                          <span
                            className={cn(
                              "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full",
                              plan.featured ? "bg-white text-ink" : "bg-ink text-white",
                            )}
                          >
                            <CheckIcon className="size-3.5" />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-auto pt-10">
                    <Button link={plan.button} variant={plan.featured ? "white" : "black"} className="w-full" />
                  </div>
                </article>
              </Spotlight>
            </div>
          ))}
        </Reveal>
        {note && <p className="mt-8 text-center text-sm text-muted">{note}</p>}
      </div>
    </section>
  );
}
