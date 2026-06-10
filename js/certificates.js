/* =============================================================================
   certificates.js — Certificates / credentials grid.
   -----------------------------------------------------------------------------
   TO ADD A CERTIFICATE: append an object. Cards render automatically.

   Fields: name, issuer, year, url (credential link), thumb (optional image path)
============================================================================= */

const CERTIFICATES = [
  {
    name: "Associate Android Developer",
    issuer: "Google",
    year: "2022",
    // TODO: replace with the real credential URL
    url: "https://developers.google.com/certification",
    thumb: null, // TODO (optional): "assets/cert-google.png"
  },
  {
    name: "Kotlin Multiplatform Mobile",
    issuer: "JetBrains",
    year: "2024",
    // TODO: replace with the real credential URL
    url: "https://www.jetbrains.com/kotlin-multiplatform/",
    thumb: null,
  },
  {
    name: "Android Kotlin Developer Nanodegree",
    issuer: "Udacity",
    year: "2021",
    // TODO: replace with the real credential URL
    url: "https://www.udacity.com",
    thumb: null,
  },
  {
    name: "Speaker — Mobile Engineering Track",
    issuer: "DroidconNG",
    year: "2024",
    // TODO: replace with the real credential / talk URL
    url: "https://www.droidcon.com",
    thumb: null,
  },
];
