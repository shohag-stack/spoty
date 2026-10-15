import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageRenderer } from "@/components/layout/PageRenderer";
import { getPageBySlug } from "@/(core)/fetch/page";

// The coaches listing is the page with slug "coaches"; this static folder also holds /coaches/<coach>.
const SLUG = "coaches";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(SLUG);
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export default async function CoachesPage() {
  const page = await getPageBySlug(SLUG);
  if (!page) notFound();
  return <PageRenderer page={page} />;
}
