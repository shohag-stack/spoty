import { client } from "@/lib/sanity";
import type { PageData } from "@/types";
import { sectionsProjection } from "./sections";

const pageFields = `
  _id,
  title,
  "slug": slug.current,
  description,
  menuColor,
  sections[]${sectionsProjection}
`;

export async function getHomePage() {
  return client.fetch<PageData | null>(`*[_id == "home"][0]{ ${pageFields} }`);
}

export async function getPageBySlug(slug: string) {
  return client.fetch<PageData | null>(
    `*[_type == "page" && slug.current == $slug && _id != "home"][0]{ ${pageFields} }`,
    { slug }
  );
}

export async function getPageSlugs() {
  return client.fetch<string[]>(`*[_type == "page" && defined(slug.current) && _id != "home"].slug.current`);
}
