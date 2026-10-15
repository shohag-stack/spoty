import { CommentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";

export const testimonialsSection = defineType({
  name: "testimonialsSection",
  title: "Testimonials",
  type: "object",
  icon: CommentIcon,
  description: "Member quotes with photos, one at a time.",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Headline at the top left.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      description: "Pick which quotes to show, in order. Leave empty to show all.",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
    }),
    anchorField,
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title, subtitle: "Testimonials" }),
  },
});
