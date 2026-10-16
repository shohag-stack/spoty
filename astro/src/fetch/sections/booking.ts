import { imageFields } from "../fragments";

export const bookingSectionFields = `
  heading,
  text,
  services,
  buttonLabel,
  image{ ${imageFields} },
  contactItems[]{ _key, label, value, href }
`;
