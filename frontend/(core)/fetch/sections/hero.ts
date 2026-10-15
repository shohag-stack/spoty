import { imageFields, linkFields } from "../fragments";

export const heroSectionFields = `
  backgroundImage{ ${imageFields} },
  "backgroundVideo": backgroundVideo.asset->{ url, mimeType },
  phoneLabel,
  phoneNumber,
  heading,
  button{ ${linkFields} },
  cardAvatars[]{ _key, ${imageFields} },
  cardText,
  cardImage{ ${imageFields} },
  "cardVideo": cardVideo.asset->{ url, mimeType }
`;
