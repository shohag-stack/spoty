import { imageFields } from "../fragments";

const testimonialFields = `_id, name, role, quote, image{ ${imageFields} }`;

// Empty selection = every testimonial
export const testimonialsSectionFields = `
  heading,
  "testimonials": select(
    count(testimonials) > 0 => testimonials[]->{ ${testimonialFields} },
    *[_type == "testimonial"] | order(_createdAt asc, _id desc){ ${testimonialFields} }
  )
`;
