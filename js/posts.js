/* =============================================================================
   posts.js — Blog / writing cards.
   -----------------------------------------------------------------------------
   TO ADD A POST: append an object. Cards render automatically.

   Live feed: MEDIUM_RSS is set to Esther's Medium feed, so the section
   auto-pulls her latest posts at runtime (real titles, dates, excerpts) and
   falls back to the static POSTS below if the network call fails.

   Fields: title, platform ("Medium" | "Substack" | "Hashnode"),
           url, date (YYYY-MM-DD), excerpt, readTime
============================================================================= */

// Live Medium feed — pulls the latest posts automatically.
const MEDIUM_RSS = "https://medium.com/feed/@jolugbatinuade";

// Static fallback (shown if the live feed can't load). Real articles.
const POSTS = [
  {
    title: "What Nobody Tells You Before You Migrate Your First Feature to KMP",
    platform: "Medium",
    url: "https://medium.com/@jolugbatinuade/what-nobody-tells-you-before-you-migrate-your-first-feature-to-kmp-59cbf2053de0",
    date: "2026-07-10",
    readTime: "5 min read",
    excerpt:
      "Candid lessons from a first Kotlin Multiplatform migration — the build times, infrastructure costs, and architectural alignment the tutorials leave out.",
  },
  {
    title: "Your Brain Is More Powerful Than You Think",
    platform: "Substack",
    url: "https://esthersanusi.substack.com/p/your-brain-is-more-powerful-than",
    date: "2026-07-02",
    readTime: "6 min read",
    excerpt:
      "How I went from chemical compounds to code — and what the transition taught me about the mind.",
  },
  {
    title: "How She Code Africa Cohort Helped Me Overcome Imposter Syndrome",
    platform: "Medium",
    url: "https://medium.com/@jolugbatinuade/how-she-code-africa-cohort-helped-me-overcome-imposter-syndrome-fe8bb70c0519",
    date: "2020-03-25",
    readTime: "5 min read",
    excerpt:
      "An honest look at imposter syndrome in tech, and how community and mentorship turned self-doubt into momentum.",
  },
  {
    title: "Firebase Authentication for Android Made Easy",
    platform: "Medium",
    url: "https://medium.com/@jolugbatinuade/firebase-authentication-for-android-made-easy-f77dd9a41851",
    date: "2020-04-01",
    readTime: "7 min read",
    excerpt:
      "A practical, step-by-step guide to wiring up Firebase Authentication in an Android app — without the usual gotchas.",
  },
  {
    title: "Demystifying Cloud Computing — Episode 1",
    platform: "Medium",
    url: "https://medium.com/@jolugbatinuade/demystifying-cloud-computing-episode-1-4dd8dfd1ea6c",
    date: "2024-09-30",
    readTime: "6 min read",
    excerpt:
      "Cloud computing, explained from first principles — what it actually is, why it matters, and where to start.",
  },
];
