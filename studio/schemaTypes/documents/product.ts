import { BasketIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { imageField } from "../fields/image";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Product name under the photo.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: 'Small grey label, e.g. "Rackets".',
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      description: 'As it should appear, e.g. "$189".',
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      description: 'Optional pill on the photo, e.g. "New".',
    }),
    imageField({
      name: "image",
      title: "Photo",
      description: "Square-ish product photo.",
      required: true,
    }),
    defineField({
      name: "url",
      title: "Shop link",
      type: "string",
      description: "Where the card links to, e.g. your online store. Leave empty to link to the booking page.",
    }),
  ],
  preview: { select: { title: "name", subtitle: "price", media: "image" } },
});
