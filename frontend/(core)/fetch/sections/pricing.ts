import { linkFields } from "../fragments";

export const pricingSectionFields = `
  heading,
  text,
  note,
  plans[]{ _key, name, price, period, description, features, button{ ${linkFields} }, featured, badge }
`;
