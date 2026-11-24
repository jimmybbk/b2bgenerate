# B2BGenerate — Performance-Based Cold Email Agency (multipage site)

A multipage static website for **B2BGenerate**, a performance-based cold email agency
headquartered in Sheridan, Wyoming, USA, working Thailand hours (ICT) and serving B2B
clients worldwide. All copy is original; case studies/testimonials are fictional
placeholders; visuals are CSS/SVG plus the supplied brand logo and generated share card.

**Core positioning:** *If we don't produce leads, you don't pay* — hero, service cards,
about, guarantee banner, FAQs and CTAs all carry it.

**Live:** https://b2bgenerate.com/ · Repo: `jimmybbk/b2bgenerate`
(GitHub Pages, main branch — pushes redeploy automatically in ~1 minute.)

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Home (served at `/`) — hero + guarantee, service trio, why-us, testimonials, full FAQ (9) |
| `services/index.html` | Capabilities (copywriting/setup/management/LinkedIn) + 6-step process |
| `pricing/index.html` | Engagements + pricing FAQ subset + guarantee fine print |
| `results/index.html` | Case studies + testimonials |
| `about/index.html` | Story, stats, where we work |
| `blog/index.html` | Resource guides (stubs marked "Coming soon") |
| `contact/index.html` | Campaign plan form, WhatsApp/booking options, calendar slot |
| `privacy/index.html` | Privacy Policy (noindex) — template, needs legal review |
| `terms/index.html` | Terms & Conditions (noindex) — template, needs legal review |
| `sitemap/index.html` | Human-readable page directory (XML sitemap for search engines is separate) |

Shared code: `css/styles.css`, `js/main.js`. The XML sitemap lists every page.

**Clean URLs:** each subpage lives in its own folder (`services/index.html` served at `/services/`), so URLs have no `.html`. Internal links and canonicals are slash-free (e.g. `../contact`); GitHub Pages adds an automatic redirect back to the trailing-slash form on github.io URLs.

## Contact model (as requested)

- **No phone or email displayed anywhere** — the only number on the site is the
  WhatsApp number, shown in WhatsApp contexts.
- **WhatsApp widget** floats on every page (bottom-right, green) →
  `https://wa.me/61450463767` with a prefilled intro message. Also linked in the
  topbar footer contact column, final CTAs, and the mobile sticky bar.
- **All form submissions auto-send to `hello@b2bgenerate.com`** — `FORM_ENDPOINT` in
  `js/main.js` posts to FormSubmit (`https://formsubmit.co/ajax/hello@b2bgenerate.com`),
  which emails every submission directly: no mail popup for the visitor. **One-time
  activation:** the first submission makes FormSubmit send a verification link to that
  inbox — click it once and delivery is live. The mailbox must exist on the
  b2bgenerate.com domain.
- **Hours shown as Mon–Fri, 9am–5pm Thailand time (ICT)** on every page and in the
  hero dashboard mock.

## Booking calendar (2-minute upgrade)

In `contact/index.html`, search `BOOKING CALENDAR` and replace the comment with your
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
| Case studies | 4 fictional examples | `results/index.html` — real, verifiable results only |
| Testimonials | 3 fictional quotes | `results/index.html` + home — real quotes with consent |
| Blog | 2 live guides + 1 "Coming soon" stub | `blog/index.html` + article folders |
| Pricing claim | "from US$2,500/month" | FAQ + pricing page — align with real terms |
| Guarantee terms | "agreed lead target / that period" | Must match the actual service contract |
| Form endpoint | FormSubmit configured → `hello@b2bgenerate.com` | Click the activation link in that inbox once (sent on first submission) |

## Interactive features

- **Lead calculator** (home): sliders model replies, positive replies and booked meetings per
  month; CTA links to the contact form. Illustrative benchmarks, labeled on-page.
- **Testimonial carousel** (home): auto-rotates every 6s with arrows and dots, pauses on hover.
- **Animated counters + dashboard bars** animate when scrolled into view.
- **Rotating hero headline** (typewriter cycle through four phrases).
- **FAQ live search** (home) filters questions while typing.
- **WhatsApp mini-chat panel** (every page): the floating button opens a panel with
  quick-topic buttons that deep-link into WhatsApp.
- **Scroll progress bar, back-to-top button, button ripples** sitewide.
- All motion respects `prefers-reduced-motion`; the site stays fully functional without JavaScript.

## Compliance notes

- **`privacy/index.html` and `terms/index.html` are original templates written for this business
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
