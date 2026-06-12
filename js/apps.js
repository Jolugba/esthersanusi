/* =============================================================================
   apps.js — Projects shown inside the interactive phone mockup.
   -----------------------------------------------------------------------------
   TO ADD AN APP: append an object to this array. The phone paginates
   automatically (8 icons per page) and builds detail screens from this data.

   Fields:
     id         unique slug (used for keys / aria)
     name       label under the icon (keep short — 1–2 words)
     category   small tag shown on the detail header
     accent     icon background tint (used only for the SVG glyph fallback)
     glyph      inline SVG path drawn inside the icon when there's no logo
     icon       OPTIONAL real logo image path, e.g. "assets/apps/fairmoney.png"
                When set, the real logo is used instead of the glyph.  ← drop
                your logos in assets/apps/ and add the path here.
     platforms  OPTIONAL array — shown as badges. Values: "Android", "iOS",
                "Windows", "macOS", "Web"
     personal   OPTIONAL true for personal projects (adds a ★ badge + tag)
     round      OPTIONAL true if the launcher icon is circular — renders the
                tile as a round icon instead of a rounded square
     overview   one short paragraph for the detail screen
     stack      array of tech chips
     highlights array of bullet metrics
     links      OPTIONAL object of store links — each present key renders its
                OWN button pointing at the correct store:
                  playStore       → Google Play   (Android)
                  appStore        → App Store      (iOS)
                  macAppStore     → Mac App Store  (macOS)
                  microsoftStore  → Microsoft Store (Windows)
                  web             → Visit website
                  github          → View on GitHub
                (If you omit `links` you can use a single `link:` string instead.)
                TODO: replace all the placeholder store URLs below with real ones.
============================================================================= */

const APPS = [
  {
    id: "fairmoney",
    name: "FairMoney",
    category: "Fintech · KMP",
    accent: "#ffffff",
    glyph: '<path d="M6 18V8.2C6 6.4 7.3 5 9 5h6c1.7 0 3 1.4 3 3.2V18M6 11h12M10.5 14.5h3"/>',
    icon: "assets/apps/fairmoney.png", // square white launcher
    platforms: ["Android", "iOS"],
    overview:
      "Savings and growth features for Nigeria's leading digital bank — 10M+ downloads. I drove Kotlin Multiplatform adoption on the savings stack, migrating three features to KMP in the first year.",
    stack: ["Kotlin", "KMP", "Compose Multiplatform", "Coroutines", "Ktor"],
    highlights: [
      "10M+ downloads · used by millions",
      "Migrated 3 features to KMP in year one (FAIRTARGET, FAIRDOLLAR, Referral)",
      "FAIRTARGET savings revamp + FAIRDOLLAR launch",
      "Referral module refactored to shared KMP code",
    ],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=ng.com.fairmoney.fairmoney",
      appStore: "https://apps.apple.com/us/app/fairmoney-loan-app-in-nigeria/id6456485223",
    },
  },
  {
    id: "courtai",
    name: "CourtAI",
    category: "Legal Tech · AI · Flutter",
    accent: "#e8730f",
    glyph:
      '<path d="M12 4v3M7 7l-2 2M17 7l2 2M5 12H4m16 0h-1M12 8a4 4 0 0 0-4 4c0 2 1.5 3 1.5 4h5c0-1 1.5-2 1.5-4a4 4 0 0 0-4-4Z"/>',
    icon: "assets/apps/courtai.png", // round orange launcher
    round: true,
    platforms: ["Android", "iOS", "Windows", "macOS"],
    overview:
      "AI-powered legal research for Nigerian lawyers — one Flutter codebase shipping to mobile AND desktop (Windows + macOS), so lawyers research from phone or workstation.",
    stack: ["Flutter", "Dart", "REST", "AI/LLM", "Clean Architecture"],
    highlights: [
      "Cross-platform: Android, iOS, Windows, macOS from one codebase",
      "Conversational legal research for practising lawyers",
      "Part of the Lawpavilion product suite",
    ],
    links: {
      // TODO: replace with the real store URLs
      playStore: "https://play.google.com/store",
      appStore: "https://apps.apple.com",
      macAppStore: "https://apps.apple.com/app/mac",
      microsoftStore: "https://apps.microsoft.com",
    },
  },
  {
    id: "elite",
    name: "LP Elite",
    category: "Legal Tech · Cross-platform",
    accent: "#ffffff",
    glyph:
      '<path d="M12 3l2.2 4.6L19 8.3l-3.5 3.4.8 4.9L12 14.3 7.7 16.6l.8-4.9L5 8.3l4.8-.7L12 3Z"/>',
    icon: "assets/apps/elite.png", // square white squircle launcher
    platforms: ["Android", "iOS", "Windows", "macOS"],
    overview:
      "Premium legal-research product for senior practitioners, available on mobile and desktop (Windows + macOS via Flutter). I led the large Java→Kotlin migration that reset its reliability on Android.",
    stack: ["Kotlin", "Flutter", "MVVM", "Hilt", "Room"],
    highlights: [
      "15K+ line Java→Kotlin migration",
      "NPEs reduced by 80%",
      "Crash rate 4.2% → 0.8%",
      "Search relevance +60%",
      "800+ active legal professionals",
    ],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.lawpavilion.elite",
      appStore: "https://apps.apple.com/us/app/law-pavilion-elite/id6752488556",
      macAppStore: "https://apps.apple.com/ng/app/law-pavilion-elite/id6752488556",
      playStoreAdmin: "https://play.google.com/store/apps/details?id=com.lawpavilion.elite.admin",
      web: "https://lawpavilion.com",
      // TODO: add Microsoft Store URL when available
    },
  },
  {
    id: "prime",
    name: "LP Prime",
    category: "Legal Tech · Android", // TODO: confirm category / platforms
    accent: "#22244e",
    glyph: '<path d="M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6l7-3Zm-2.5 8.5 1.8 1.8 3.2-3.5"/>',
    icon: "assets/apps/prime.png", // navy square launcher (orange P)
    platforms: ["Android"], // TODO: confirm (add iOS/Windows/macOS if applicable)
    overview:
      "Part of the Lawpavilion legal-tech suite. TODO: replace with a one-line description of what LP Prime does and who it's for.",
    stack: ["Kotlin", "Android"], // TODO: confirm the real stack
    highlights: [
      "Part of the Lawpavilion legal-tech product suite",
      // TODO: add real highlights / metrics
    ],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.lp.falcon",
    },
  },
  {
    id: "moj",
    name: "CMS MOJ",
    category: "Legal Tech · Cross-platform",
    accent: "#3fb6a8",
    glyph:
      '<path d="M5 21h14M6 21V9l6-4 6 4v12M9 21v-5h6v5M9.5 12h.01M14.5 12h.01"/>',
    icon: "assets/apps/moj.png", // full-bleed green square launcher (Casemanager MOJ)
    platforms: ["Android", "iOS", "Windows", "macOS"],
    overview:
      "A Ministry of Justice product built with Lawpavilion — digitising workflows for government legal teams across mobile and desktop (Windows + macOS) with a single Flutter codebase.",
    stack: ["Flutter", "Dart", "MVVM", "REST", "Clean Architecture"],
    highlights: [
      "Government Ministry of Justice deployment",
      "Cross-platform: Android, iOS, Windows, macOS",
      "Secure document and case workflows",
    ],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.casemanager.lawpavilion.lawpavilion_case_manager",
      appStore: "https://apps.apple.com/us/app/cms-moj/id6758410426",
      macAppStore: "https://apps.apple.com/ng/app/cms-moj/id6758410426",
      web: "https://lawpavilion.com",
      // TODO: add Microsoft Store URL when available
    },
  },
  {
    id: "cjrp",
    name: "CJRP",
    category: "Legal Tech · Cross-platform",
    accent: "#1f5c3a",
    glyph:
      '<path d="M7 4h7l4 4v12H7zM14 4v4h4M9 13h6M9 16h4"/>',
    icon: "assets/apps/cjrp.png", // round monitoring-committee seal
    round: true,
    platforms: ["Android", "iOS", "Windows", "macOS"],
    overview:
      "Court Justice Reporting Platform — structured reporting and case tracking for the justice system, delivered to mobile and desktop (Windows + macOS) from one Flutter codebase.",
    stack: ["Flutter", "Dart", "Clean Architecture", "REST"],
    highlights: [
      "Court reporting and case-tracking workflows",
      "Cross-platform: Android, iOS, Windows, macOS",
      "Part of the legal-tech product suite",
    ],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.lawpavilion.cjrp",
      web: "https://lawpavilion.com",
      // TODO: add iOS / macOS / Microsoft Store URLs when available
    },
  },
  {
    id: "stampseal",
    name: "Stamp & Seal",
    category: "Legal Tech · Native Android",
    accent: "#2f6b3f",
    glyph:
      '<path d="M12 3a3 3 0 0 0-3 3c0 1.2.7 2 1.2 2.8.4.6.3 1.2-.2 1.7L8 12h8l-2-1.5c-.5-.5-.6-1.1-.2-1.7C14.3 8 15 7.2 15 6a3 3 0 0 0-3-3ZM6 16h12v3H6z"/>',
    icon: "assets/apps/stampseal.png", // round NBA seal
    round: true,
    platforms: ["Android"],
    overview:
      "Document authentication for law firms and courts — native Android app for stamping, sealing, and verifying legal documents.",
    stack: ["Kotlin", "Jetpack Compose", "Hilt", "Room"],
    highlights: [
      "Document authentication for firms & courts",
      "Native Android, built for verifiability",
      "Part of the legal-tech product suite",
    ],
    links: {
      // TODO: replace with the real Play Store URL
      playStore: "https://play.google.com/store",
    },
  },
  {
    id: "justease",
    name: "JustEase",
    category: "Civic Tech · Android",
    accent: "#4fb477",
    glyph:
      '<path d="M12 21s-6-4.5-6-9a6 6 0 0 1 12 0c0 4.5-6 9-6 9Zm0-7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>',
    icon: "assets/apps/justease.png?v=3", // circular launcher, cropped tight to the green circle
    round: true, // circular launcher — display as a round icon, not a square tile
    platforms: ["Android"],
    overview:
      "Crime-reporting app putting safety in citizens' hands. Offline-first so reports survive poor connectivity, then sync when the network returns.",
    stack: ["Kotlin", "Room", "WorkManager", "Maps SDK", "MVVM"],
    highlights: [
      "1,000+ citizens served",
      "99.2% crash-free sessions",
      "Offline-first (Room + WorkManager)",
      "API response time 3s → 800ms",
    ],
    links: {
      // Play Store search (JustEase listing). TODO: swap for the direct app URL if you have it.
      playStore: "https://play.google.com/store/search?q=justease&c=apps",
    },
  },
  {
    id: "healthfit",
    name: "HealthFIT",
    category: "GovTech · Android",
    accent: "#e0584e",
    glyph: '<path d="M5 12h3l2-5 4 10 2-5h3"/>',
    icon: null, // TODO: add "assets/apps/healthfit.png"
    platforms: ["Android"],
    overview:
      "Health facility inspections for the Lagos State Government — a contract product digitising field inspection workflows.",
    stack: ["Kotlin", "MVVM", "Room", "Retrofit", "DataStore"],
    highlights: [
      "Lagos State Government contract",
      "Digital health-facility inspections",
      "Field-ready, offline-tolerant data capture",
    ],
    links: {
      // TODO: replace with the real link (Play Store or project page)
      web: "https://lagosstate.gov.ng",
    },
  },
  {
    id: "tyia",
    name: "Tyia Chatbot",
    category: "AI/ML · Android",
    accent: "#52b6d6",
    glyph: '<path d="M5 6h14v9H9l-4 3V6Zm4 4h.01M12 10h.01M15 10h.01"/>',
    icon: null, // TODO: add "assets/apps/tyia.png"
    platforms: ["Android"],
    overview:
      "A conversational chatbot for Android with on-device and cloud ML integration — natural language interaction wired into a production app.",
    stack: ["Kotlin", "ML integration", "Coroutines", "MVVM"],
    highlights: [
      "Conversational chatbot experience",
      "ML model integration on Android",
      "Real-time messaging UI",
    ],
    links: {
      // TODO: replace with the real repo / store link
      github: "https://github.com/Jolugba",
    },
  },

  /* --------------------------- PERSONAL PROJECTS ---------------------------
     Not in my CV — things I build for myself. TODO: refine the descriptions,
     tech, and links below with the real details, and drop logos in assets/apps/. */
  {
    id: "deposit-tracker",
    name: "Deposit Tracker",
    category: "Personal · Finance",
    accent: "#4fb477",
    glyph: '<path d="M12 3v9m0 0 3-3m-3 3-3-3M5 15v4h14v-4"/>',
    icon: null, // TODO: add "assets/apps/deposit-tracker.png"
    personal: true,
    platforms: ["Android"], // TODO: adjust if cross-platform
    overview:
      "A personal app for tracking deposits and savings goals — built to scratch my own itch and experiment with clean offline-first data flows. TODO: replace with the real description.",
    stack: ["Kotlin", "Jetpack Compose", "Room", "MVVM"], // TODO: confirm stack
    highlights: [
      "Track deposits and progress toward savings goals",
      "Offline-first local storage",
      // TODO: add real highlights / what you learned
    ],
    links: {
      // TODO: replace with the real repo / store links per platform
      github: "https://github.com/Jolugba",
    },
  },
  {
    id: "esthefi",
    name: "EstheFi",
    category: "Personal · Fintech",
    accent: "#a06bff",
    glyph: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 14h4"/>',
    icon: null, // TODO: add "assets/apps/esthefi.png"
    personal: true,
    platforms: ["Android", "iOS"], // TODO: adjust
    overview:
      "A personal fintech experiment — exploring product ideas and modern mobile architecture on my own terms. TODO: replace with the real description of what EstheFi does.",
    stack: ["Flutter", "Dart", "REST"], // TODO: confirm stack
    highlights: [
      "Personal fintech product experiment",
      // TODO: add real highlights
    ],
    links: {
      // TODO: replace with the real repo / store links per platform
      github: "https://github.com/Jolugba",
    },
  },
  {
    id: "learning-track",
    name: "Learning Track",
    category: "Personal · Productivity",
    accent: "#52b6d6",
    glyph: '<path d="M12 4 2 9l10 5 10-5-10-5ZM6 11v5c0 1 3 2 6 2s6-1 6-2v-5"/>',
    icon: null, // TODO: add "assets/apps/learning-track.png"
    personal: true,
    platforms: ["Android"], // TODO: adjust
    overview:
      "An app to track my own learning — courses, milestones, and progress as I move into data science and AI. Built to stay accountable to the journey. TODO: replace with the real description.",
    stack: ["Kotlin", "Jetpack Compose", "Room"], // TODO: confirm stack
    highlights: [
      "Tracks courses, milestones, and study streaks",
      "Supports my move into data science & AI",
      // TODO: add real highlights
    ],
    links: {
      // TODO: replace with the real repo / store links per platform
      github: "https://github.com/Jolugba",
    },
  },
];
