import type { PageSection } from "@/types";
import { BookingSection } from "./BookingSection";
import { CardsSection } from "./CardsSection";
import { CoachesSection } from "./CoachesSection";
import { CtaSection } from "./CtaSection";
import { FaqSection } from "./FaqSection";
import { FeatureSplitSection } from "./FeatureSplitSection";
import { HeroSection } from "./HeroSection";
import { ImageCarouselSection } from "./ImageCarouselSection";
import { IntroSection } from "./IntroSection";
import { PageHeroSection } from "./PageHeroSection";
import { PricingSection } from "./PricingSection";
import { ProductsSection } from "./ProductsSection";
import { StatsSection } from "./StatsSection";
import { TestimonialsSection } from "./TestimonialsSection";

function renderSection(section: PageSection) {
  switch (section._type) {
    case "heroSection":
      return <HeroSection {...section} />;
    case "pageHeroSection":
      return <PageHeroSection {...section} />;
    case "featureSplitSection":
      return <FeatureSplitSection {...section} />;
    case "imageCarouselSection":
      return <ImageCarouselSection {...section} />;
    case "testimonialsSection":
      return <TestimonialsSection {...section} />;
    case "ctaSection":
      return <CtaSection {...section} />;
    case "introSection":
      return <IntroSection {...section} />;
    case "statsSection":
      return <StatsSection {...section} />;
    case "cardsSection":
      return <CardsSection {...section} />;
    case "coachesSection":
      return <CoachesSection {...section} />;
    case "pricingSection":
      return <PricingSection {...section} />;
    case "faqSection":
      return <FaqSection {...section} />;
    case "productsSection":
      return <ProductsSection {...section} />;
    case "bookingSection":
      return <BookingSection {...section} />;
    default:
      return null;
  }
}

// The wrapper carries the anchor id. It has no padding or border, so section margins still collapse through it.
export function SectionRenderer({ sections }: { sections?: PageSection[] }) {
  return (
    <>
      {sections?.map((section) => (
        <div key={section._key} id={section.anchor || undefined} className="scroll-mt-20">
          {renderSection(section)}
        </div>
      ))}
    </>
  );
}
