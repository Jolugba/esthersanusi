/* =============================================================================
   focus.js — the "Now" section: what Esther is currently building toward.
   -----------------------------------------------------------------------------
   This is the part of the site meant to GROW. As your focus shifts, edit this
   array — add a card, change a status, retire an old one. No markup changes.

   Fields:
     status  short label shown as a pill ("Currently learning", "Shipping", "Exploring")
     title   focus area
     body    one or two sentences — honest, specific
     glyph   inline SVG path (24x24 viewBox)
     tags    array of small keyword chips
============================================================================= */

const FOCUS = [
  {
    status: "The foundation",
    title: "Mobile at scale",
    body:
      "Still shipping production Android, KMP, and cross-platform apps used by millions. This is the craft everything else builds on, not something I'm leaving behind.",
    glyph: '<path d="M7 3h10v18H7zM11 18h2"/>',
    tags: ["Android", "Kotlin", "KMP", "Compose", "Flutter"],
  },
  {
    status: "Going deeper",
    title: "Data Science",
    body:
      "The data layer of the products I build: statistics, Python tooling, and turning real usage into decisions. So the apps I ship can reason about their data, not just store it.",
    glyph: '<path d="M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-3M20 16V6"/>',
    tags: ["Python", "Pandas", "Statistics", "Analytics"],
  },
  {
    status: "Building in",
    title: "Machine Learning & AI",
    body:
      "I'm bringing intelligence into the products themselves: on-device and cloud ML, woven into real apps. CourtAI and Tyia were the start; the goal is AI that earns its place, never bolted on.",
    glyph:
      '<path d="M12 4a3 3 0 0 0-3 3v1a3 3 0 0 0 0 6v1a3 3 0 0 0 6 0v-1a3 3 0 0 0 0-6V7a3 3 0 0 0-3-3ZM5 11H3m18 0h-2M6 7 4.5 6M18 7l1.5-1M6 15l-1.5 1M18 15l1.5 1"/>',
    tags: ["ML", "LLMs", "On-device AI", "MLOps"],
  },
];
