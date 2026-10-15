import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CoachProfile } from "@/components/coach/CoachProfile";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { getCoach, getCoachSlugs, getOtherCoaches } from "@/(core)/fetch/coach";
import { getSiteSettings } from "@/(core)/fetch/siteSettings";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getCoachSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const coach = await getCoach((await params).slug);
  if (!coach) return {};
  return { title: coach.name, description: coach.summary };
}

export default async function CoachPage({ params }: Props) {
  const { slug } = await params;
  const [coach, otherCoaches, settings] = await Promise.all([getCoach(slug), getOtherCoaches(slug), getSiteSettings()]);
  if (!coach) notFound();

  return (
    <>
      <SiteHeader menuColor="dark" />
      <main>
        <CoachProfile coach={coach} otherCoaches={otherCoaches} />
        <SectionRenderer sections={settings?.coachPageSections} />
      </main>
    </>
  );
}
