import { BulbOutlineIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { imageField } from "../fields/image";

export const ctaSection = defineType({
  name: "ctaSection",
  title: "Call to action",
  type: "object",
  icon: BulbOutlineIcon,
  description: "Headline with floating photos, then a full-width photo banner with a big button.",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Centered headline between the floating photos.",
    }),
    defineField({
      name: "floatingImages",
      title: "Floating photos",
      type: "array",
      description: "Up to 3 photos around the headline: top left, star-shaped centre, top right.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt text", type: "string", validation: (rule) => rule.required() })],
        },
      ],
      validation: (rule) => rule.max(3),
    }),
    imageField({
      name: "bannerImage",
      title: "Banner photo",
      description: "Full-width photo behind the big button.",
      required: true,
    }),
    defineField({
      name: "button",
      title: "Big button",
      type: "link",
      description: 'The large white pill in the banner, e.g. "Book a session".',
      validation: (rule) => rule.required(),
    }),
    anchorField,
  ],
  preview: {
    select: { title: "heading", button: "button.label", media: "bannerImage" },
    prepare: ({ title, button, media }) => ({ title: title || button, subtitle: "Call to action", media }),
  },
});
