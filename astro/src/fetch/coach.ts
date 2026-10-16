import { client } from "@/lib/sanity";
import type { CoachCardData, CoachData } from "@/types";
import { imageFields } from "./fragments";
import { coachCardFields } from "./sections/coaches";

export async function getCoach(slug: string) {
  return client.fetch<CoachData | null>(
    `*[_type == "coach" && slug.current == $slug][0]{
      ${coachCardFields},
      summary,
      bio,
      specialties,
      stats[]{ _key, value, label },
      achievements,
      image{ ${imageFields} }
    }`,
    { slug }
  );
}

export async function getOtherCoaches(slug: string) {
  return client.fetch<CoachCardData[]>(
    `*[_type == "coach" && slug.current != $slug] | order(_createdAt asc, _id asc)[0...3]{ ${coachCardFields} }`,
    { slug }
  );
}

export async function getCoachSlugs() {
  return client.fetch<string[]>(`*[_type == "coach" && defined(slug.current)].slug.current`);
}
