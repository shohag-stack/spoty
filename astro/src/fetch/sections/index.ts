import { bookingSectionFields } from "./booking";
import { cardsSectionFields } from "./cards";
import { coachesSectionFields } from "./coaches";
import { ctaSectionFields } from "./cta";
import { faqSectionFields } from "./faq";
import { featureSplitSectionFields } from "./featureSplit";
import { heroSectionFields } from "./hero";
import { imageCarouselSectionFields } from "./imageCarousel";
import { introSectionFields } from "./intro";
import { pageHeroSectionFields } from "./pageHero";
import { pricingSectionFields } from "./pricing";
import { productsSectionFields } from "./products";
import { statsSectionFields } from "./stats";
import { testimonialsSectionFields } from "./testimonials";

// Projection for any array of page sections (pages, site settings).
export const sectionsProjection = `{
  _type,
  _key,
  anchor,
  _type == "heroSection" => { ${heroSectionFields} },
  _type == "pageHeroSection" => { ${pageHeroSectionFields} },
  _type == "featureSplitSection" => { ${featureSplitSectionFields} },
  _type == "imageCarouselSection" => { ${imageCarouselSectionFields} },
  _type == "testimonialsSection" => { ${testimonialsSectionFields} },
  _type == "ctaSection" => { ${ctaSectionFields} },
  _type == "introSection" => { ${introSectionFields} },
  _type == "statsSection" => { ${statsSectionFields} },
  _type == "cardsSection" => { ${cardsSectionFields} },
  _type == "coachesSection" => { ${coachesSectionFields} },
  _type == "pricingSection" => { ${pricingSectionFields} },
  _type == "faqSection" => { ${faqSectionFields} },
  _type == "productsSection" => { ${productsSectionFields} },
  _type == "bookingSection" => { ${bookingSectionFields} }
}`;
