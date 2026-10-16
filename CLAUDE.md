# RAYSO Template – Claude Instructions

Monorepo (npm workspaces): `frontend/` (Next.js App Router, Tailwind v4, GSAP)
and `studio/` (Sanity). Dependencies install at the repo root (`npm install`
from the root); `npm run dev` there starts both apps. Setup and deployment for
a fresh copy are in `README.md`.

`astro/` is an Astro port of `frontend/` with the same design, sections and
Sanity queries (`astro/src/`: `pages/`, `components/sections/*.astro`,
interactive parts as React islands in `components/islands/`, animations in
`scripts/motion.ts` driven by `components/animation/*.astro`). A change to a
section in one app usually needs the same change in the other; ask which app
the user works in if it's unclear. Paths below refer to `frontend/`.

**If `MAINTAINER.md` exists, read it too.** It holds the template author's notes
(demo project, release process, open items) and isn't shipped to buyers.

## Your job
Build front-end UI from Figma designs: markup, styling, responsiveness,
and the Sanity wiring for content. Do NOT write business logic, form
submission, email, auth, or integrations. Leave `// TODO(dev):` markers there.

## Design system
- All tokens live in the `@theme` block of `frontend/app/globals.css`
  (Tailwind v4). Use them as utilities (`bg-primary-600`, `text-sm`). Spacing
  uses Tailwind's 4px scale (`gap-38`, `max-w-106` are fine).
- Fonts are loaded in `app/layout.tsx` as CSS variables (e.g. `--font-inter`);
  apply them with `font-(family-name:--font-inter)` unless a font token exists.
- Never hardcode colors, font sizes, radii, or spacing. If a Figma value
  has no matching token, use the closest one and list it in your summary.
  Huge display text that scales with the screen (`text-[18vw]`) is the
  accepted exception; list it too.
- Do not add new tokens without asking.

## Where things go
- Page sections → `frontend/components/sections/<Name>Section.tsx`
- Section registry → `frontend/components/sections/SectionRenderer.tsx`
- Reusable UI (buttons, cards, inputs) → `components/ui/`
- SVG icons → `components/icons/` (never inline in sections). Logos use
  `fill="currentColor"` so one icon works on light and dark backgrounds.
- Animations → `components/animation/` (GSAP helpers). See **Scrolling**.
- Navbar/Footer/shared page renderer → `components/layout/`
- Templates for document pages (blog post, project) → `components/<doc>/`
- Section GROQ fragments → `(core)/fetch/sections/<name>.ts`
- Page queries → `(core)/fetch/page.ts`; other documents → `(core)/fetch/<doc>.ts`;
  Site settings → `(core)/fetch/siteSettings.ts`; Sanity client + `urlFor` →
  `(core)/sanity/lib/`
- Helpers (date formatting, link builders) → `(core)/lib/`
- Types → `types/index.ts`
- Section schemas → `studio/schemaTypes/sections/`, listed in `sections/index.ts`
- Document schemas → `studio/schemaTypes/documents/`; reusable objects →
  `studio/schemaTypes/objects/`; shared fields → `studio/schemaTypes/fields/`

## Template inventory
Kept up to date by `/build-section`. Check it before building anything new.

### Pages and routes
| URL | Route file | Content |
|---|---|---|
| `/` | `app/page.tsx` | page `_id: "home"` |
| `/<slug>` | `app/[slug]/page.tsx` | any page under "Other pages" (`/about`, `/pricing`, `/shop`, `/book`) |
| `/coaches` | `app/coaches/page.tsx` | page with slug `coaches` (shared page renderer) |
| `/coaches/<slug>` | `app/coaches/[slug]/page.tsx` | `coach` document → `components/coach/CoachProfile.tsx`, then Site settings → "Sections under every coach page" |

A listing page whose items get their own pages (e.g. `/journal` and
`/journal/<post>`) needs its own folder: a static folder beats `[slug]`. Render
the listing through the shared page renderer, and keep the base path in
`(core)/lib/routes.ts` with a link builder (`postHref()`).

### Section catalogue
| Studio title | `_type` | Notes |
|---|---|---|
| Hero | `heroSection` | Home h1. Full-viewport (`h-dvh`) photo or looping background video (`backgroundVideo`, photo = poster/reduced-motion fallback), phone pill, white card (avatars, text, photo + optional play video) hanging below on desktop |
| Page title | `pageHeroSection` | Inner-page h1. Photo banner with label pill, title, intro, button. Full-bleed |
| Feature with gallery | `featureSplitSection` | Large photo + heading + 2-photo slider with round arrows (`FeatureGallery`, client). `flip` swaps sides |
| Story | `introSection` | Label pill, heading left, paragraphs right, up to 3 photos (wide/tall/square) |
| Numbers | `statsSection` | Big figures in white cards (`stat` objects) |
| Cards | `cardsSection` | Programs, values, benefits. Optional photo, label, link per card; 2–4 columns. Without a photo the label shows as a big grey number |
| Coaches | `coachesSection` | References `coach` (empty = all). Cards link to `/coaches/<slug>` |
| Photo carousel | `imageCarouselSection` | White band, centred heading, curved 3D row (`CurvedCarousel`, client, autoplay) |
| Pricing | `pricingSection` | Inline plan objects; `featured` plan renders black |
| Products | `productsSection` | References `product` (empty = all). Category filter chips (`ProductGrid`, client) |
| Testimonials | `testimonialsSection` | References `testimonial` (empty = all). Progress bar + one quote at a time (`TestimonialSlider`, client) |
| FAQ | `faqSection` | References `faq` (empty = all). Animated accordion, one open at a time (`FaqAccordion`, client), sticky heading |
| Booking form | `bookingSection` | Form UI (`BookingForm`, client) + black contact card. Submission is a `TODO(dev)` |
| Call to action | `ctaSection` | Heading with 3 floating photos (centre one star-shaped), then full-width photo banner with a big pill link |

### Reusable components
| Folder | Components |
|---|---|
| `components/ui/` | `Button` (pill link: black / white / outline-light / outline-dark; `buttonClasses` + `ButtonLabel` give plain `<button>`s the same rolling-label hover), `SliderButton` (round prev/next arrow with fill-on-hover; use for every slider), `SanityImage` (fill + hotspot + LQIP), `SectionHeader` (h2 left, intro right), `Pill`, `CoachCard`, `StarImage` + `ShapeDefs` (Figma clip paths: star mask, hero card notch) |
| `components/icons/` | `index.tsx`: Phone, Play, PlayCircle, ChevronLeft/Right, ArrowUpRight, Quote, Sparkle (4-point star), Check, Plus, Menu, Close — shapes copied from the Figma SVGs |
| `components/animation/` | `SmoothScroll` (Lenis on GSAP's ticker, in `app/layout.tsx`), `Reveal` (fade-up or `variant="clip"` window reveal; `stagger`), `SplitHeading` (word-by-word h1), `Parallax`, `CountUp`, `Magnetic`, `useSwipe`, `useInView` |
| `components/layout/` | `SiteHeader` (server) → `HeaderBar` (client: transparent over photos, light bar once scrolled, full-screen mobile menu), `Footer` + `NewsletterForm`, `PageRenderer` |

### Reference implementation
- Text section: **Numbers** — `studio/schemaTypes/sections/statsSection.ts`,
  `(core)/fetch/sections/stats.ts`, `StatsSectionData` in `types/index.ts`,
  `components/sections/StatsSection.tsx`.
- Image + references: **Coaches** — `coachesSection.ts`, `(core)/fetch/sections/coaches.ts`
  (the `select(count(x) > 0 => x[]->…, *[_type == …])` "empty = all" pattern),
  `CoachesSection.tsx` (filters `null` references).
- Images: always `SanityImage` inside a `relative` box with an aspect ratio;
  project images with `imageFields` from `(core)/fetch/fragments.ts`.
- Headings: `text-4xl font-medium md:text-5xl lg:text-heading` (60/70px, from
  Figma), or `SectionHeader`. No letter-spacing. White cards: `rounded-card bg-white`
  (30px); photo cards inside them use `p-2.5` and `rounded-card` photos.
- Section spacing is `my-20 md:my-35` (140px in the Figma frame).
- Photos placed with a specific framing in Figma get a Sanity **crop** (not just
  a hotspot) so the site shows the same window; `urlFor` turns it into `rect=`.

## Content model (page builder)
Sections are **not** documents. A section is a Sanity `object` type that
editors add, remove and reorder inside a page:

```
page (document)          → title, slug, menuColor, sections[]
└─ sections[]            → heroSection | aboutSection | …   (object types)
    └─ portfolioSection.projects[] → reference → project (document)
```

- The home page is the fixed document `_id: "home"`, pinned as "Home page"
  in the Studio sidebar (`studio/structure.ts`). Other pages sit under
  "Other pages".
- Each page picks its **Menu text colour** (`menuColor`: "light" = white text
  over a dark hero, "dark" = black). Pages render `<SiteHeader menuColor>`;
  the footer stays in `app/layout.tsx`.
- Inner pages start with a page-title section, which is their h1. The hero is
  the h1 on the home page.
- Site-wide content lives in the **Site settings** singleton (`_id: "siteSettings"`),
  not in page sections: the navbar menu, the footer, and sections shown under
  every document page (e.g. an FAQ under each blog post).
- Menu links use page paths (`/about`) or `/<page>#anchor` (e.g.
  `/about#awards`) so they work from every page.
- Every section schema must be editor-friendly: a `title` users recognize
  ("Hero", "About"), an icon from `@sanity/icons`, a plain-English
  `description` on each field that says where it appears on the page, and a
  `preview` whose subtitle is the section name.
- Images use `options: { hotspot: true }` and a required `alt` field. Apply the
  hotspot in the component with `objectPosition`.
- Videos are Sanity file uploads (`type: "file"`, `accept: "video/mp4,video/webm"`),
  never files in `public/`, paired with an image used as the poster. Fetch
  `"video": video.asset->{ url, mimeType }`. Upload local files with a
  `npx sanity exec <script> --with-user-token` script
  (`client.assets.upload("file", …)`).
- Every section schema ends its `fields` with the shared `anchorField`
  (`schemaTypes/fields/anchor.ts`) so menu links like `#work` can target it.
  `SectionRenderer` turns it into the wrapper `id`.
- Short repeating text (tags, roles) → `array` of `string`; repeating
  groups (links, cards) → `array` of inline `object` with a `preview`.
- Items that could appear in more than one place or later get their own
  page (projects, posts, FAQs, testimonials, team members) → their own
  **document type** in `schemaTypes/documents/`, picked in the section with
  an `array` of `reference` (empty = show all). Add a sidebar list for it in
  `studio/structure.ts` and dereference it in the GROQ fragment
  (`projects[]->{ ... }`); filter out `null` (unpublished references) in the
  component. Publish referenced documents before the page that uses them.
- Long-form bodies (posts, case studies) are Portable Text plus layout blocks
  (`objects/`). Share one body renderer between document types so a new
  block works everywhere.
- Store text in normal case; apply `uppercase` etc. in the component.

## Spacing between sections
- Sections on the page background space themselves with **margin, not
  padding** (e.g. `my-20 md:my-28` on the `<section>`). Vertical margins
  collapse, so two sections in a row get one gap, not two. Never use `py-*`
  for the outer spacing of a section.
- Full-bleed sections (images, videos, logo walls, tickers) have no outer spacing.
- Page-top sections keep top **padding** for the space under the menu.
- The footer uses `mt-*` on top (merges with the last section) and `pb-*`.
- Don't put sections inside a flex/grid parent; margins don't collapse there.

## Scrolling
- Smooth scrolling, if the template has it, is Lenis mounted once in
  `app/layout.tsx` (a `SmoothScroll` client component) on GSAP's ticker so
  ScrollTrigger stays in sync. Don't add `scroll-smooth` or another scroll
  library. Use `data-lenis-prevent` on elements with their own scrolling.
- Never put a CSS `transition` on transform/translate on an element GSAP animates
  (e.g. a `Reveal stagger` child): GSAP reads the half-transitioned value and the
  element stays offset. Put hover lifts on an inner wrapper instead.
- Scroll-linked animations use GSAP ScrollTrigger inside `gsap.matchMedia()`
  with `(prefers-reduced-motion: no-preference)` and clean up with `mm.revert()`.
- Effects where later sections slide over a pinned one require every section
  to have an opaque background.

## Building a section (what `/build-section <figma-url>` does)
1. Fetch design context + screenshot from Figma. Split the frame into
   editable content (→ schema fields) and fixed decoration (→ code/icons).
2. Check the **Template inventory** and reuse or extend before creating
   (e.g. add a size option to an existing title section instead of a new one).
3. Schema: `studio/schemaTypes/sections/<name>Section.ts` (`type: "object"`),
   then add it to `sectionTypes` in `sections/index.ts`. That registers it
   and adds it to every section picker automatically.
4. GROQ: export `<name>SectionFields` from `(core)/fetch/sections/<name>.ts`
   and add a `_type == "<name>Section" => { ... }` line to `sectionsProjection`
   in `(core)/fetch/sections/index.ts` (used by pages and Site settings).
5. Type: `<Name>SectionData` with `_type` + `_key` in `types/index.ts`, and
   add it to the `PageSection` union.
6. Component: `components/sections/<Name>Section.tsx` taking the type as
   props, then add a `case` in `SectionRenderer.tsx`.
7. Deploy the schema (see Sanity below), then seed the Figma content into
   the page it belongs to and publish it.
8. Run lint + typecheck and check the page renders on the dev server.
9. Update the **Template inventory** (catalogue, routes, components).

A whole page link works the same way: run `get_metadata` on the page frame to
list its sections, reuse existing ones, build the missing ones, then create the
`page` document with all sections in order.

## Rules for every section
1. Server component by default; add "use client" only when needed (GSAP, state).
2. Mobile-first. Implement all breakpoints, even if Figma only shows desktop:
   stack on mobile, sensible tablet layout.
3. Content comes from Sanity via props. Nothing editable is hardcoded.
4. Use next/image with the image builder (`urlFor`) for Sanity images.
5. Semantic HTML: one h1 per page; every other section uses h2 for its
   heading. Alt text comes from Sanity.
6. Content width: `mx-auto max-w-site px-4 md:px-8 lg:px-13` (the 1440px Figma frame with
   52px side margins) so sections line up.
7. Outer spacing: margins, per **Spacing between sections**.

## Figma
- Use the Figma MCP tools. Asset URLs from `get_design_context` expire after
  7 days; when uploading them to Sanity, keep the `.png`/`.svg` extension.
- Starter-plan seats hit a tool-call limit quickly. If a call says "tool call
  limit", stop retrying (other files and teams fail too) and ask the user for a
  2x PNG export of the frame plus its photos, then build from those and list
  every estimated size.

## Sanity
- The project ID and dataset come from `studio/.env.local` and
  `frontend/.env.local` (templates in `.env.example`). Never hardcode them in
  code or write them into any `.md` file; they differ per project. When an MCP
  tool needs the project ID, read it from `studio/.env.local`.
- The website refreshes from Sanity at most once a minute
  (`export const revalidate = 60` in `app/layout.tsx`).
- After changing schemas, deploy from `studio/`:
  `npx sanity manifest extract && npx sanity schema deploy`.
  Don't use the MCP `deploy_schema` tool; this repo has a local Studio.
- Seed or edit content with the Sanity MCP tools, then publish it. Before
  patching, check for an existing draft (`drafts.<id>`); if one exists, compare
  it with the published version first. Use `ifRevisionId` on patches.
- Upload images with `dataset_assets_upload_from_url`, about three at a time,
  then poll `assets_upload_status`.

## Known TODOs
- `components/sections/BookingForm.tsx`: send the booking request (route
  handler + Resend, or your booking system's API). It currently shows a
  thank-you message only.
- `components/layout/NewsletterForm.tsx`: send the email to your newsletter
  provider.
- Products link to their `url` field (your online store) or `/book`; there is
  no cart or checkout.
- The same two forms in the Astro version: `astro/src/components/islands/`.

## Done means
- `npm run lint` and `npx tsc --noEmit` pass in `frontend/` (and `npx tsc --noEmit`
  in `studio/` after schema changes); `npm run build` passes before a release
- In `astro/`: `npm run build` passes (it runs `astro check` first)
- The changed pages return 200 on the dev server (localhost:3000, or
  localhost:4321 for Astro)
- CLAUDE.md is updated when you add a section, route, pattern or convention.
  It ships to buyers, so keep it free of personal IDs, emails and seller notes
  (those go in `MAINTAINER.md`)
- Summary lists: files created, tokens with no match, TODOs left for the dev
