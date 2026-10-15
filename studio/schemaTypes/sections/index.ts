import { bookingSection } from "./bookingSection";
import { cardsSection } from "./cardsSection";
import { coachesSection } from "./coachesSection";
import { ctaSection } from "./ctaSection";
import { faqSection } from "./faqSection";
import { featureSplitSection } from "./featureSplitSection";
import { heroSection } from "./heroSection";
import { imageCarouselSection } from "./imageCarouselSection";
import { introSection } from "./introSection";
import { pageHeroSection } from "./pageHeroSection";
import { pricingSection } from "./pricingSection";
import { productsSection } from "./productsSection";
import { statsSection } from "./statsSection";
import { testimonialsSection } from "./testimonialsSection";

// Every section listed here shows up in each section picker (pages, site settings).
export const sectionTypes = [
  heroSection,
  pageHeroSection,
  featureSplitSection,
  introSection,
  statsSection,
  cardsSection,
  coachesSection,
  imageCarouselSection,
  pricingSection,
  productsSection,
  testimonialsSection,
  faqSection,
  bookingSection,
  ctaSection,
];

export const sectionMembers = sectionTypes.map((section) => ({ type: section.name }));
