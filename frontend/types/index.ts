// ── Shared ────────────────────────────────────────────────────────────────────

export type SanityImage = {
  asset?: { _ref: string };
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
  lqip?: string;
  _key?: string;
};

export type LinkData = {
  label?: string;
  href?: string;
};

export type StatData = {
  _key: string;
  value: string;
  label: string;
};

// ── Documents ─────────────────────────────────────────────────────────────────

export type CoachCardData = {
  _id: string;
  name: string;
  slug: string;
  role?: string;
  image?: SanityImage;
};

export type CoachData = CoachCardData & {
  summary?: string;
  bio?: PortableTextBlock[];
  specialties?: string[];
  stats?: StatData[];
  achievements?: string[];
};

export type TestimonialData = {
  _id: string;
  name: string;
  role?: string;
  quote: string;
  image?: SanityImage;
};

export type FaqData = {
  _id: string;
  question: string;
  answer: string;
};

export type ProductData = {
  _id: string;
  name: string;
  category?: string;
  price?: string;
  badge?: string;
  image?: SanityImage;
  url?: string;
};

// Minimal Portable Text block shape (rendered with @portabletext/react)
export type PortableTextBlock = {
  _key: string;
  _type: string;
  children?: { _key: string; _type: string; text?: string; marks?: string[] }[];
  style?: string;
  markDefs?: unknown[];
};

// ── Sections ──────────────────────────────────────────────────────────────────

type SectionBase = { _key: string; anchor?: string };

export type HeroSectionData = SectionBase & {
  _type: "heroSection";
  backgroundImage?: SanityImage;
  backgroundVideo?: { url: string; mimeType?: string } | null;
  phoneLabel?: string;
  phoneNumber?: string;
  heading: string;
  button?: LinkData;
  cardAvatars?: SanityImage[];
  cardText?: string;
  cardImage?: SanityImage;
  cardVideo?: { url: string; mimeType?: string } | null;
};

export type PageHeroSectionData = SectionBase & {
  _type: "pageHeroSection";
  backgroundImage?: SanityImage;
  eyebrow?: string;
  heading: string;
  text?: string;
  button?: LinkData;
};

export type FeatureSplitSectionData = SectionBase & {
  _type: "featureSplitSection";
  mainImage?: SanityImage;
  heading: string;
  text?: string;
  gallery?: SanityImage[];
  button?: LinkData;
  flip?: boolean;
};

export type ImageCarouselSectionData = SectionBase & {
  _type: "imageCarouselSection";
  heading: string;
  button?: LinkData;
  images?: SanityImage[];
};

export type TestimonialsSectionData = SectionBase & {
  _type: "testimonialsSection";
  heading: string;
  testimonials: (TestimonialData | null)[];
};

export type CtaSectionData = SectionBase & {
  _type: "ctaSection";
  heading?: string;
  floatingImages?: SanityImage[];
  bannerImage?: SanityImage;
  button?: LinkData;
};

export type IntroSectionData = SectionBase & {
  _type: "introSection";
  eyebrow?: string;
  heading: string;
  body?: string[];
  button?: LinkData;
  images?: SanityImage[];
};

export type StatsSectionData = SectionBase & {
  _type: "statsSection";
  heading?: string;
  stats?: StatData[];
};

export type CardData = {
  _key: string;
  image?: SanityImage;
  label?: string;
  title: string;
  text?: string;
  link?: LinkData;
};

export type CardsSectionData = SectionBase & {
  _type: "cardsSection";
  heading: string;
  text?: string;
  cards?: CardData[];
  columns?: 2 | 3 | 4;
};

export type CoachesSectionData = SectionBase & {
  _type: "coachesSection";
  heading: string;
  text?: string;
  coaches: (CoachCardData | null)[];
  button?: LinkData;
};

export type PlanData = {
  _key: string;
  name: string;
  price: string;
  period?: string;
  description?: string;
  features?: string[];
  button?: LinkData;
  featured?: boolean;
  badge?: string;
};

export type PricingSectionData = SectionBase & {
  _type: "pricingSection";
  heading: string;
  text?: string;
  plans?: PlanData[];
  note?: string;
};

export type FaqSectionData = SectionBase & {
  _type: "faqSection";
  heading: string;
  text?: string;
  button?: LinkData;
  faqs: (FaqData | null)[];
};

export type ProductsSectionData = SectionBase & {
  _type: "productsSection";
  heading: string;
  text?: string;
  products: (ProductData | null)[];
};

export type ContactItemData = {
  _key: string;
  label: string;
  value: string;
  href?: string;
};

export type BookingSectionData = SectionBase & {
  _type: "bookingSection";
  heading: string;
  text?: string;
  services?: string[];
  buttonLabel?: string;
  image?: SanityImage;
  contactItems?: ContactItemData[];
};

export type PageSection =
  | HeroSectionData
  | PageHeroSectionData
  | FeatureSplitSectionData
  | ImageCarouselSectionData
  | TestimonialsSectionData
  | CtaSectionData
  | IntroSectionData
  | StatsSectionData
  | CardsSectionData
  | CoachesSectionData
  | PricingSectionData
  | FaqSectionData
  | ProductsSectionData
  | BookingSectionData;

// ── Pages & settings ──────────────────────────────────────────────────────────

export type MenuColor = "light" | "dark";

export type PageData = {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
  menuColor?: MenuColor;
  sections?: PageSection[];
};

export type FooterColumn = { _key: string; links?: (LinkData & { _key: string })[] };

export type SiteSettings = {
  siteName?: string;
  description?: string;
  navLinks?: (LinkData & { _key: string })[];
  navButton?: LinkData;
  newsletterHeading?: string;
  newsletterPlaceholder?: string;
  newsletterButton?: string;
  footerColumns?: FooterColumn[];
  contactEmail?: string;
  copyright?: string;
  coachPageSections?: PageSection[];
};
