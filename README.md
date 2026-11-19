# B2BGenerate — Performance-Based Cold Email Agency (AU)

A single-file landing page (`index.html`) for **B2BGenerate**, an Australian
performance-based cold email agency. Structure is modeled on a standard B2B agency
one-pager; all copy is original, case studies/testimonials are fictional placeholders,
and all visuals are CSS/SVG plus the supplied brand logo (`assets/b2bgenerate-logo.png`).

**Core positioning baked into the copy:** *If we don't produce leads, you don't pay.*
The guarantee appears in the hero, service cards, about section, a dedicated guarantee
banner, FAQ #4 and the final CTA — keep these consistent if you reword it.

## Brand colors (sampled directly from the logo PNG)

| Token | Value | Use |
|---|---|---|
| Background | `#000009` / `#010409` | Dark sections, header, footer |
| Primary blue | `#0097FA` | Buttons, links, accents |
| Gradient light | `#02AAFD` | Gradient start (buttons, icons) |
| Gradient deep | `#054BBA` | Gradient end (guarantee icon) |
| Light accent | `#4FC3FF` | Accents on dark backgrounds |
| White | `#F6F7F8` | Logo wordmark |

## SEO in place

- Title + meta description targeting "performance-based cold email agency Australia"
- Canonical, robots, theme-color, geo tags (canonical URL is a **placeholder**)
- Open Graph + Twitter card tags (og:image → logo)
- JSON-LD: `ProfessionalService` + `WebSite` (with AU address, opening hours, areaServed)
- JSON-LD `FAQPage` mirroring all 9 visible FAQ items
- `robots.txt` + `sitemap.xml` (domain placeholders — update both)
- Semantic headings (single H1), descriptive alt text, `width`/`height` on images

## Deploying

The folder is fully static — deploy `index.html` + `assets/` to any static host
(Netlify, Vercel, Cloudflare Pages). Google Fonts load from a CDN; the page degrades
gracefully to system fonts offline.

## Placeholders to replace before launch

| Item | Current value | Location |
|---|---|---|
| Canonical + og:url | `https://jimmybbk.github.io/b2bgenerate/` (live Pages URL) | `<head>`, JSON-LD, robots.txt, sitemap.xml — swap all four when you attach a custom domain |
| Phone | `+61 466 554 433` (mobile) | Top bar, final CTA, footer, mobile bar, JSON-LD |
| Email | `hello@b2bgenerate.com.au` | Top bar, final CTA, footer, mobile bar, JSON-LD |
| Address | Level 9, 100 Market Street, Sydney NSW 2000 | Footer, JSON-LD |
| ABN | `00 000 000 000` | Footer bottom |
| Case studies | 4 fictional examples | `#results` — replace with real, verifiable results (Australian Consumer Law applies) |
| Testimonials | 3 fictional quotes | Testimonials section — real quotes with written consent |
| Forms | Front-end stubs | Wire `#planForm` and `#footerForm` to your CRM (marked in JS) |
| Blog links | `#resources` anchors | Point to real articles |
| Pricing claim | "from A$2,500/month" | FAQ #3 — align with your real terms |
| Guarantee terms | "agreed lead target / that period" | Hero, trio disclaimer, guarantee banner, FAQ #4 — align with your actual service agreement |

## Compliance notes

- FAQ #7 references the Spam Act 2003 and Privacy Act 1988 — have your wording legally
  reviewed before publishing; it is not legal advice.
- The performance guarantee must match what your service contract actually offers,
  otherwise it risks being a misleading claim under Australian Consumer Law.
