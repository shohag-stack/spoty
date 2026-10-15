import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { imageField } from "../fields/image";

export const coach = defineType({
  name: "coach",
  title: "Coach",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Shown on the coach's card and as the title of their page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      description: 'The page address under /coaches, e.g. "maya-chen".',
      options: { source: "name", maxLength: 64 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: 'Short line under the name, e.g. "Head Coach".',
    }),
    imageField({
      name: "image",
      title: "Portrait",
      description: "Portrait photo. Tall photos work best.",
      required: true,
    }),
    defineField({
      name: "summary",
      title: "Short intro",
      type: "text",
      rows: 3,
      description: "One or two sentences at the top of the coach's page.",
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "array",
      description: "Longer story on the coach's page.",
      of: [{ type: "block", styles: [{ title: "Normal", value: "normal" }], lists: [], marks: { annotations: [] } }],
    }),
    defineField({
      name: "specialties",
      title: "Specialties",
      type: "array",
      description: 'Pills on the coach page, e.g. "Serve technique".',
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "stats",
      title: "Numbers",
      type: "array",
      description: "Up to 3 figures on the coach page, e.g. years of experience.",
      of: [{ type: "stat" }],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: "achievements",
      title: "Highlights",
      type: "array",
      description: "Career highlights, one per line.",
      of: [{ type: "string" }],
    }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "image" } },
});
