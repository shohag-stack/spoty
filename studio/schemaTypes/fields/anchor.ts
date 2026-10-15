import { defineField } from "sanity";

// Ends every section's fields so menu links like "/about#coaches" can target it.
export const anchorField = defineField({
  name: "anchor",
  title: "Anchor ID",
  type: "string",
  description:
    'Optional. Lets a menu link jump to this section: "coaches" makes "/page#coaches" scroll here. Lowercase letters, numbers and dashes only.',
  validation: (rule) =>
    rule.regex(/^[a-z0-9-]+$/, { name: "anchor", invert: false }).warning("Use lowercase letters, numbers and dashes."),
});
