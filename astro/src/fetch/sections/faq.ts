import { linkFields } from "../fragments";

const faqFields = `_id, question, answer`;

// Empty selection = every FAQ
export const faqSectionFields = `
  heading,
  text,
  button{ ${linkFields} },
  "faqs": select(
    count(faqs) > 0 => faqs[]->{ ${faqFields} },
    *[_type == "faq"] | order(_createdAt asc, _id asc){ ${faqFields} }
  )
`;
