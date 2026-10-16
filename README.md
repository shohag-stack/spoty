# Spoty

A tennis club and sports academy website: coaching, programs, memberships,
a pro shop and appointment booking.

Built with **Next.js**, **Tailwind CSS v4**, **GSAP** animations and a
**Sanity** content studio. Every page is built from sections you can add,
remove and reorder, with no code needed.

```
frontend/   the website (Next.js)
astro/      the same website built with Astro (pick one, see "Astro version")
studio/     the content editor (Sanity Studio)
seed/       demo content: pages, coaches, products, images and videos
```

## What you need

- [Node.js](https://nodejs.org) 20.9 or newer, with npm
- A free [Sanity](https://www.sanity.io) account
- A free [Vercel](https://vercel.com) account to put the site online

## 1. Install

From this folder:

```bash
npm install
```

## 2. Create your Sanity project

```bash
cd studio
npx sanity login
npx sanity init --bare
cd ..
```

Pick **Create new project**, name it, and create a dataset called
`production` with **Public** visibility. Note the **project ID** it prints.

## 3. Add your project ID

Copy the two example env files and put your project ID in both:

```bash
cp studio/.env.example studio/.env.local
cp frontend/.env.example frontend/.env.local
```

```bash
# studio/.env.local
SANITY_STUDIO_PROJECT_ID=abc123xy
SANITY_STUDIO_DATASET=production

# frontend/.env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xy
NEXT_PUBLIC_SANITY_DATASET=production
```

## 4. Load the demo content

```bash
npm run seed
```

This imports every page, coach, product, testimonial, FAQ, image and video
from the demo.
It takes a minute or two.

## 5. Run it

```bash
npm run dev
```

- Website: <http://localhost:3000>
- Studio (content editor): <http://localhost:3333>

If the Studio says the origin isn't allowed, open
[sanity.io/manage](https://www.sanity.io/manage) → your project → **API** →
**CORS origins**, add `http://localhost:3333` and tick **Allow credentials**.

## Editing content

Everything on the site is edited in the Studio:

- **Home page** and **Other pages**: each page is a list of sections. Use
  **+ Add item** to add one, and drag to reorder. Each field says where it
  appears on the page.
- Content used in several places (coaches, products, FAQs…) has its own list in
  the sidebar; sections pick from it.
- **Site settings**: the menu, the footer, and other site-wide content.

Spoty's content types:

- **Coaches**: each coach gets a profile page at `/coaches/<url>` (portrait,
  intro, specialties, numbers, biography, highlights). The sections shown
  under every coach profile are set in **Site settings → Coach pages**.
- **Testimonials**, **FAQs** and **Products**: picked in the Testimonials,
  FAQ and Products sections. Leave a section's list empty to show them all.
- **Hero videos**: the Hero's *Background video* plays silently on a loop behind
  the headline (the background photo shows while it loads). Its *Card video*
  adds a play button to the photo in the white card.
- The booking form and newsletter only show a thank-you message until a
  developer connects them (see `CLAUDE.md` → Known TODOs).

## Put it online

**Studio**: host it free on Sanity:

```bash
npm run deploy:studio
```

**Website**: on Vercel:

1. Push this folder to a GitHub repository. `.env.local` files are
   git-ignored; keep them out of the repository.
2. In Vercel, **Add New → Project** and import the repository.
3. Set **Root Directory** to `frontend`.
4. Under **Environment Variables**, add `NEXT_PUBLIC_SANITY_PROJECT_ID` and
   `NEXT_PUBLIC_SANITY_DATASET` (same values as `frontend/.env.local`).
5. Deploy. Published Studio changes appear on the live site within about a
   minute; no redeploy needed.

## Astro version

`astro/` is the same website built with [Astro](https://astro.build) instead
of Next.js: same design, same sections, same Studio and content. Use whichever
you prefer; both read the same Sanity project. You can delete the folder you
don't use (and remove it from `workspaces` in the root `package.json`).

**Set up:** follow steps 1–4 above, then:

```bash
cp astro/.env.example astro/.env.local
```

```bash
# astro/.env.local
PUBLIC_SANITY_PROJECT_ID=abc123xy
PUBLIC_SANITY_DATASET=production
```

**Run it:** `npm run astro:dev` starts the Astro site
(<http://localhost:4321>) and the Studio together.

**Put it online (Vercel):** import the repository, set **Root Directory** to
`astro`, and add `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET`. Netlify
and Cloudflare Pages work the same way (build command `npm run build`, output
folder `dist`).

The Astro site is static: pages are built from your content at deploy time,
which makes it very fast and cheap to host. To publish Studio changes
automatically, create a **Deploy Hook** in Vercel (Project → Settings → Git),
then in [sanity.io/manage](https://www.sanity.io/manage) → your project →
**API** → **Webhooks**, add a webhook with that URL that fires on create, update
and delete. Every publish then rebuilds the site in about a minute.

Where things are in `astro/src/`:

- Pages and routes: `pages/` (`index.astro`, `[slug].astro`, `coaches/`)
- Sections: `components/sections/*.astro`
- Interactive parts (sliders, accordion, forms): `components/islands/*.tsx`,
  small React components that load only where they're used
- Scroll and hover animations: `scripts/motion.ts`, switched on by the
  components in `components/animation/`
- Colours and font sizes: the `@theme` block of `styles/global.css`
- Sanity queries: `fetch/`

## Customising the design

- Colours and font sizes live in the `@theme` block of
  `frontend/app/globals.css`.
- Sections are in `frontend/components/sections/`; their Studio fields are in
  `studio/schemaTypes/sections/`.
- `CLAUDE.md` describes the whole project for AI coding assistants. With
  [Claude Code](https://claude.com/claude-code), run
  `/build-section <figma-link>` to turn a Figma design into a new editable
  section.

## Useful commands

| Command | What it does |
|---|---|
| `npm run dev` | Website and Studio together |
| `npm run build` | Production build of the website |
| `npm run astro:dev` | Astro website and Studio together |
| `npm run astro:build` | Production build of the Astro website |
| `npm run seed` | Import the demo content (replaces matching documents) |
| `npm run deploy:studio` | Host the Studio on `<name>.sanity.studio` |
| `npm run deploy:schema` | Upload the content model to Sanity (only needed for Sanity's AI and dashboard tools) |

## License

This template is sold under a commercial license: one purchase covers one
website, for you or for one client. You can't resell or share the source
code. Full terms are in `LICENSE.txt`.
