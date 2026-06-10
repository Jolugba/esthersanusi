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
    status: "Currently learning",
    title: "Data Science",
    body:
      "Deepening the foundations — statistics, Python data tooling, and turning messy real-world data into decisions. Bringing an engineer's rigor to the analysis side.",
    glyph: '<path d="M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-3M20 16V6"/>',
    tags: ["Python", "Pandas", "Statistics", "Visualization"],
  },
  {
    status: "Exploring",
    title: "Machine Learning & AI",
    body:
      "From classical ML to modern AI — and how it lands on-device and in mobile products. CourtAI and Tyia were the start; the goal is shipping intelligence, not just models.",
    glyph:
      '<path d="M12 4a3 3 0 0 0-3 3v1a3 3 0 0 0 0 6v1a3 3 0 0 0 6 0v-1a3 3 0 0 0 0-6V7a3 3 0 0 0-3-3ZM5 11H3m18 0h-2M6 7 4.5 6M18 7l1.5-1M6 15l-1.5 1M18 15l1.5 1"/>',
    tags: ["ML", "LLMs", "On-device AI", "MLOps"],
  },
  {
    status: "Always",
    title: "Mobile at scale",
    body:
      "Still shipping production Android & KMP. The new skills compound on top of this — not instead of it.",
    glyph: '<path d="M7 3h10v18H7zM11 18h2"/>',
    tags: ["Android", "Kotlin", "KMP", "Compose"],
  },
];
