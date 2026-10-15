import { ImagesIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";

export const imageCarouselSection = defineType({
  name: "imageCarouselSection",
  title: "Photo carousel",
  type: "object",
  icon: ImagesIcon,
  description: "Centered heading over a curved row of photos on a white band.",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Centered headline above the photos.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "button",
      title: "Button",
      type: "link",
      description: "Optional black button under the photos.",
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      description: "Five to seven photos look best. The middle one sits flat; the others curve away.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt text", type: "string", validation: (rule) => rule.required() })],
        },
      ],
      validation: (rule) => rule.min(3),
    }),
    anchorField,
  ],
  preview: {
    select: { title: "heading", media: "images.0" },
    prepare: ({ title, media }) => ({ title, subtitle: "Photo carousel", media }),
  },
});
