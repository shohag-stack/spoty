import { client } from "@/lib/sanity";
import type { SiteSettings } from "@/types";
import { linkFields } from "./fragments";
import { sectionsProjection } from "./sections";

let settings: Promise<SiteSettings | null> | undefined;

// Fetched once per build: the header, footer and metadata all read it.
export function getSiteSettings() {
  settings ??= client.fetch<SiteSettings | null>(`*[_id == "siteSettings"][0]{
    siteName,
    description,
    navLinks[]{ _key, ${linkFields} },
    navButton{ ${linkFields} },
    newsletterHeading,
    newsletterPlaceholder,
    newsletterButton,
    footerColumns[]{ _key, links[]{ _key, ${linkFields} } },
    contactEmail,
    copyright,
    coachPageSections[]${sectionsProjection}
  }`);
  return settings;
}
