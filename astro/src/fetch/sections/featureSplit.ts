import { imageFields, linkFields } from "../fragments";

export const featureSplitSectionFields = `
  mainImage{ ${imageFields} },
  heading,
  text,
  gallery[]{ _key, ${imageFields} },
  button{ ${linkFields} },
  flip
`;
