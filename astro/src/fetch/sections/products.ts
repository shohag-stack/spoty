import { imageFields } from "../fragments";

const productFields = `_id, name, category, price, badge, url, image{ ${imageFields} }`;

// Empty selection = every product
export const productsSectionFields = `
  heading,
  text,
  "products": select(
    count(products) > 0 => products[]->{ ${productFields} },
    *[_type == "product"] | order(_createdAt asc, _id asc){ ${productFields} }
  )
`;
