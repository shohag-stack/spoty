import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { sectionMembers } from "../sections";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "general", title: "General", default: true },
    { name: "menu", title: "Menu" },
    { name: "footer", title: "Footer" },
    { name: "coachPages", title: "Coach pages" },
  ],
  fields: [
    defineField({
      name: "siteName",
      title: "Site name",
      type: "string",
      group: "general",
      description: "Shown as the logo in the menu and in browser tabs.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Default search description",
      type: "text",
      rows: 2,
      group: "general",
      description: "Used for pages without their own search description.",
    }),
    defineField({
      name: "navLinks",
      title: "Menu links",
      type: "array",
      group: "menu",
      description: "Links in the top menu, left to right.",
      of: [{ type: "link" }],
    }),
    defineField({
      name: "navButton",
      title: "Menu button",
      type: "link",
      group: "menu",
      description: 'Outlined button at the right of the menu, e.g. "Book a session".',
    }),
    defineField({
      name: "newsletterHeading",
      title: "Newsletter heading",
      type: "string",
      group: "footer",
      description: "Heading above the email field in the footer.",
    }),
    defineField({
      name: "newsletterPlaceholder",
      title: "Email field placeholder",
      type: "string",
      group: "footer",
      initialValue: "Your email address",
    }),
    defineField({
      name: "newsletterButton",
      title: "Subscribe button text",
      type: "string",
      group: "footer",
      initialValue: "Subscribe",
    }),
    defineField({
      name: "footerColumns",
      title: "Link columns",
      type: "array",
      group: "footer",
      description: "Columns of links next to the newsletter.",
      of: [
        defineArrayMember({
          type: "object",
          name: "footerColumn",
          fields: [
            defineField({ name: "title", title: "Column name", type: "string", description: "Only used in the Studio to tell columns apart." }),
            defineField({ name: "links", title: "Links", type: "array", of: [{ type: "link" }] }),
          ],
          preview: { select: { title: "title", first: "links.0.label" }, prepare: ({ title, first }) => ({ title: title || first }) },
        }),
      ],
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
      group: "footer",
      description: 'Shown under the links as "Contact: …".',
    }),
    defineField({
      name: "copyright",
      title: "Copyright line",
      type: "string",
      group: "footer",
      description: "Small text at the very bottom.",
    }),
    defineField({
      name: "coachPageSections",
      title: "Sections under every coach page",
      type: "array",
      group: "coachPages",
      description: "Shown below each coach's profile, e.g. testimonials and a call to action.",
      of: sectionMembers,
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
