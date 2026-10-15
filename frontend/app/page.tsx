import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageRenderer } from "@/components/layout/PageRenderer";
import { getHomePage } from "@/(core)/fetch/page";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage();
  return { description: page?.description };
}

export default async function HomePage() {
  const page = await getHomePage();
  if (!page) notFound();
  return <PageRenderer page={page} />;
}
