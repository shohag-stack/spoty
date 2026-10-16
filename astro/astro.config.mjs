// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// Static site: pages are built from Sanity content at build time.
// Publishing in the Studio triggers a rebuild through a deploy hook (see README).
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
