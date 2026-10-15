import { HelpCircleIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";

export const faqSection = defineType({
  name: "faqSection",
  title: "FAQ",
  type: "object",
  icon: HelpCircleIcon,
  description: "Questions that open to show their answer.",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Headline on the left.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Intro text",
      type: "text",
      rows: 3,
      description: "Short paragraph under the heading.",
    }),
    defineField({
      name: "button",
      title: "Button",
      type: "link",
      description: 'Optional button under the intro, e.g. "Contact us".',
    }),
    defineField({
      name: "faqs",
      title: "Questions",
      type: "array",
      description: "Pick which questions to show, in order. Leave empty to show all.",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
    }),
    anchorField,
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title, subtitle: "FAQ" }),
  },
});
