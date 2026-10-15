import { ThLargeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";

export const cardsSection = defineType({
  name: "cardsSection",
  title: "Cards",
  type: "object",
  icon: ThLargeIcon,
  description: "Heading, intro and a grid of white cards (programs, values, benefits…).",
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
      name: "cards",
      title: "Cards",
      type: "array",
      description: "Three or four cards per row on desktop.",
      of: [
        defineArrayMember({
          type: "object",
          name: "card",
          fields: [
            defineField({
              name: "image",
              title: "Photo",
              type: "image",
              description: "Optional photo at the top of the card.",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alt text", type: "string", validation: (rule) => rule.required() })],
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: 'Small grey text above the title, e.g. "Ages 6–12" or "01".',
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              description: "Card title.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "text",
              title: "Text",
              type: "text",
              rows: 3,
              description: "A sentence or two under the title.",
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "link",
              description: "Optional link at the bottom of the card.",
            }),
          ],
          preview: { select: { title: "title", subtitle: "label", media: "image" } },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "columns",
      title: "Cards per row",
      type: "number",
      description: "On desktop.",
      options: { list: [2, 3, 4], layout: "radio", direction: "horizontal" },
      initialValue: 3,
    }),
    anchorField,
  ],
  preview: {
    select: { title: "heading", media: "cards.0.image" },
    prepare: ({ title, media }) => ({ title, subtitle: "Cards", media }),
  },
});
