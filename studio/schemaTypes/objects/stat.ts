import { BarChartIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const stat = defineType({
  name: "stat",
  title: "Number",
  type: "object",
  icon: BarChartIcon,
  fields: [
    defineField({
      name: "value",
      title: "Number",
      type: "string",
      description: 'The big figure, e.g. "1,200+" or "4.9".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'Short line under the number, e.g. "Active members".',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});
