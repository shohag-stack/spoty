import { BasketIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";

export const productsSection = defineType({
  name: "productsSection",
  title: "Products",
  type: "object",
  icon: BasketIcon,
  description: "Grid of products from the pro shop.",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Headline at the top left.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Intro text",
      type: "text",
      rows: 3,
      description: "Short paragraph to the right of the heading.",
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      description: "Pick which products to show, in order. Leave empty to show all.",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    anchorField,
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title, subtitle: "Products" }),
  },
});
