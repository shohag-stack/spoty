import { SplitHorizontalIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { imageField } from "../fields/image";

export const featureSplitSection = defineType({
  name: "featureSplitSection",
  title: "Feature with gallery",
  type: "object",
  icon: SplitHorizontalIcon,
  description: "Large photo on one side; headline, a small photo slider and text on the other.",
  fields: [
    imageField({
      name: "mainImage",
      title: "Large photo",
      description: "The tall photo on the left (on the right when flipped).",
      required: true,
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Headline next to the large photo.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 3,
      description: "Short paragraph under the photo slider.",
    }),
    defineField({
      name: "gallery",
      title: "Slider photos",
      type: "array",
      description: "Two or more photos. Visitors step through them with the round arrow buttons.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt text", type: "string", validation: (rule) => rule.required() })],
        },
      ],
      validation: (rule) => rule.min(2),
    }),
    defineField({
      name: "button",
      title: "Button",
      type: "link",
      description: "Optional black button under the text.",
    }),
    defineField({
      name: "flip",
      title: "Large photo on the right",
      type: "boolean",
      description: "Swap the sides on desktop.",
      initialValue: false,
    }),
    anchorField,
  ],
  preview: {
    select: { title: "heading", media: "mainImage" },
    prepare: ({ title, media }) => ({ title, subtitle: "Feature with gallery", media }),
  },
});
