import { cache } from "react";
import { client } from "../sanity/lib/client";
import type { SiteSettings } from "@/types";
import { linkFields } from "./fragments";
import { sectionsProjection } from "./sections";

// Cached per request: the header, footer and metadata all read it.
export const getSiteSettings = cache(async () => {
  return client.fetch<SiteSettings | null>(`*[_id == "siteSettings"][0]{
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
});
