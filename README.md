# B2BGenerate — Performance-Based Cold Email Agency

A single-file landing page (`index.html`) for **B2BGenerate**, a performance-based
cold email agency headquartered in Sheridan, Wyoming, USA, serving B2B clients
worldwide. All copy is original, case studies/testimonials are fictional
placeholders, and visuals are CSS/SVG plus the supplied brand logo
(`assets/b2bgenerate-logo.png`) and generated social card (`assets/og-image.png`).

**Core positioning baked into the copy:** *If we don't produce leads, you don't pay.*
It appears in the hero, service cards, about section, guarantee banner, FAQ #4 and
the final CTA — keep these consistent if you reword it.

**Live:** https://jimmybbk.github.io/b2bgenerate/ · Repo: `jimmybbk/b2bgenerate`
(GitHub Pages, main branch). Any push to `main` redeploys automatically in ~1 minute.

## Brand colors (sampled directly from the logo PNG)

| Token | Value | Use |
|---|---|---|
| Background | `#000009` / `#010409` | Dark sections, header, footer |
| Primary blue | `#0097FA` | Buttons, links, accents |
| Gradient light | `#02AAFD` | Gradient start (buttons, icons) |
| Gradient deep | `#054BBA` | Gradient end (guarantee icon) |
| Light accent | `#4FC3FF` | Accents on dark backgrounds |

## Integrations (the two things to wire up)

### 1. Form delivery — 2 minutes
In `index.html`, find `const FORM_ENDPOINT = ""` in the `<script>` block and paste
your endpoint, e.g. a Formspree address `https://formspree.io/f/xxxx` (free tier is
fine). Leads then POST to it; until you do, submissions fall back to opening the
visitor's email client addressed to `hello@b2bgenerate.com.au` — functional, but
check that inbox.

### 2. Booking calendar — 2 minutes
In the final CTA section (search `BOOKING CALENDAR`), replace the comment with your
Calendly or Cal.com inline embed (snippet included in the comment). Every "Book a
Call" button on the page anchors to that section.

## SEO in place

- Title "B2BGenerate | Cold Email Agency — No Leads, No Fee" + meta description
- Canonical, robots, theme-color, geo tags (all pointing at the live Pages URL —
  swap to your custom domain in these spots when you attach one)
- Open Graph + Twitter cards with a generated 1200×630 share image
  (`assets/og-image.png`, built from the logo)
- JSON-LD: `ProfessionalService` + `WebSite` (Wyoming address, hours, areaServed
  "Worldwide") and `FAQPage` mirroring all 9 visible FAQs
- `robots.txt` + `sitemap.xml` pointing at the live URL
- Semantic headings (single H1), SVG icons, alt text, width/height on images

**Next SEO step (needs your account):** add the site to Google Search Console and
submit `sitemap.xml`; add GA4 or Plausible + Microsoft Clarity for analytics.

## Placeholders still to replace

| Item | Current value | Where |
|---|---|---|
| Entity name | `B2BGenerate LLC` | Footer bottom (match exact registered name) |
| Address | "Sheridan, Wyoming, USA" (city only) | Footer, JSON-LD — add full registered address |
| Phone | `+61 466 554 433` (AU-format mobile, per your instruction) | Top bar, CTA, footer, mobile bar, JSON-LD — swap if you get a US number |
| Email | `hello@b2bgenerate.com.au` | Everywhere + form fallback |
| Case studies | 4 fictional examples (London/Austin/Singapore/Toronto) | `#results` — real, verifiable results only (FTC + state UDAP laws apply) |
| Testimonials | 3 fictional quotes | Testimonials section — real quotes with written consent |
| Blog links | `#resources` anchors | Write the 3 guides and link them |
| Pricing claim | "from US$2,500/month" | FAQ #3 — align with real pricing |
| Guarantee terms | "agreed lead target / that period" | Hero, trio disclaimer, banner, FAQ #4 — must match your actual contract |

## Compliance notes

- The compliance FAQ references CAN-SPAM, GDPR/PECR, CASL and Australia's Spam Act
  as the frameworks campaigns are designed around — have counsel review before launch.
- The hero dashboard shows illustrative data with a visible "example campaign"
  caption; keep that caption if you keep the mock.
- Case-study metrics must be real where published (FTC Act §5 / state UDAP statutes
  on deceptive representations).
