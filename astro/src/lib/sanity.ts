import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImage } from "@/types";

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-01-01",
  // Pages are built ahead of time, so read straight from the API for the freshest content
  useCdn: false,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}
