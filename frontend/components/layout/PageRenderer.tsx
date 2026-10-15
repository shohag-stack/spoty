import { SectionRenderer } from "@/components/sections/SectionRenderer";
import type { PageData } from "@/types";
import { SiteHeader } from "./SiteHeader";

// Shared by the home page, [slug] pages and listing pages such as /coaches.
export function PageRenderer({ page }: { page: PageData }) {
  return (
    <>
      <SiteHeader menuColor={page.menuColor} />
      <main>
        <SectionRenderer sections={page.sections} />
      </main>
    </>
  );
}
