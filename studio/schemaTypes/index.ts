import { coach } from "./documents/coach";
import { faq } from "./documents/faq";
import { page } from "./documents/page";
import { product } from "./documents/product";
import { siteSettings } from "./documents/siteSettings";
import { testimonial } from "./documents/testimonial";
import { link } from "./objects/link";
import { stat } from "./objects/stat";
import { sectionTypes } from "./sections";

export const schemaTypes = [
  // Documents
  page,
  siteSettings,
  coach,
  testimonial,
  faq,
  product,
  // Objects
  link,
  stat,
  // Page sections
  ...sectionTypes,
];
