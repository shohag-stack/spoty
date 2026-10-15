import { imageFields, linkFields } from "../fragments";

export const introSectionFields = `
  eyebrow,
  heading,
  body,
  button{ ${linkFields} },
  images[]{ _key, ${imageFields} }
`;
