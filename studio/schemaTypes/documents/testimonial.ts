import { CommentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { imageField } from "../fields/image";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Shown on the photo.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Detail",
      type: "string",
      description: 'Line under the name, e.g. "Club member for 2 years".',
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      description: "What they said. Keep it to 2–3 sentences.",
      validation: (rule) => rule.required(),
    }),
    imageField({
      name: "image",
      title: "Photo",
      description: "Portrait photo. Tall photos work best.",
      required: true,
    }),
  ],
  preview: { select: { title: "name", subtitle: "quote", media: "image" } },
});
