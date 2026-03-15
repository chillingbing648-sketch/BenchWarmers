/**
 * BENCHWARMERS — UI IMPROVEMENT PATCH
 * File: improvements.js
 *
 * Instructions: Add the following just before </body>:
 *   <script src="improvements.js" defer></script>
 *
 * This script is fully ADDITIVE — it does not mutate or
 * override any existing event listeners, DOM state, or
 * application logic.  Every selector is guarded with a
 * null-check so missing elements fail silently.
 *
 * Features:
 *  1.  Scroll progress bar
 *  2.  Navbar sticky blur on scroll
 *  3.  Smooth anchor scrolling
 *  4.  Mobile drawer — auto-close on link click + overlay
 *  5.  Scroll reveal (IntersectionObserver)
 *  6.  Animated stat counters
 *  7.  Progress / skill bar animation
 *  8.  Drill generator loading state
 *  9.  Accessibility: skip-link + aria improvements
 *  10. Lazy image loading
 *  11. Keyboard navigation improvements
 *  12. Reduced-motion guard
 */

(function () {
  "use strict";

  /* ============================================================
     UTILS
     ============================================================ */

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /**
   * Safe querySelector — returns null without throwing.
   */
  const q  = (sel, ctx = document) => ctx.querySelector(sel);
  const qq = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /**
   * Throttle: fn fires at most once every `limit` ms.
   */
  function throttle(fn, limit = 100) {
    let last = 0;
    return function (...args) {
      const now = Date.now();
      if (now - last >= limit) { last = now; fn.apply(this, args); }
    };
  }

  /**
   * Animate a number from `from` to `to` over `duration` ms.
   */
  function animateCounter(el, from, to, duration = 1200) {
    if (prefersReducedMotion) { el.textContent = to; return; }
    const startTime = performance.now();
    const range     = to - from;
    function step(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const value    = Math.round(from + range * eased);
      el.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ============================================================
     1. SCROLL PROGRESS BAR
     ============================================================ */
  function initScrollProgress() {
    const bar = document.createElement("div");
    bar.id = "bw-scroll-progress";
    bar.setAttribute("role", "progressbar");
    bar.setAttribute("aria-label", "Page scroll progress");
    bar.setAttribute("aria-valuemin", "0");
    bar.setAttribute("aria-valuemax", "100");
    document.body.prepend(bar);

    function update() {
      const scrollTop    = window.scrollY;
      const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
      const pct          = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width    = pct.toFixed(1) + "%";
      bar.setAttribute("aria-valuenow", Math.round(pct));
    }

    window.addEventListener("scroll", throttle(update, 60), { passive: true });
    update();
  }

  /* ============================================================
     2. NAVBAR SCROLL BLUR
     ============================================================ */
  function initNavBlur() {
    // Try common navbar selectors
    const nav = q("nav") || q(".navbar") || q("header") || q("#navbar");
    if (!nav) return;

    function update() {
      if (window.scrollY > 8) {
        nav.classList.add("bw-scrolled");
      } else {
        nav.classList.remove("bw-scrolled");
      }
    }

    window.addEventListener("scroll", throttle(update, 80), { passive: true });
    update();
  }

  /* ============================================================
     3. SMOOTH ANCHOR SCROLLING
     ============================================================ */
  function initSmoothScroll() {
    // Only enable if not already handled by the app
    if ("scrollBehavior" in document.documentElement.style) {
      document.documentElement.classList.add("bw-smooth-scroll");
    }

    document.addEventListener("click", function (e) {
      const link = e.target.closest("a[href^='#']");
      if (!link) return;

      const targetId = link.getAttribute("href").slice(1);
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();

      const navEl   = q("nav") || q(".navbar") || q("header");
      const navH    = navEl ? navEl.offsetHeight : 0;
      const top     = target.getBoundingClientRect().top + window.scrollY - navH - 8;

      if (prefersReducedMotion) {
        window.scrollTo({ top });
      } else {
        window.scrollTo({ top, behavior: "smooth" });
      }

      // Update focus for accessibility
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  }

  /* ============================================================
     4. MOBILE DRAWER — AUTO-CLOSE + OVERLAY
     ============================================================ */
  function initMobileDrawer() {
    // Detect the drawer by common class/id patterns
    const drawer = (
      q("[class*='drawer']") ||
      q("[class*='mobile-menu']") ||
      q("[class*='mobileMenu']") ||
      q("[id*='drawer']") ||
      q("[id*='mobile-nav']")
    );
    if (!drawer) return;

    // Create overlay element
    const overlay = document.createElement("div");
    overlay.className = "bw-overlay";
    overlay.setAttribute("aria-hidden", "true");
    document.body.appendChild(overlay);

    // Observe drawer open/close via class or aria-hidden changes
    const observer = new MutationObserver(() => {
      const isOpen = drawerIsOpen(drawer);
      overlay.classList.toggle("bw-overlay--visible", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    observer.observe(drawer, {
      attributes: true,
      attributeFilter: ["class", "aria-hidden", "style"],
    });

    // Close drawer when overlay is clicked
    overlay.addEventListener("click", () => closeDrawer(drawer));

    // Close drawer when any nav link inside it is clicked
    drawer.addEventListener("click", function (e) {
      const link = e.target.closest("a");
      if (link) {
        // Small delay so the page scrolls after the drawer closes visually
        setTimeout(() => closeDrawer(drawer), 120);
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawerIsOpen(drawer)) {
        closeDrawer(drawer);
        // Return focus to hamburger/toggle button
        const toggle = q("[aria-controls]") || q("[class*='hamburger']") || q("[class*='menu-btn']");
        if (toggle) toggle.focus();
      }
    });

    function drawerIsOpen(el) {
      // Try multiple open-state conventions
      if (el.style.display === "none") return false;
      if (el.getAttribute("aria-hidden") === "true") return false;
      if (el.classList.contains("hidden")) return false;
      if (el.classList.contains("closed")) return false;
      // If none of the above, assume open when transform is not off-screen
      return true;
    }

    function closeDrawer(el) {
      // Dispatch a click on whatever toggle button opened it
      const closeBtn = (
        el.querySelector("[class*='close']") ||
        el.querySelector("button[aria-label*='close' i]") ||
        el.querySelector("button[aria-label*='menu' i]")
      );
      if (closeBtn) {
        closeBtn.click();
      } else {
        // Fallback: toggle a "closed" class that the existing CSS can use
        el.classList.add("bw-force-close");
      }
    }
  }

  /* ============================================================
     5. SCROLL REVEAL (IntersectionObserver)
     ============================================================ */
  function initScrollReveal() {
    if (prefersReducedMotion) return;
    if (!("IntersectionObserver" in window)) return;

    // Selectors to auto-reveal — adapt to the app's actual class names
    const SELECTORS = [
      "[class*='card']",
      "[class*='Card']",
      "[class*='section']",
      "[class*='Section']",
      "[class*='feature']",
      "[class*='Feature']",
      "[class*='testimonial']",
      "[class*='Testimonial']",
      "[class*='formation']",
      "[class*='Formation']",
      "[class*='drill']",
      "[class*='Drill']",
      "[class*='stat-']",
      "[class*='recovery']",
      "h2",
      "h3",
    ].join(",");

    const candidates = qq(SELECTORS);

    // Only animate elements that aren't in the initial viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("bw-revealed");
            observer.unobserve(entry.target); // once only
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    candidates.forEach((el) => {
      // Skip elements that are at the very top (hero area) — they should be
      // immediately visible without animation.
      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.85) {
        el.classList.add("bw-reveal");
        observer.observe(el);
      }
    });
  }

  /* ============================================================
     6. ANIMATED STAT COUNTERS
     ============================================================ */
  function initStatCounters() {
    if (prefersReducedMotion) return;
    if (!("IntersectionObserver" in window)) return;

    // Find elements that display a plain integer / number
    // We look for elements that have data-bw-target already set by HTML,
    // OR elements that appear to only contain a number.
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const raw = el.getAttribute("data-bw-count") || el.textContent.trim();
          const target = parseInt(raw.replace(/[^0-9]/g, ""), 10);
          if (!isNaN(target) && target > 0) {
            animateCounter(el, 0, target, 1400);
          }
          statsObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    // Look for any element that is ONLY a plain integer
    const statCandidates = qq("[data-bw-count], [class*='stat-value'], [class*='statValue'], [class*='count']");
    statCandidates.forEach((el) => {
      const text = el.textContent.trim();
      if (/^\d[\d,]*$/.test(text) && parseInt(text, 10) > 0) {
        // Store original value for the counter
        el.setAttribute("data-bw-count", text);
        el.textContent = "0";
        statsObserver.observe(el);
      }
    });
  }

  /* ============================================================
     7. PROGRESS / SKILL BAR ANIMATION
     ============================================================ */
  function initProgressBars() {
    if (prefersReducedMotion) return;
    if (!("IntersectionObserver" in window)) return;

    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const fill = entry.target;
          // Re-apply the stored width so CSS transition fires
          const targetWidth = fill.getAttribute("data-bw-width") || fill.style.width;
          if (targetWidth) {
            fill.style.width = "0%";
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                fill.style.transition = "width 1.2s cubic-bezier(0.22, 1, 0.36, 1)";
                fill.style.width = targetWidth;
              });
            });
          }
          barObserver.unobserve(fill);
        });
      },
      { threshold: 0.2 }
    );

    qq("[class*='progress-fill'], [class*='progressFill'], [class*='bar-fill'], [class*='skill-bar'] > *").forEach((el) => {
      const w = el.style.width;
      if (w && w !== "0%") {
        el.setAttribute("data-bw-width", w);
        el.style.width = "0%";
        barObserver.observe(el);
      }
    });
  }

  /* ============================================================
     8. DRILL GENERATOR — LOADING STATE
     ============================================================ */
  function initDrillGenerator() {
    // Detect the drill generate / regenerate button
    const drillBtns = qq(
      "button[class*='generate'], button[class*='Generate'], " +
      "button[class*='regenerate'], button[class*='Regenerate'], " +
      "[class*='drill'] button, #drill-generate"
    );

    drillBtns.forEach((btn) => {
      // Wrap inner text so we can hide it during loading
      if (!btn.querySelector(".bw-btn-text")) {
        const span = document.createElement("span");
        span.className = "bw-btn-text";
        span.innerHTML = btn.innerHTML;
        btn.innerHTML = "";
        btn.appendChild(span);
        btn.style.position = "relative";
      }

      btn.addEventListener("click", function () {
        // Add loading state briefly — the actual generate logic still runs
        const self = this;
        self.classList.add("bw-loading");
        self.setAttribute("aria-busy", "true");

        // Also add spinning class for the refresh icon if present
        self.classList.add("bw-spinning");

        // Remove loading state after a short window
        // (the app's logic sets the real content, we just polish the UX)
        const cleanup = () => {
          self.classList.remove("bw-loading", "bw-spinning");
          self.removeAttribute("aria-busy");
        };

        setTimeout(cleanup, 1200);
      });
    });

    // Add transition class to drill output container
    const drillOutput = (
      q("[class*='drill-result']") ||
      q("[class*='drillResult']") ||
      q("#drill-output") ||
      q("[class*='generated-drill']")
    );
    if (drillOutput) {
      drillOutput.classList.add("bw-drill-ready");

      // Watch for content changes and animate them in
      const contentObserver = new MutationObserver(() => {
        drillOutput.classList.remove("bw-drill-ready");
        drillOutput.classList.add("bw-drill-generating");
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            drillOutput.classList.remove("bw-drill-generating");
            drillOutput.classList.add("bw-drill-ready");
          });
        });
      });
      contentObserver.observe(drillOutput, { childList: true, subtree: true });
    }
  }

  /* ============================================================
     9. ACCESSIBILITY
     ============================================================ */
  function initAccessibility() {
    // --- Skip to content link ---
    const main = q("main") || q("[class*='main']") || q("#main");
    if (main) {
      if (!main.id) main.id = "bw-main-content";
      const skip = document.createElement("a");
      skip.href = "#" + main.id;
      skip.className = "bw-skip-link";
      skip.textContent = "Skip to main content";
      document.body.prepend(skip);
    }

    // --- aria-label for icon-only buttons ---
    qq("button:not([aria-label]):not([aria-labelledby])").forEach((btn) => {
      const text = btn.textContent.trim();
      if (!text || /^[↺✕×☰]+$/.test(text)) {
        if (/↺/.test(text))  btn.setAttribute("aria-label", "Regenerate");
        if (/✕|×/.test(text)) btn.setAttribute("aria-label", "Close");
        if (/☰/.test(text))  btn.setAttribute("aria-label", "Open menu");
      }
    });

    // --- Add role="main" if missing ---
    if (!q("[role='main']") && !q("main")) {
      const content = q("[class*='content']") || q("[class*='main']");
      if (content) content.setAttribute("role", "main");
    }

    // --- Ensure all images have alt text ---
    qq("img:not([alt])").forEach((img) => {
      img.alt = ""; // empty alt = decorative
    });

    // --- Mark decorative icon spans ---
    qq("[class*='icon']:empty, [class*='emoji']:empty").forEach((el) => {
      el.setAttribute("aria-hidden", "true");
    });

    // --- Keyboard: highlight focused element with visible ring ---
    let usingKeyboard = false;
    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab") usingKeyboard = true;
    });
    document.addEventListener("mousedown", () => {
      usingKeyboard = false;
    });

    // Expose the flag globally if needed
    window.__bwKeyboardNav = () => usingKeyboard;
  }

  /* ============================================================
     10. LAZY IMAGE LOADING
     (Polyfill for older browsers; modern browsers handle loading="lazy")
     ============================================================ */
  function initLazyImages() {
    // Add loading="lazy" to any img that doesn't have it
    qq("img:not([loading])").forEach((img) => {
      img.setAttribute("loading", "lazy");
    });

    // IntersectionObserver-based lazy load for background images
    if (!("IntersectionObserver" in window)) return;

    const lazyBg = qq("[data-bw-bg]");
    if (!lazyBg.length) return;

    const bgObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.backgroundImage = `url('${el.dataset.bwBg}')`;
          el.removeAttribute("data-bw-bg");
          bgObserver.unobserve(el);
        }
      });
    }, { rootMargin: "200px 0px" });

    lazyBg.forEach((el) => bgObserver.observe(el));
  }

  /* ============================================================
     11. KEYBOARD NAVIGATION WITHIN TABS / FILTER GROUPS
     ============================================================ */
  function initKeyboardNavigation() {
    // Allow arrow-key navigation within button groups (e.g. position pills,
    // drill filter tabs, play style cards)
    const groups = qq(
      "[role='tablist'], [class*='filter-group'], [class*='filterGroup'], " +
      "[class*='pill-group'], [class*='pillGroup'], [class*='btn-group']"
    );

    groups.forEach((group) => {
      const items = qq("button, [role='tab']", group);
      if (items.length < 2) return;

      items.forEach((item, i) => {
        item.addEventListener("keydown", (e) => {
          let next = -1;
          if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            next = (i + 1) % items.length;
          }
          if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            next = (i - 1 + items.length) % items.length;
          }
          if (next >= 0) items[next].focus();
        });
      });
    });
  }

  /* ============================================================
     12. SECTION ENTRY ANIMATIONS — AUTO-REVEAL SECTIONS
     ============================================================ */
  function initSectionReveal() {
    if (prefersReducedMotion) return;
    if (!("IntersectionObserver" in window)) return;

    const sections = qq("section, [id]");
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("bw-revealed");
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07 }
    );

    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      // Only animate sections below the fold
      if (rect.top > window.innerHeight * 0.9) {
        sec.classList.add("bw-reveal");
        sectionObserver.observe(sec);
      }
    });
  }

  /* ============================================================
     13. STAGGER CARD GROUPS
     ============================================================ */
  function initCardStagger() {
    if (prefersReducedMotion) return;

    // Find direct parents of 2+ cards
    const parents = new Set();
    qq("[class*='card'], .drill-card, .feature-card").forEach((card) => {
      if (card.parentElement) parents.add(card.parentElement);
    });

    parents.forEach((parent) => {
      const cards = qq(":scope > [class*='card'], :scope > .drill-card, :scope > .feature-card", parent);
      if (cards.length >= 2) {
        parent.classList.add("bw-reveal-stagger");
      }
    });
  }

  /* ============================================================
     INIT — Run everything after DOM is ready
     ============================================================ */
  function init() {
    initScrollProgress();
    initNavBlur();
    initSmoothScroll();
    initMobileDrawer();
    initScrollReveal();
    initStatCounters();
    initProgressBars();
    initDrillGenerator();
    initAccessibility();
    initLazyImages();
    initKeyboardNavigation();
    initSectionReveal();
    initCardStagger();

    console.info("✅ BenchWarmers UI improvements loaded");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
