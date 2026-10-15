import { BarChartIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";

export const statsSection = defineType({
  name: "statsSection",
  title: "Numbers",
  type: "object",
  icon: BarChartIcon,
  description: "A heading and a row of big figures in white cards.",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Optional headline above the cards.",
    }),
    defineField({
      name: "stats",
      title: "Numbers",
      type: "array",
      description: "Four work best on desktop.",
      of: [{ type: "stat" }],
      validation: (rule) => rule.min(1),
    }),
    anchorField,
  ],
  preview: {
    select: { title: "heading", first: "stats.0.value" },
    prepare: ({ title, first }) => ({ title: title || first, subtitle: "Numbers" }),
  },
});
