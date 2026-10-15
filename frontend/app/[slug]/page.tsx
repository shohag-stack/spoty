import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageRenderer } from "@/components/layout/PageRenderer";
import { getPageBySlug, getPageSlugs } from "@/(core)/fetch/page";
import { COACHES_PATH } from "@/(core)/lib/routes";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  // Listing pages with their own folder (e.g. /coaches) are rendered there instead
  const slugs = await getPageSlugs();
  return slugs.filter((slug) => `/${slug}` !== COACHES_PATH).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPageBySlug((await params).slug);
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export default async function Page({ params }: Props) {
  const page = await getPageBySlug((await params).slug);
  if (!page) notFound();
  return <PageRenderer page={page} />;
}
