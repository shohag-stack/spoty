import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { imageField } from "../fields/image";

export const pageHeroSection = defineType({
  name: "pageHeroSection",
  title: "Page title",
  type: "object",
  icon: DocumentTextIcon,
  description: "Photo banner with the page title. Put it first on every inner page.",
  fields: [
    imageField({
      name: "backgroundImage",
      title: "Background photo",
      description: "Photo behind the title. It is darkened slightly so the white text stays readable.",
      required: true,
    }),
    defineField({
      name: "eyebrow",
      title: "Label",
      type: "string",
      description: 'Small pill above the title, e.g. "About Spoty".',
    }),
    defineField({
      name: "heading",
      title: "Title",
      type: "text",
      rows: 2,
      description: "The large white page title (h1).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Intro text",
      type: "text",
      rows: 3,
      description: "One or two sentences shown next to the title.",
    }),
    defineField({
      name: "button",
      title: "Button",
      type: "link",
      description: "Optional white button under the intro text.",
    }),
    anchorField,
  ],
  preview: {
    select: { title: "heading", media: "backgroundImage" },
    prepare: ({ title, media }) => ({ title, subtitle: "Page title", media }),
  },
});
