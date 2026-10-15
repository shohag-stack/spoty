import { TextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";

export const introSection = defineType({
  name: "introSection",
  title: "Story",
  type: "object",
  icon: TextIcon,
  description: "Big heading on the left, paragraphs on the right, and a row of photos underneath.",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Label",
      type: "string",
      description: 'Small pill above the heading, e.g. "Our story".',
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Headline on the left.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Paragraphs",
      type: "array",
      description: "Text on the right. Add one item per paragraph.",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({
      name: "button",
      title: "Button",
      type: "link",
      description: "Optional black button under the paragraphs.",
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      description: "Up to 3 photos in a row under the text. The first one is the widest.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt text", type: "string", validation: (rule) => rule.required() })],
        },
      ],
      validation: (rule) => rule.max(3),
    }),
    anchorField,
  ],
  preview: {
    select: { title: "heading", media: "images.0" },
    prepare: ({ title, media }) => ({ title, subtitle: "Story", media }),
  },
});
