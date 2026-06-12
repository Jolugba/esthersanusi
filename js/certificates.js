/* =============================================================================
   certificates.js — Certificates / credentials grid.
   -----------------------------------------------------------------------------
   TO ADD A CERTIFICATE: append an object. Cards render automatically.

   Fields: name, issuer, year, url (credential link), thumb (optional image path)

   TIP: to show the actual certificate, save the PDF/image in assets/certs/ and
   point `url` at it (e.g. "assets/certs/hng-internship.pdf") and optionally set
   `thumb` to a preview image.
============================================================================= */

const CERTIFICATES = [
  {
    name: "HNG Internship — 8th Edition",
    issuer: "Hotels.ng (HNG)",
    year: "2020",
    // The original verify link was a Heroku app (Heroku's free tier is now offline).
    // TODO: save the certificate to assets/certs/hng-internship.pdf and point here.
    url: "https://hng.tech/",
    thumb: null, // TODO (optional): "assets/certs/hng-internship.png"
  },
  // TODO: add more certificates as you earn them — She Code Africa, Google, KMP, etc.
];
