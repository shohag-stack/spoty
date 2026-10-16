import { imageFields, linkFields } from "../fragments";

export const ctaSectionFields = `
  heading,
  floatingImages[]{ _key, ${imageFields} },
  bannerImage{ ${imageFields} },
  button{ ${linkFields} }
`;
