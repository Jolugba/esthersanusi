/* =============================================================================
   apps.js — Projects shown inside the interactive phone mockup.
   -----------------------------------------------------------------------------
   TO ADD AN APP: append an object to this array. The phone paginates
   automatically (8 icons per page) and builds detail screens from this data.

   Fields:
     id        unique slug (used for keys / aria)
     name      label under the icon (keep short — 1–2 words)
     category  small tag shown on the detail header
     glyph     inline SVG path drawn inside the icon (no external images)
     accent    icon background tint (CSS color)
     overview  one short paragraph for the detail screen
     stack     array of tech chips
     highlights array of bullet metrics
     link      external "Open project" URL  (TODO: replace placeholders)
============================================================================= */

const APPS = [
  {
    id: "fairmoney",
    name: "FairMoney",
    category: "Fintech · KMP",
    accent: "#5b8def",
    glyph: '<path d="M6 18V8.2C6 6.4 7.3 5 9 5h6c1.7 0 3 1.4 3 3.2V18M6 11h12M10.5 14.5h3"/>',
    overview:
      "Savings and growth features for Nigeria's leading digital bank, serving 2M+ users. I drove Kotlin Multiplatform adoption on the savings stack, migrating three features to KMP in the first year.",
    stack: ["Kotlin", "KMP", "Compose Multiplatform", "Coroutines", "Ktor"],
    highlights: [
      "2M+ users reached",
      "Migrated 3 features to KMP in year one (FAIRTARGET, FAIRDOLLAR, Referral)",
      "FAIRTARGET savings revamp + FAIRDOLLAR launch",
      "Referral module refactored to shared KMP code",
    ],
    // TODO: replace with the live Play Store / app link
    link: "https://play.google.com/store",
  },
  {
    id: "courtai",
    name: "CourtAI",
    category: "Legal Tech · AI · Flutter",
    accent: "#7c6bff",
    glyph:
      '<path d="M12 4v3M7 7l-2 2M17 7l2 2M5 12H4m16 0h-1M12 8a4 4 0 0 0-4 4c0 2 1.5 3 1.5 4h5c0-1 1.5-2 1.5-4a4 4 0 0 0-4-4Z"/>',
    overview:
      "AI-powered legal research built for Nigerian lawyers — natural-language case search and summarisation delivered through a Flutter client.",
    stack: ["Flutter", "Dart", "REST", "AI/LLM", "Clean Architecture"],
    highlights: [
      "Conversational legal research for practising lawyers",
      "Cross-platform Flutter delivery",
      "Part of the Lawpavilion product suite",
    ],
    // TODO: replace with the live CourtAI link
    link: "https://lawpavilion.com",
  },
  {
    id: "elite",
    name: "LP Elite",
    category: "Legal Tech · Android",
    accent: "#d4a24e",
    glyph:
      '<path d="M12 3l2.2 4.6L19 8.3l-3.5 3.4.8 4.9L12 14.3 7.7 16.6l.8-4.9L5 8.3l4.8-.7L12 3Z"/>',
    overview:
      "Premium legal-research product for senior practitioners. I led a large Java→Kotlin migration that reset the app's reliability and search experience.",
    stack: ["Kotlin", "MVVM", "Hilt", "Room", "Coroutines"],
    highlights: [
      "15K+ line Java→Kotlin migration",
      "NPEs reduced by 80%",
      "Crash rate 4.2% → 0.8%",
      "Search relevance +60%",
      "800+ active legal professionals",
    ],
    // TODO: replace with the live Elite link
    link: "https://lawpavilion.com",
  },
  {
    id: "moj",
    name: "LP MOJ",
    category: "Legal Tech · Android",
    accent: "#3fb6a8",
    glyph:
      '<path d="M5 21h14M6 21V9l6-4 6 4v12M9 21v-5h6v5M9.5 12h.01M14.5 12h.01"/>',
    overview:
      "A Ministry of Justice product built with Lawpavilion — digitising workflows for government legal teams.",
    stack: ["Kotlin", "MVVM", "Room", "Retrofit", "DataStore"],
    highlights: [
      "Government Ministry of Justice deployment",
      "Secure document and case workflows",
      "Part of a 5-product legal suite I led",
    ],
    // TODO: replace with the live MOJ link
    link: "https://lawpavilion.com",
  },
  {
    id: "cjrp",
    name: "CJRP",
    category: "Legal Tech · Android",
    accent: "#e06c9f",
    glyph:
      '<path d="M7 4h7l4 4v12H7zM14 4v4h4M9 13h6M9 16h4"/>',
    overview:
      "Court Justice Reporting Platform — structured reporting and case tracking for the justice system.",
    stack: ["Kotlin", "Clean Architecture", "Room", "WorkManager"],
    highlights: [
      "Court reporting and case-tracking workflows",
      "Offline-capable data sync",
      "Part of the legal-tech product suite",
    ],
    // TODO: replace with the live CJRP link
    link: "https://lawpavilion.com",
  },
  {
    id: "stampseal",
    name: "Stamp & Seal",
    category: "Legal Tech · Native Android",
    accent: "#9b87f5",
    glyph:
      '<path d="M12 3a3 3 0 0 0-3 3c0 1.2.7 2 1.2 2.8.4.6.3 1.2-.2 1.7L8 12h8l-2-1.5c-.5-.5-.6-1.1-.2-1.7C14.3 8 15 7.2 15 6a3 3 0 0 0-3-3ZM6 16h12v3H6z"/>',
    overview:
      "Document authentication for law firms and courts — native Android app for stamping, sealing, and verifying legal documents.",
    stack: ["Kotlin", "Jetpack Compose", "Hilt", "Room"],
    highlights: [
      "Document authentication for firms & courts",
      "Native Android, built for verifiability",
      "Part of the legal-tech product suite",
    ],
    // TODO: replace with the live Stamp & Seal link
    link: "https://lawpavilion.com",
  },
  {
    id: "justease",
    name: "JustEase",
    category: "Civic Tech · Android",
    accent: "#4fb477",
    glyph:
      '<path d="M12 21s-6-4.5-6-9a6 6 0 0 1 12 0c0 4.5-6 9-6 9Zm0-7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>',
    overview:
      "Crime-reporting app putting safety in citizens' hands. Offline-first so reports survive poor connectivity, then sync when the network returns.",
    stack: ["Kotlin", "Room", "WorkManager", "Maps SDK", "MVVM"],
    highlights: [
      "1,000+ citizens served",
      "99.2% crash-free sessions",
      "Offline-first (Room + WorkManager)",
      "API response time 3s → 800ms",
    ],
    // TODO: replace with the live JustEase link
    link: "https://play.google.com/store",
  },
  {
    id: "healthfit",
    name: "HealthFIT",
    category: "GovTech · Android",
    accent: "#e0584e",
    glyph:
      '<path d="M5 12h3l2-5 4 10 2-5h3"/>',
    overview:
      "Health facility inspections for the Lagos State Government — a contract product digitising field inspection workflows.",
    stack: ["Kotlin", "MVVM", "Room", "Retrofit", "DataStore"],
    highlights: [
      "Lagos State Government contract",
      "Digital health-facility inspections",
      "Field-ready, offline-tolerant data capture",
    ],
    // TODO: replace with the live HealthFIT link
    link: "https://lagosstate.gov.ng",
  },
  {
    id: "tyia",
    name: "Tyia Chatbot",
    category: "AI/ML · Android",
    accent: "#52b6d6",
    glyph:
      '<path d="M5 6h14v9H9l-4 3V6Zm4 4h.01M12 10h.01M15 10h.01"/>',
    overview:
      "A conversational chatbot for Android with on-device and cloud ML integration — natural language interaction wired into a production app.",
    stack: ["Kotlin", "ML integration", "Coroutines", "MVVM"],
    highlights: [
      "Conversational chatbot experience",
      "ML model integration on Android",
      "Real-time messaging UI",
    ],
    // TODO: replace with the live Tyia link
    link: "https://github.com/Jolugba",
  },
];
