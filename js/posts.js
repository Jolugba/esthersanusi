/* =============================================================================
   posts.js — Blog / writing cards.
   -----------------------------------------------------------------------------
   TO ADD A POST: append an object. Cards render automatically.
   Set MEDIUM_RSS to your Medium feed to auto-pull live posts (optional);
   on any failure the static POSTS below are used instead.

   Fields: title, platform ("Medium" | "Substack" | "Hashnode"),
           url, date (YYYY-MM-DD), excerpt, readTime
============================================================================= */

// OPTIONAL live feed. Leave null to skip the network call entirely.
// TODO: set to your Medium username feed, e.g.
//   "https://medium.com/feed/@esthertinuadejolugba"
const MEDIUM_RSS = null;

const POSTS = [
  {
    title: "KMP in Production: What Nobody Tells You Before You Migrate",
    platform: "Substack",
    // TODO: replace with the real article URL
    url: "https://substack.com/@esthertinuadejolugba",
    date: "2025-09-12",
    readTime: "8 min read",
    excerpt:
      "Shared business logic sounds clean on a slide. Here is what actually breaks — build config, platform expectations, and team habits — when you move real features to Kotlin Multiplatform.",
  },
  {
    title: "Crash Rate 4.2% → 0.8%: Exactly What We Changed",
    platform: "Medium",
    // TODO: replace with the real article URL
    url: "https://medium.com",
    date: "2025-06-03",
    readTime: "6 min read",
    excerpt:
      "No silver bullet — just a disciplined Java→Kotlin migration, null-safety enforced at the boundaries, and a crash-triage loop that turned reliability into a metric the whole team watched.",
  },
  {
    title: "Offline-First Architecture for African Fintech",
    platform: "Hashnode",
    // TODO: replace with the real article URL
    url: "https://hashnode.com",
    date: "2025-02-18",
    readTime: "10 min read",
    excerpt:
      "Connectivity is not guaranteed, so the app must assume it is gone. A practical Room + WorkManager pattern for apps that have to work on the train, in the village, and at 2% signal.",
  },
];
