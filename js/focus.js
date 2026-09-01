/* =============================================================================
   focus.js — the "Now" section: Core Foundation vs Expanding Capabilities.
   -----------------------------------------------------------------------------
   This is the part of the site meant to GROW. As your focus shifts, edit this
   array — add a card, change a status, retire an old one. No markup changes.

   Fields:
     status  short label shown as a pill ("Core foundation", "Expanding capabilities")
     title   focus area
     body    one or two sentences — honest, specific
     glyph   inline SVG path (24x24 viewBox)
     tags    array of small keyword chips
============================================================================= */

const FOCUS = [
  {
    status: "Core foundation",
    title: "Native Android & software engineering",
    body:
      "This is where my depth is: native Android, clean architecture, and the testing and performance discipline that makes software reliable at scale. Everything else I build extends from here.",
    glyph: '<path d="M7 3h10v18H7zM11 18h2"/>',
    tags: ["Android", "Kotlin", "Java", "Jetpack Compose", "Testing", "Performance", "Reliability"],
  },
  {
    status: "Expanding capabilities",
    title: "Cross-platform, data & intelligent systems",
    body:
      "Different problems need different tools. Kotlin Multiplatform and Flutter let one codebase reach every platform; data science and AI let the products I build reason about their data instead of only storing it.",
    glyph: '<path d="M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-3M20 16V6"/>',
    tags: ["Kotlin Multiplatform", "Flutter", "Python", "Data Science", "ML / AI"],
  },
];
