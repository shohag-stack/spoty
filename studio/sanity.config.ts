import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

export default defineConfig({
  name: "default",
  title: "Spoty",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    // Site settings is a singleton: hide it from "Create new document".
    templates: (templates) => templates.filter(({ schemaType }) => schemaType !== "siteSettings"),
  },
});
