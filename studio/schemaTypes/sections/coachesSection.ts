import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";

export const coachesSection = defineType({
  name: "coachesSection",
  title: "Coaches",
  type: "object",
  icon: UsersIcon,
  description: "Grid of coach portraits. Each opens the coach's own page.",
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
      name: "coaches",
      title: "Coaches",
      type: "array",
      description: "Pick which coaches to show, in order. Leave empty to show all.",
      of: [{ type: "reference", to: [{ type: "coach" }] }],
    }),
    defineField({
      name: "button",
      title: "Button",
      type: "link",
      description: 'Optional button under the grid, e.g. "Meet all coaches".',
    }),
    anchorField,
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title, subtitle: "Coaches" }),
  },
});
