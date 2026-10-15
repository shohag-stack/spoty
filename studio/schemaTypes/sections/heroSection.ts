import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { imageField } from "../fields/image";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero",
  type: "object",
  icon: HomeIcon,
  description: "Full-screen photo with the page headline. Use it once, at the top of the home page.",
  fields: [
    imageField({
      name: "backgroundImage",
      title: "Background photo",
      description: "Fills the whole screen behind the headline. Pick a dark-ish photo so white text stays readable.",
      required: true,
    }),
    defineField({
      name: "backgroundVideo",
      title: "Background video",
      type: "file",
      description:
        "Optional MP4 or WebM that plays silently on a loop behind the headline. The background photo shows while it loads and for visitors who prefer reduced motion. Keep it short (10–20 s) and under ~15 MB.",
      options: { accept: "video/mp4,video/webm" },
    }),
    defineField({
      name: "phoneLabel",
      title: "Phone button text",
      type: "string",
      description: 'Small pill above the headline, e.g. "Call the front desk".',
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone number",
      type: "string",
      description: "Number dialled when visitors tap the pill. Leave empty to hide the pill.",
    }),
    defineField({
      name: "heading",
      title: "Headline",
      type: "text",
      rows: 3,
      description: "The large white headline. This is the page's main title (h1).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "button",
      title: "Button",
      type: "link",
      description: "White button under the headline.",
    }),
    defineField({
      name: "cardAvatars",
      title: "Card avatars",
      type: "array",
      description: "Up to 3 small round photos at the top of the white card on the right.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt text", type: "string", validation: (rule) => rule.required() })],
        },
      ],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: "cardText",
      title: "Card text",
      type: "text",
      rows: 3,
      description: "Short statement in the white card on the right.",
    }),
    imageField({
      name: "cardImage",
      title: "Card photo",
      description: "Photo at the bottom of the white card. Shows a play button when a video is added.",
    }),
    defineField({
      name: "cardVideo",
      title: "Card video",
      type: "file",
      description: "Optional MP4 or WebM. Plays when visitors press the play button on the card photo.",
      options: { accept: "video/mp4,video/webm" },
    }),
    anchorField,
  ],
  preview: {
    select: { title: "heading", media: "backgroundImage" },
    prepare: ({ title, media }) => ({ title, subtitle: "Hero", media }),
  },
});
