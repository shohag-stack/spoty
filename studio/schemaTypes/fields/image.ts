import { defineField } from "sanity";

type ImageFieldOptions = {
  name: string;
  title: string;
  description: string;
  required?: boolean;
};

// Image with hotspot and a required alt text. Used by every section and document.
export function imageField({ name, title, description, required = false }: ImageFieldOptions) {
  return defineField({
    name,
    title,
    type: "image",
    description,
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alt text",
        type: "string",
        description: "Describes the photo for screen readers and search engines.",
        validation: (rule) => rule.required(),
      }),
    ],
    validation: required ? (rule) => rule.required() : undefined,
  });
}
