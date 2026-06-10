# Esther Jolugba — Portfolio

A pixel-perfect, zero-config personal portfolio for a Senior Android Engineer.
Pure **HTML + CSS + vanilla JS**. No frameworks, no build step, no npm — it
deploys straight to GitHub Pages.

```
esther-portfolio/
├── index.html            # all markup + SEO/OG/JSON-LD
├── css/styles.css        # design system + every section + responsive + reduced-motion
├── js/
│   ├── apps.js           # projects shown inside the phone  ← edit content here
│   ├── focus.js          # the "Now" section — what you're currently building toward
│   ├── posts.js          # blog cards (+ optional Medium RSS)
│   ├── certificates.js   # certificates grid
│   ├── testimonials.js   # social-proof quotes (replace placeholders)
│   └── main.js           # all behavior (animations, phone, ⌘K palette, form, etc.)
├── assets/               # CV, photo, OG image (you add these)
├── robots.txt            # SEO
├── sitemap.xml           # SEO (update URL after deploy)
├── .nojekyll             # tells GitHub Pages to serve files as-is
└── README.md

## Signature interactions
- **⌘K / Ctrl+K command palette** — jump to any section, copy email, open links,
  download CV, toggle theme. Click the "Menu" pill in the nav or press the keys.
  (Edit the `COMMANDS` array in `js/main.js` to add more.)
- **Interactive phone** — tap an app icon to open the project inside the screen.
- **Scroll progress bar, custom cursor, 3D tilt** — desktop only, all disabled
  automatically under `prefers-reduced-motion`.
- **Console easter egg** — a message for recruiters who open DevTools.
```

---

## Edit content (no code knowledge needed)

### Add an app to the phone
Open [`js/apps.js`](js/apps.js) and append an object to the `APPS` array. The
grid paginates automatically (8 icons per page) and the detail screen builds
itself from your data:

```js
{
  id: "myapp",
  name: "My App",
  category: "Fintech · Android",
  accent: "#7c6bff",          // icon background color
  glyph: '<path d="..."/>',    // inline SVG path (24x24 viewBox)
  overview: "One short paragraph.",
  stack: ["Kotlin", "Compose"],
  highlights: ["Metric one", "Metric two"],
  link: "https://...",         // "Open project ↗" target
}
```
Need a glyph? Grab a 24×24 path from any icon set and paste just the `<path…>`.

### Add a blog post
Open [`js/posts.js`](js/posts.js), append to `POSTS`:

```js
{ title: "...", platform: "Medium", url: "https://...",
  date: "2025-10-01", readTime: "6 min read", excerpt: "..." }
```
**Optional live Medium feed:** set `MEDIUM_RSS` at the top of the file to
`"https://medium.com/feed/@your-handle"`. The site tries to fetch your latest 3
posts at runtime and silently falls back to the static list if it fails.

### Add / replace a testimonial
Open [`js/testimonials.js`](js/testimonials.js), edit the `TESTIMONIALS` array.
**These ship as placeholders — replace them with real quotes you have permission
to publish** (LinkedIn recommendations are ideal; ask the author first).

### Add a certificate
Open [`js/certificates.js`](js/certificates.js), append to `CERTIFICATES`:

```js
{ name: "...", issuer: "...", year: "2025",
  url: "https://credential-link", thumb: null }  // thumb optional: "assets/cert.png"
```

### Update the "Now" section (this is the part meant to grow)
Open [`js/focus.js`](js/focus.js) and edit the `FOCUS` array. Add a card as your
focus shifts, change a `status` pill ("Currently learning" → "Shipping"), or
retire one. This is what makes the site a living personal site rather than a
frozen portfolio.

### Add your headshot
Save your photo as **`assets/esther.jpg`** (the first studio headshot works
best — it's framed for a 4:5 portrait). That's it — the hero picks it up
automatically. If the file is missing the site falls back to the "EJ" mark, so
nothing ever breaks. To use a different filename, update the `src` on the
`.portrait__img` element in [`index.html`](index.html).

### Connect the contact form (Formspree)
1. Create a free form at <https://formspree.io> and copy your form ID.
2. In [`index.html`](index.html), replace `YOUR_FORM_ID` in the form `action`.
Until then the form gracefully falls back to opening a pre-filled email draft.

---

## Find everything you still need to fill in
Every placeholder is tagged. Search the project for:

```
TODO:
```

Current TODOs: Medium URL (3 places), CV PDF, OG/share image, canonical URL,
Formspree form ID, real project links in `apps.js`, real article URLs in
`posts.js`, real credential URLs in `certificates.js`, optional cert thumbnails,
optional real photo.

---

## Deploy to GitHub Pages
1. Push this folder to a repo (e.g. `Jolugba/portfolio` or `Jolugba.github.io`).
2. Repo → **Settings → Pages** → Source: **Deploy from a branch** → `main` / `/root`.
3. Open the published URL. No build, no Actions, no config required.

Update the `canonical`, `og:url`, and JSON-LD links in `index.html` to your
final URL once you know it.

---

## Notes
- **Accent color** lives in one place — the `--accent` token at the top of
  `css/styles.css` (currently a royal purple `#a06bff`). Change it there and it
  propagates everywhere. Two spots embed the hex literally and must be updated
  by hand to match: the GitHub chart + stats URLs in `index.html` (`a06bff`).
- **Motion** respects `prefers-reduced-motion`; nonessential animation is
  disabled automatically for users who ask for it.
- Built to target Lighthouse ≥ 95 across Performance / A11y / Best Practices / SEO.
