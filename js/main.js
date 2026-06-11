/* =============================================================================
   main.js — all behavior. Vanilla JS, no dependencies.
   Sections: intro · nav · theme · reveals · counters · phone · posts ·
             certificates · github · contact · hero motion · misc
   Animates only transform/opacity. Honors prefers-reduced-motion.
============================================================================= */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ------------------------------- INTRO ---------------------------------- */
  (function intro() {
    const el = $("#intro");
    if (!el) return;
    if (reduceMotion) { el.classList.add("is-done"); return; }
    window.addEventListener("load", () => setTimeout(() => el.classList.add("is-done"), 1100));
    // Safety: never trap the user behind the intro.
    setTimeout(() => el.classList.add("is-done"), 2600);
  })();

  /* -------------------------------- NAV ----------------------------------- */
  (function nav() {
    const navEl = $("#nav");
    const burger = $("#navBurger");
    const links = $("#navLinks");

    const onScroll = () => navEl.classList.toggle("is-scrolled", window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    burger.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    // Close mobile menu after navigating
    $$("a", links).forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("is-open");
        burger.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      })
    );

    // Active-section highlighting
    const sectionIds = ["work", "apps", "experience", "now", "writing", "certificates", "contact"];
    const map = {};
    $$(".nav__links a").forEach((a) => {
      const href = a.getAttribute("href");
      if (href && href.startsWith("#")) map[href.slice(1)] = a;
    });
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            $$(".nav__links a").forEach((a) => a.classList.remove("is-active"));
            const id = e.target.id;
            // #work lives inside #apps — map both to the Apps/Work links present
            const link = map[id] || map[e.target.closest("section")?.id];
            if (link) link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sectionIds.forEach((id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  })();

  /* ------------------------------- THEME ---------------------------------- */
  (function theme() {
    const toggle = $("#themeToggle");
    const root = document.documentElement;
    const saved = (() => { try { return localStorage.getItem("ej-theme"); } catch (_) { return null; } })();
    if (saved) root.setAttribute("data-theme", saved);
    toggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("ej-theme", next); } catch (_) {}
    });
  })();

  /* ------------------------------ REVEALS --------------------------------- */
  (function reveals() {
    const items = $$(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          // Stagger by position among siblings for a cascade effect.
          const idx = Array.from(e.target.parentElement.children).indexOf(e.target);
          e.target.style.transitionDelay = Math.min(idx * 60, 240) + "ms";
          e.target.classList.add("is-visible");
          obs.unobserve(e.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((el) => io.observe(el));
  })();

  /* --------------------------- STAT COUNTERS ------------------------------ */
  (function counters() {
    const nums = $$(".stat__num");
    if (!nums.length) return;
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      if (reduceMotion) { el.textContent = target + suffix; return; }
      const dur = 1400;
      let start = null;
      const step = (t) => {
        if (start === null) start = t;
        const p = Math.min((t - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (entries, obs) => entries.forEach((e) => { if (e.isIntersecting) { run(e.target); obs.unobserve(e.target); } }),
      { threshold: 0.6 }
    );
    nums.forEach((el) => io.observe(el));
  })();

  /* -------------------------- PHONE SHOWCASE ------------------------------ */
  (function phone() {
    const pagesEl = $("#appPages");
    const dotsEl = $("#appDots");
    const home = $("#screenHome");
    const detail = $("#screenDetail");
    if (!pagesEl || typeof APPS === "undefined") return;

    const PER_PAGE = 8;
    const appPageCount = Math.ceil(APPS.length / PER_PAGE);
    const pageCount = appPageCount + 1; // + a "Glance" page at index 0
    let current = 1; // default to the first app page (Glance is one swipe left)
    let lastFocused = null;

    // Tiny inline icons for platform badges in the detail screen.
    const pIcon = (p) => `<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">${p}</svg>`;
    const PLATFORM_ICON = {
      Android: pIcon('<path d="M7 9a5 5 0 0 1 10 0v7H7zM6 11v5M18 11v5M9 4 8 2M15 4l1-2M10 13h.01M14 13h.01"/>'),
      iOS: pIcon('<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>'),
      Windows: pIcon('<path d="M3 5l8-1v7H3zM13 3.8 21 3v9h-8zM3 12h8v7l-8-1zM13 12h8v9l-8-1z"/>'),
      macOS: pIcon('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M10 16v4M14 16v4"/>'),
      Web: pIcon('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'),
    };

    // Store buttons — each key in an app's `links` object renders its own button
    // pointing at the correct store. Order here = display order.
    const sIcon = (p) => `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">${p}</svg>`;
    const STORES = {
      playStore:     { label: "Google Play",     icon: sIcon('<path d="M4 3l16 9-16 9zM4 3l11 9-11 9"/>') },
      appStore:      { label: "App Store",        icon: sIcon('<path d="M16.5 13.5c0 3-2 5.5-3 5.5s-2-1-3-1-2 1-3 1-3-2.5-3-6 2-5 4-5c1 0 2 .8 2 .8s1-.8 2-.8c1.3 0 2.4.7 3 1.7M13 5.5c.4-1 1.4-2 2.5-2 0 1.2-.5 2.2-1 2.7"/>') },
      macAppStore:   { label: "Mac App Store",    icon: sIcon('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M10 16v4M14 16v4M9.5 11l1.3-3.5L12 11M9.8 10h2M14 7.5v3.5"/>') },
      microsoftStore:{ label: "Microsoft Store",  icon: sIcon('<path d="M3 5l8-1v7H3zM13 3.8 21 3v9h-8zM3 12h8v7l-8-1zM13 12h8v9l-8-1z"/>') },
      web:           { label: "Visit website",    icon: sIcon('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>') },
      github:        { label: "View on GitHub",   icon: sIcon('<path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6 0C6.6 3.3 5.5 3.6 5.5 3.6a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 10c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>') },
      open:          { label: "Open project",     icon: sIcon('<path d="M7 17 17 7M9 7h8v8"/>') },
    };

    // Visual for an app icon: glyph as the base, with the real logo image (if
    // provided) overlaid on top. If the logo file is missing/fails, it removes
    // itself and the glyph shows through — never a broken image.
    const iconInner = (app) =>
      `<svg viewBox="0 0 24 24" aria-hidden="true">${app.glyph}</svg>` +
      (app.icon ? `<img class="app-logo" src="${app.icon}" alt="" aria-hidden="true" loading="lazy" onerror="this.remove()" />` : "");

    // Page 0 — "Glance": notification chips + Now-learning + GitHub widgets.
    // TODO: edit the notification chips / numbers here to taste.
    const glance = document.createElement("div");
    glance.className = "app-page glance";
    glance.innerHTML =
      `<div class="notif">` +
        `<div class="notif__chip"><span class="notif__ico">🔔</span><div><b>FairMoney</b><i>10M+ downloads on Google Play</i></div></div>` +
        `<div class="notif__chip"><span class="notif__ico">⭐</span><div><b>CourtAI</b><i>Now on macOS &amp; Windows</i></div></div>` +
      `</div>` +
      `<div class="gwidget gwidget--learn">` +
        `<div class="gwidget__head"><svg viewBox="0 0 24 24"><path d="M12 4 2 9l10 5 10-5-10-5ZM6 11v5c0 1 3 2 6 2s6-1 6-2v-5"/></svg> Now learning</div>` +
        `<b>Data Science &amp; AI</b>` +
        `<div class="gwidget__chips"><span>Python</span><span>ML</span><span>Statistics</span></div>` +
      `</div>` +
      `<div class="gwidget">` +
        `<div class="gwidget__head"><svg viewBox="0 0 24 24"><path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6 0C6.6 3.3 5.5 3.6 5.5 3.6a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 10c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg> Public GitHub</div>` +
        `<div class="gwidget__stats"><span><b>48</b>repos</span><span><b>340</b>commits</span><span><b>36</b>PRs</span></div>` +
        `<div class="gwidget__grid">${Array.from({ length: 28 }, (_, n) => `<i class="${[3, 5, 6, 9, 12, 13, 17, 18, 19, 22, 25, 26].includes(n) ? "on" : ""}"></i>`).join("")}</div>` +
      `</div>`;
    pagesEl.appendChild(glance);

    // Build app pages
    for (let p = 0; p < appPageCount; p++) {
      const page = document.createElement("div");
      page.className = "app-page";
      APPS.slice(p * PER_PAGE, p * PER_PAGE + PER_PAGE).forEach((app) => {
        const wrap = document.createElement("div");
        wrap.className = "app-icon";
        wrap.innerHTML =
          `<button type="button" aria-label="Open ${app.name}" style="background:${app.accent}">` +
          `${iconInner(app)}` +
          (app.personal ? `<span class="app-icon__badge" title="Personal project">★</span>` : "") +
          `</button>` +
          `<span>${app.name}</span>`;
        wrap.querySelector("button").addEventListener("click", () => openApp(app));
        page.appendChild(wrap);
      });
      pagesEl.appendChild(page);
    }

    // Dots
    if (pageCount > 1) {
      for (let p = 0; p < pageCount; p++) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", p === 0 ? "Glance page" : `Apps page ${p}`);
        dot.addEventListener("click", () => goTo(p));
        dotsEl.appendChild(dot);
      }
    }

    function goTo(p) {
      current = Math.max(0, Math.min(pageCount - 1, p));
      $$(".app-page", pagesEl).forEach((pg) => (pg.style.transform = `translateX(${-current * 100}%)`));
      $$("button", dotsEl).forEach((d, i) => d.classList.toggle("is-active", i === current));
    }
    goTo(current);

    // Swipe between pages (touch)
    let startX = null;
    pagesEl.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX), { passive: true });
    pagesEl.addEventListener("touchend", (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 45) goTo(current + (dx < 0 ? 1 : -1));
      startX = null;
    });

    // Open / close detail
    function openApp(app) {
      lastFocused = document.activeElement;
      const platforms = (app.platforms && app.platforms.length)
        ? `<p class="detail__section-label">Platforms</p>` +
          `<div class="detail__platforms">${app.platforms.map((p) => `<span>${PLATFORM_ICON[p] || ""}${p}</span>`).join("")}</div>`
        : "";

      // Build a store button per available link (with single-link fallback).
      const linkEntries = app.links
        ? Object.entries(app.links).filter(([k, v]) => v && STORES[k])
        : (app.link ? [["open", app.link]] : []);
      const linksHtml = linkEntries.length
        ? `<div class="detail__links">` +
          linkEntries
            .map(([k, v]) => `<a class="detail__open" href="${v}" target="_blank" rel="noopener">${STORES[k].icon}<span>${STORES[k].label}</span></a>`)
            .join("") +
          `</div>`
        : "";
      detail.innerHTML =
        `<div class="detail__bar">` +
        `<button type="button" class="detail__back" aria-label="Back to apps">` +
        `<svg viewBox="0 0 24 24" width="18" height="18"><path d="M15 5l-7 7 7 7"/></svg></button>` +
        (app.personal ? `<span class="detail__tag">★ Personal project</span>` : "") +
        `</div>` +
        `<div class="detail__app">` +
        `<div class="app-glyph" style="background:${app.accent}">` +
        `<svg viewBox="0 0 24 24">${app.glyph}</svg>` +
        (app.icon ? `<img class="app-logo" src="${app.icon}" alt="${app.name} logo" onerror="this.remove()" />` : "") +
        `</div>` +
        `<div><h3>${app.name}</h3><p>${app.category}</p></div></div>` +
        `<p class="detail__section-label">Overview</p>` +
        `<p class="detail__overview">${app.overview}</p>` +
        platforms +
        `<p class="detail__section-label">Tech stack</p>` +
        `<div class="detail__chips">${app.stack.map((s) => `<span>${s}</span>`).join("")}</div>` +
        `<p class="detail__section-label">Highlights</p>` +
        `<ul class="detail__highlights">${app.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>` +
        linksHtml;

      detail.querySelector(".detail__back").addEventListener("click", closeApp);
      home.classList.remove("is-active");
      home.setAttribute("aria-hidden", "true");
      detail.classList.add("is-active");
      detail.setAttribute("aria-hidden", "false");
      detail.scrollTop = 0;
      detail.focus();
    }

    function closeApp() {
      detail.classList.remove("is-active");
      detail.setAttribute("aria-hidden", "true");
      home.classList.add("is-active");
      home.setAttribute("aria-hidden", "false");
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    // Esc closes detail
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && detail.classList.contains("is-active")) closeApp();
    });
  })();

  /* ------------------------------- POSTS ---------------------------------- */
  (function posts() {
    const wrap = $("#posts");
    if (!wrap || typeof POSTS === "undefined") return;

    const fmtDate = (d) => {
      const dt = new Date(d);
      return isNaN(dt) ? d : dt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    const render = (list) => {
      wrap.innerHTML = list
        .map(
          (p) =>
            `<a class="post-card reveal" href="${p.url}" target="_blank" rel="noopener">` +
            `<div class="post-card__meta"><span class="badge">${p.platform}</span>` +
            `<span class="post-card__date">${fmtDate(p.date)}</span></div>` +
            `<h3>${p.title}</h3><p>${p.excerpt}</p>` +
            `<div class="post-card__foot"><span>${p.readTime || ""}</span><span class="arrow">Read ↗</span></div></a>`
        )
        .join("");
      // newly injected cards still need to reveal
      $$(".post-card.reveal", wrap).forEach((el) =>
        reduceMotion ? el.classList.add("is-visible") : revealObserver.observe(el)
      );
    };

    const revealObserver = new IntersectionObserver(
      (entries, obs) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );

    render(POSTS);

    // OPTIONAL: pull live Medium posts, fall back to static on any failure.
    if (typeof MEDIUM_RSS === "string" && MEDIUM_RSS) {
      fetch("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(MEDIUM_RSS))
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((data) => {
          if (!data || data.status !== "ok" || !Array.isArray(data.items) || !data.items.length) return;
          const live = data.items.slice(0, 3).map((it) => ({
            title: it.title,
            platform: "Medium",
            url: it.link,
            date: it.pubDate,
            readTime: "",
            excerpt: (it.description || "").replace(/<[^>]+>/g, "").slice(0, 160).trim() + "…",
          }));
          render(live);
        })
        .catch(() => { /* keep static POSTS */ });
    }
  })();

  /* --------------------------- CERTIFICATES ------------------------------- */
  (function certificates() {
    const wrap = $("#certs");
    if (!wrap || typeof CERTIFICATES === "undefined") return;
    const fallbackThumb =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="9" r="5"/><path d="M9 13l-1 8 4-2 4 2-1-8"/></svg>';
    wrap.innerHTML = CERTIFICATES.map(
      (c) =>
        `<article class="cert-card reveal">` +
        `<div class="cert-card__thumb">${c.thumb ? `<img loading="lazy" src="${c.thumb}" alt="${c.name} certificate" />` : fallbackThumb}</div>` +
        `<h3>${c.name}</h3>` +
        `<p class="cert-card__issuer">${c.issuer}</p>` +
        `<p class="cert-card__year">${c.year}</p>` +
        `<a class="cert-card__link" href="${c.url}" target="_blank" rel="noopener">View credential ↗</a>` +
        `</article>`
    ).join("");
    const io = new IntersectionObserver(
      (entries, obs) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    $$(".cert-card.reveal", wrap).forEach((el) => (reduceMotion ? el.classList.add("is-visible") : io.observe(el)));
  })();

  /* ------------------------------- FOCUS ---------------------------------- */
  (function focus() {
    const wrap = $("#focus");
    if (!wrap || typeof FOCUS === "undefined") return;
    wrap.innerHTML = FOCUS.map(
      (f) =>
        `<article class="focus-card reveal">` +
        `<div class="focus-card__top">` +
        `<div class="focus-card__icon"><svg viewBox="0 0 24 24" aria-hidden="true">${f.glyph}</svg></div>` +
        `<span class="focus-card__status">${f.status}</span></div>` +
        `<h3>${f.title}</h3>` +
        `<p>${f.body}</p>` +
        `<div class="chips">${f.tags.map((t) => `<span>${t}</span>`).join("")}</div>` +
        `</article>`
    ).join("");
    const io = new IntersectionObserver(
      (entries, obs) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    $$(".focus-card.reveal", wrap).forEach((el) => (reduceMotion ? el.classList.add("is-visible") : io.observe(el)));
  })();

  /* ------------------------------ CONTACT --------------------------------- */
  (function contact() {
    const form = $("#contactForm");
    const status = $("#formStatus");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const action = form.getAttribute("action") || "";
      const data = new FormData(form);

      // If Formspree isn't configured yet, fall back to a mailto: draft.
      if (action.includes("YOUR_FORM_ID")) {
        const subject = encodeURIComponent(`Portfolio enquiry — ${data.get("project_type") || "General"}`);
        const body = encodeURIComponent(
          `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`
        );
        window.location.href = `mailto:jolugbatinuade@gmail.com?subject=${subject}&body=${body}`;
        status.textContent = "Opening your email app…";
        status.className = "contact__status";
        return;
      }

      status.textContent = "Sending…";
      status.className = "contact__status";
      try {
        const res = await fetch(action, { method: "POST", body: data, headers: { Accept: "application/json" } });
        if (res.ok) {
          form.reset();
          status.textContent = "Thanks — I'll reply within a day.";
          status.className = "contact__status is-ok";
        } else {
          throw new Error("bad response");
        }
      } catch (_) {
        status.textContent = "Couldn't send. Email jolugbatinuade@gmail.com directly.";
        status.className = "contact__status is-err";
      }
    });
  })();

  /* ---------------------- HERO MOTION + MAGNETIC -------------------------- */
  (function motion() {
    if (reduceMotion) return;

    // Cursor-follow glow / subtle parallax on hero
    const glow = $(".hero__glow");
    const hero = $("#hero");
    if (glow && hero) {
      hero.addEventListener("mousemove", (e) => {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / r.width;
        const y = (e.clientY - r.top - r.height / 2) / r.height;
        glow.style.transform = `translateX(-50%) translate(${x * 30}px, ${y * 24}px)`;
      });
    }

    // Magnetic hover on buttons/cards
    $$(".magnetic").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
      });
      el.addEventListener("mouseleave", () => (el.style.transform = ""));
    });
  })();

  /* ---------------------------- PORTRAIT PHOTO ---------------------------- */
  // Auto-detect the headshot regardless of extension/casing. Save your photo
  // into assets/ as any of these names and it loads with no code changes.
  (function portrait() {
    const img = $("#portraitImg");
    const fallback = $("#portraitFallback");
    if (!img) return;
    const candidates = [
      "assets/esther.jpg", "assets/esther.jpeg", "assets/esther.png",
      "assets/esther.JPG", "assets/profile.jpg", "assets/headshot.jpg",
    ];
    let i = 0;
    const probe = new Image();
    // The "ES" initials show immediately (base layer). Only once a photo is
    // FULLY loaded do we fade it in on top — so a weak/slow network just keeps
    // the initials instead of showing a blank box.
    probe.onload = () => {
      img.src = candidates[i];
      img.classList.add("is-ready");
    };
    probe.onerror = () => { if (++i < candidates.length) probe.src = candidates[i]; };
    probe.src = candidates[0];
  })();

  /* ------------------------------- MISC ----------------------------------- */
  (function misc() {
    // Back to top
    const top = $("#backToTop");
    if (top) top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

    // Live phone clock — status bar + the big home-screen clock widget
    const statusClock = $("#phoneClock");
    const homeClock = $("#homeClock");
    const homeDate = $("#homeDate");
    if (statusClock || homeClock) {
      const tick = () => {
        const d = new Date();
        const t = d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
        if (statusClock) statusClock.textContent = t;
        if (homeClock) homeClock.textContent = t;
        if (homeDate) homeDate.textContent = "Lagos · " + d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
      };
      tick();
      setInterval(tick, 30000);
    }
  })();

  /* --------------------------- TESTIMONIALS ------------------------------- */
  (function testimonials() {
    const wrap = $("#quotes");
    if (!wrap || typeof TESTIMONIALS === "undefined") return;
    const initials = (n) => n.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
    wrap.innerHTML = TESTIMONIALS.map(
      (t) =>
        `<figure class="quote-card reveal">` +
        `<div class="quote-card__mark" aria-hidden="true">"</div>` +
        `<blockquote>${t.quote}</blockquote>` +
        `<figcaption class="quote-card__who">` +
        `<span class="quote-card__av">${t.avatar ? `<img src="${t.avatar}" alt="${t.name}" />` : initials(t.name)}</span>` +
        `<span><span class="quote-card__name">${t.name}</span><br>` +
        `<span class="quote-card__role">${t.role} · ${t.company}</span></span>` +
        `</figcaption></figure>`
    ).join("");
    const io = new IntersectionObserver(
      (entries, obs) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    $$(".quote-card.reveal", wrap).forEach((el) => (reduceMotion ? el.classList.add("is-visible") : io.observe(el)));
  })();

  /* --------------------------- SCROLL PROGRESS ---------------------------- */
  (function scrollProgress() {
    const bar = $("#scrollProgress");
    if (!bar) return;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  })();

  /* --------------------------- COMMAND PALETTE ---------------------------- */
  (function commandPalette() {
    const cmdk = $("#cmdk");
    const input = $("#cmdkInput");
    const list = $("#cmdkList");
    if (!cmdk || !input || !list) return;

    const go = (sel) => () => { close(); const el = $(sel); if (el) el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }); };
    const openUrl = (url) => () => window.open(url, "_blank", "noopener");
    const i = (p) => `<svg viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;

    const COMMANDS = [
      { label: "Go to Work", tag: "section", icon: i('<rect x="6" y="3" width="12" height="18" rx="2"/>'), run: go("#apps") },
      { label: "Go to Experience", tag: "section", icon: i('<path d="M4 7h16v13H4zM8 7V4h8v3"/>'), run: go("#experience") },
      { label: "Go to Now / Focus", tag: "section", icon: i('<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>'), run: go("#now") },
      { label: "Go to Writing", tag: "section", icon: i('<path d="M4 5h16v14H4zM8 9h8M8 13h5"/>'), run: go("#writing") },
      { label: "Go to Certificates", tag: "section", icon: i('<circle cx="12" cy="9" r="5"/><path d="M9 13l-1 8 4-2 4 2-1-8"/>'), run: go("#certificates") },
      { label: "Go to Testimonials", tag: "section", icon: i('<path d="M4 5h16v10H9l-4 3z"/>'), run: go("#testimonials") },
      { label: "Contact me", tag: "section", icon: i('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'), run: go("#contact") },
      { label: "Copy email address", tag: "action", icon: i('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5h10"/>'), run: () => {
          close();
          const email = "jolugbatinuade@gmail.com";
          if (navigator.clipboard) navigator.clipboard.writeText(email).catch(() => {});
          toast("Email copied: " + email);
      }},
      { label: "Email Esther", tag: "link", icon: i('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'), run: () => { close(); window.location.href = "mailto:jolugbatinuade@gmail.com"; } },
      { label: "Open GitHub", tag: "link", icon: i('<path d="M12 2a10 10 0 0 0-3 19.5c.5 0 .7-.2.7-.5v-2c-2.8.6-3.4-1.2-3.4-1.2-.4-1.2-1.1-1.5-1.1-1.5-.9-.6 0-.6 0-.6 1 0 1.5 1 1.5 1 .9 1.5 2.3 1 2.9.8 0-.6.3-1 .6-1.3-2.2-.2-4.6-1.1-4.6-5a4 4 0 0 1 1-2.7 3.7 3.7 0 0 1 .1-2.7s.8-.2 2.7 1a9 9 0 0 1 5 0c1.9-1.2 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7a4 4 0 0 1 1 2.7c0 3.9-2.3 4.8-4.6 5 .4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"/>'), run: openUrl("https://github.com/Jolugba") },
      { label: "Open LinkedIn", tag: "link", icon: i('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4"/>'), run: openUrl("https://www.linkedin.com/in/esther-sanusi-0b336a185") },
      { label: "Open Substack", tag: "link", icon: i('<path d="M4 5h16v3H4zM4 9h16v2H4zM4 13h16v6l-8-3.5L4 19z"/>'), run: openUrl("https://substack.com/@esthertinuadejolugba") },
      { label: "Download CV", tag: "action", icon: i('<path d="M12 4v10m0 0 4-4m-4 4-4-4M5 20h14"/>'), run: () => { close(); window.open("assets/esther-jolugba-cv.pdf", "_blank"); } },
      { label: "Toggle theme", tag: "action", icon: i('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2"/>'), run: () => { close(); $("#themeToggle").click(); } },
    ];

    let active = 0, filtered = COMMANDS.slice();

    function render() {
      if (!filtered.length) { list.innerHTML = '<li class="cmdk__empty">No results</li>'; return; }
      list.innerHTML = filtered
        .map((c, n) =>
          `<li class="cmdk__item ${n === active ? "is-active" : ""}" role="option" data-n="${n}">` +
          `<span class="ico">${c.icon}</span><span class="label">${c.label}</span><span class="tag">${c.tag}</span></li>`
        )
        .join("");
      $$(".cmdk__item", list).forEach((el) => {
        el.addEventListener("mouseenter", () => { active = +el.dataset.n; paint(); });
        el.addEventListener("click", () => filtered[+el.dataset.n].run());
      });
    }
    function paint() { $$(".cmdk__item", list).forEach((el, n) => el.classList.toggle("is-active", n === active)); }
    function filter() {
      const q = input.value.toLowerCase().trim();
      filtered = q ? COMMANDS.filter((c) => c.label.toLowerCase().includes(q)) : COMMANDS.slice();
      active = 0; render();
    }
    function open() {
      cmdk.classList.add("is-open"); cmdk.setAttribute("aria-hidden", "false");
      input.value = ""; filter(); setTimeout(() => input.focus(), 30);
    }
    function close() { cmdk.classList.remove("is-open"); cmdk.setAttribute("aria-hidden", "true"); }

    input.addEventListener("input", filter);
    $("#cmdkOpen").addEventListener("click", open);
    $("#cmdkBackdrop").addEventListener("click", close);

    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); cmdk.classList.contains("is-open") ? close() : open(); return; }
      if (!cmdk.classList.contains("is-open")) return;
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); active = Math.min(active + 1, filtered.length - 1); paint(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); active = Math.max(active - 1, 0); paint(); }
      else if (e.key === "Enter") { e.preventDefault(); if (filtered[active]) filtered[active].run(); }
    });

    // tiny toast for "copied" feedback
    function toast(msg) {
      let t = $("#cmdkToast");
      if (!t) { t = document.createElement("div"); t.id = "cmdkToast"; document.body.appendChild(t);
        Object.assign(t.style, { position: "fixed", bottom: "24px", left: "50%", transform: "translateX(-50%)",
          background: "var(--surface)", border: "1px solid var(--border-strong)", color: "var(--text)",
          padding: "0.7rem 1.2rem", borderRadius: "999px", zIndex: 500, fontSize: "0.9rem",
          boxShadow: "0 20px 50px -20px rgba(0,0,0,0.7)", transition: "opacity .3s, transform .3s" }); }
      t.textContent = msg; t.style.opacity = "1"; t.style.transform = "translateX(-50%) translateY(0)";
      clearTimeout(toast._t); toast._t = setTimeout(() => { t.style.opacity = "0"; t.style.transform = "translateX(-50%) translateY(10px)"; }, 2200);
    }
  })();

  /* ----------------------------- CUSTOM CURSOR ---------------------------- */
  (function cursor() {
    const dot = $("#cursor");
    // Only on devices with a precise pointer and motion allowed.
    if (!dot || reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");
    let x = 0, y = 0, cx = 0, cy = 0, raf;
    const loop = () => { cx += (x - cx) * 0.2; cy += (y - cy) * 0.2; dot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`; raf = requestAnimationFrame(loop); };
    window.addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; dot.classList.add("is-active"); if (!raf) loop(); });
    window.addEventListener("mouseout", () => dot.classList.remove("is-active"));
    const hoverSel = "a, button, .app-icon button, input, select, textarea, .magnetic, [data-tilt]";
    document.addEventListener("mouseover", (e) => { if (e.target.closest(hoverSel)) dot.classList.add("is-hover"); });
    document.addEventListener("mouseout", (e) => { if (e.target.closest(hoverSel)) dot.classList.remove("is-hover"); });
  })();

  /* ------------------------------- 3D TILT -------------------------------- */
  (function tilt() {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;
    $$("[data-tilt]").forEach((el) => {
      el.style.transformStyle = "preserve-3d";
      el.style.transition = "transform 0.15s var(--ease, ease)";
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`;
      });
      el.addEventListener("mouseleave", () => (el.style.transform = ""));
    });
  })();

  /* --------------------------- CONSOLE EASTER EGG ------------------------- */
  (function consoleEgg() {
    try {
      const s1 = "font:600 22px 'Space Grotesk',sans-serif;color:#a06bff";
      const s2 = "font:13px ui-monospace,monospace;color:#c8c4d6";
      console.log("%cHi, curious one 👋", s1);
      console.log("%cYou opened the console — that tells me something about you.\nI'm Esther: I build mobile tech that works, and I'm moving into data science & AI.\nIf you're hiring or want to collaborate: jolugbatinuade@gmail.com\nTip: press ⌘K (or Ctrl+K) anywhere on this page.", s2);
    } catch (_) {}
  })();
})();
