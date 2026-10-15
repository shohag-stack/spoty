import { LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "The text people click.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link to",
      type: "string",
      description: 'A page path ("/pricing"), a section on a page ("/about#story"), a full URL, "mailto:" or "tel:".',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});
