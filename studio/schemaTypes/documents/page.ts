import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { sectionMembers } from "../sections";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      description: "Shown in the browser tab and search results.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      description: 'The page address: "about" makes /about. Not used on the home page.',
      options: { source: "title", maxLength: 64 },
    }),
    defineField({
      name: "description",
      title: "Search description",
      type: "text",
      rows: 2,
      description: "One or two sentences shown under the title in Google and link previews.",
    }),
    defineField({
      name: "menuColor",
      title: "Menu text colour",
      type: "string",
      description: "Light = white menu over a dark photo at the top. Dark = black menu over a light background.",
      options: {
        list: [
          { title: "Light", value: "light" },
          { title: "Dark", value: "dark" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "light",
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      description: "The page content from top to bottom. Drag to reorder.",
      of: sectionMembers,
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare: ({ title, slug }) => ({ title, subtitle: slug ? `/${slug}` : "/" }),
  },
});
