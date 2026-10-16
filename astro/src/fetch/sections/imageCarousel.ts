import { imageFields, linkFields } from "../fragments";

export const imageCarouselSectionFields = `
  heading,
  button{ ${linkFields} },
  images[]{ _key, ${imageFields} }
`;
