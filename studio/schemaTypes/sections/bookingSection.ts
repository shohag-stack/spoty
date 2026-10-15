import { CalendarIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { imageField } from "../fields/image";

export const bookingSection = defineType({
  name: "bookingSection",
  title: "Booking form",
  type: "object",
  icon: CalendarIcon,
  description: "Appointment form on the left, contact details and a photo on the right.",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Headline above the form.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Intro text",
      type: "text",
      rows: 3,
      description: "Short paragraph above the form.",
    }),
    defineField({
      name: "services",
      title: "Session types",
      type: "array",
      description: 'Options in the "What would you like to book?" dropdown.',
      of: [{ type: "string" }],
    }),
    defineField({
      name: "buttonLabel",
      title: "Submit button text",
      type: "string",
      initialValue: "Send booking request",
    }),
    imageField({
      name: "image",
      title: "Photo",
      description: "Photo at the top of the black contact card.",
    }),
    defineField({
      name: "contactItems",
      title: "Contact details",
      type: "array",
      description: "Lines in the black card on the right (address, phone, opening hours…).",
      of: [
        defineArrayMember({
          type: "object",
          name: "contactItem",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", description: 'Small grey label, e.g. "Phone".', validation: (rule) => rule.required() }),
            defineField({ name: "value", title: "Text", type: "text", rows: 2, description: "The detail itself.", validation: (rule) => rule.required() }),
            defineField({ name: "href", title: "Link", type: "string", description: 'Optional, e.g. "tel:+15551234567" or "mailto:…".' }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),
    anchorField,
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title, subtitle: "Booking form" }),
  },
});
