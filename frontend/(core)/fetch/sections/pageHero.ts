import { imageFields, linkFields } from "../fragments";

export const pageHeroSectionFields = `
  backgroundImage{ ${imageFields} },
  eyebrow,
  heading,
  text,
  button{ ${linkFields} }
`;
