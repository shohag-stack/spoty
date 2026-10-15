import { CreditCardIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";

export const pricingSection = defineType({
  name: "pricingSection",
  title: "Pricing",
  type: "object",
  icon: CreditCardIcon,
  description: "Membership plans side by side.",
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
      name: "plans",
      title: "Plans",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "plan",
          fields: [
            defineField({ name: "name", title: "Plan name", type: "string", description: "Shown at the top of the card.", validation: (rule) => rule.required() }),
            defineField({ name: "price", title: "Price", type: "string", description: 'The big figure, e.g. "$89".', validation: (rule) => rule.required() }),
            defineField({ name: "period", title: "Per", type: "string", description: 'Next to the price, e.g. "/ month".' }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2, description: "Who the plan is for." }),
            defineField({
              name: "features",
              title: "What's included",
              type: "array",
              description: "One line per item, shown with a tick.",
              of: [{ type: "string" }],
            }),
            defineField({ name: "button", title: "Button", type: "link", description: "Button at the bottom of the card." }),
            defineField({
              name: "featured",
              title: "Highlight this plan",
              type: "boolean",
              description: "Shows the card in black with a badge.",
              initialValue: false,
            }),
            defineField({ name: "badge", title: "Badge text", type: "string", description: 'Shown on highlighted plans, e.g. "Most popular".' }),
          ],
          preview: {
            select: { title: "name", price: "price", period: "period" },
            prepare: ({ title, price, period }) => ({ title, subtitle: [price, period].filter(Boolean).join(" ") }),
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "note",
      title: "Small print",
      type: "string",
      description: "Optional line under the plans, e.g. about taxes or trials.",
    }),
    anchorField,
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title, subtitle: "Pricing" }),
  },
});
