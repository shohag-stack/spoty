import { imageFields, linkFields } from "../fragments";

export const coachCardFields = `_id, name, "slug": slug.current, role, image{ ${imageFields} }`;

// Empty selection = every coach
export const coachesSectionFields = `
  heading,
  text,
  button{ ${linkFields} },
  "coaches": select(
    count(coaches) > 0 => coaches[]->{ ${coachCardFields} },
    *[_type == "coach"] | order(_createdAt asc, _id asc){ ${coachCardFields} }
  )
`;
