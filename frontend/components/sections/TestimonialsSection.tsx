import type { TestimonialData, TestimonialsSectionData } from "@/types";
import { TestimonialSlider } from "./TestimonialSlider";

export function TestimonialsSection({ heading, testimonials }: TestimonialsSectionData) {
  // Unpublished references come back as null
  const items = testimonials.filter((t): t is TestimonialData => Boolean(t));
  if (items.length === 0) return null;

  return (
    <section className="my-20 md:my-35">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-13">
        <TestimonialSlider heading={heading} items={items} />
      </div>
    </section>
  );
}
