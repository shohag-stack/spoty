import { imageFields, linkFields } from "../fragments";

export const cardsSectionFields = `
  heading,
  text,
  columns,
  cards[]{ _key, image{ ${imageFields} }, label, title, text, link{ ${linkFields} } }
`;
