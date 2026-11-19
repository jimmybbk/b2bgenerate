# B2BGenerate — Performance-Based Cold Email Agency (multipage site)

A multipage static website for **B2BGenerate**, a performance-based cold email agency
headquartered in Sheridan, Wyoming, USA, working Thailand hours (ICT) and serving B2B
clients worldwide. All copy is original; case studies/testimonials are fictional
placeholders; visuals are CSS/SVG plus the supplied brand logo and generated share card.

**Core positioning:** *If we don't produce leads, you don't pay* — hero, service cards,
about, guarantee banner, FAQs and CTAs all carry it.

**Live:** https://jimmybbk.github.io/b2bgenerate/ · Repo: `jimmybbk/b2bgenerate`
(GitHub Pages, main branch — pushes redeploy automatically in ~1 minute.)

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Home — hero + guarantee, service trio, why-us, testimonials, full FAQ (9) |
| `services.html` | Capabilities (copywriting/setup/management/LinkedIn) + 6-step process |
| `pricing.html` | Engagements + pricing FAQ subset + guarantee fine print |
| `results.html` | Case studies + testimonials |
| `about.html` | Story, stats, where we work |
| `blog.html` | Resource guides (stubs marked "Coming soon") |
| `contact.html` | Campaign plan form, WhatsApp/booking options, calendar slot |
| `privacy.html` | Privacy Policy (noindex) — template, needs legal review |
| `terms.html` | Terms & Conditions (noindex) — template, needs legal review |
| `sitemap.html` | Human-readable page directory (XML sitemap for search engines is separate) |

Shared code: `css/styles.css`, `js/main.js`. Sitemap lists all 7 pages.

## Contact model (as requested)

- **No phone or email displayed anywhere** — the only number on the site is the
  WhatsApp number, shown in WhatsApp contexts.
- **WhatsApp widget** floats on every page (bottom-right, green) →
  `https://wa.me/61466554433` with a prefilled intro message. Also linked in the
  topbar footer contact column, final CTAs, and the mobile sticky bar.
- **All form submissions route to `wayne.clothier@hotmail.com`** — see
  `LEAD_EMAIL` in `js/main.js`. Until a form endpoint is configured, submissions
  fall back to opening the visitor's email client addressed there. To upgrade,
  paste a Formspree/Basin endpoint into `FORM_ENDPOINT` in the same file.
- **Hours shown as Mon–Fri, 9am–5pm Thailand time (ICT)** on every page and in the
  hero dashboard mock.

## Booking calendar (2-minute upgrade)

In `contact.html`, search `BOOKING CALENDAR` and replace the comment with your
Calendly or Cal.com inline embed (both snippets are in the comment). "Book a Call"
buttons currently route to the contact page form + WhatsApp.

## SEO in place

- Per-page titles/descriptions, canonical + og:url per page (all pointing at the live
  Pages URL — swap to your custom domain in these spots when you attach one)
- Open Graph/Twitter cards with generated 1200×630 share image (`assets/og-image.png`)
- JSON-LD: `ProfessionalService` + `WebSite` (home), `FAQPage` on home (9 Q&As) and
  pricing (4 Q&As), each mirroring that page's visible content
- Semantic headings, SVG icons, alt text, sitemap + robots.txt
- `llms.txt` at the site root: LLM-friendly site summary (linked from every footer)

**Next SEO step (needs your accounts):** Google Search Console + sitemap submit;
GA4/Plausible + Microsoft Clarity.

## Placeholders still to replace

| Item | Current value | Where |
|---|---|---|
| Entity name | `B2BGenerate LLC` | Footer bottom on every page |
| Address | "Sheridan, Wyoming, USA" (city only) | Footer/contact page/JSON-LD |
| Case studies | 4 fictional examples | `results.html` — real, verifiable results only |
| Testimonials | 3 fictional quotes | `results.html` + home — real quotes with consent |
| Blog | 3 "Coming soon" stubs | `blog.html` |
| Pricing claim | "from US$2,500/month" | FAQ + pricing page — align with real terms |
| Guarantee terms | "agreed lead target / that period" | Must match the actual service contract |
| Form endpoint | `""` (mailto fallback to wayne.clothier@hotmail.com) | `js/main.js` `FORM_ENDPOINT` |

## Compliance notes

- **`privacy.html` and `terms.html` are original templates written for this business
  — have a lawyer review them before relying on them.** They are drafted for a
  Wyoming LLC with worldwide clients (CAN-SPAM, GDPR/PECR, CASL and Australia's
  Spam Act referenced). Entity name, registered address and governing-law details
  are placeholders. Both pages are `noindex` for search engines.
- The compliance FAQ references CAN-SPAM, GDPR/PECR, CASL and Australia's Spam Act
  as the frameworks campaigns are designed around — have counsel review before launch.
- The hero dashboard shows illustrative data with a visible "example campaign"
  caption; keep that caption if you keep the mock.
- Case-study metrics must be real where published (FTC Act §5 / state UDAP statutes
  on deceptive representations).

## Local preview

Run `python -m http.server 8123` from this folder and open
http://127.0.0.1:8123 (opening `index.html` directly also works).
