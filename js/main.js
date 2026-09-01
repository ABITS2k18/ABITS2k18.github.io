/* =========================================================
   Abhishek Patel — Quiet Editorial · minimal interactions
   ========================================================= */
(function () {
  "use strict";

  /* Footer year */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          ro.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Active nav link based on section in view */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  var sections = links
    .map(function (l) { return document.querySelector(l.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var byId = {};
    links.forEach(function (l) { byId[l.getAttribute("href").slice(1)] = l; });

    var nav = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("is-active"); });
          var active = byId[e.target.id];
          if (active) active.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (s) { nav.observe(s); });
  }

  /* Contact form */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("cformNote");
  if (form) {
    var isEmail = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); };
    var setNote = function (msg, kind) {
      note.textContent = msg;
      note.className = "cform__note" + (kind ? " is-" + kind : "");
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      setNote("", null);

      // honeypot — if filled, silently drop (likely a bot)
      if (form._gotcha && form._gotcha.value) { return; }

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();

      if (!name || !email || !message) { setNote("Please complete every field.", "error"); return; }
      if (!isEmail(email)) { setNote("Please enter a valid email address.", "error"); return; }

      var action = form.getAttribute("action") || "";

      // Submit to Formspree via fetch (AJAX) so the user stays on the page
      var btn = form.querySelector("button[type=submit]");
      if (btn) btn.disabled = true;
      setNote("Sending…", null);

      fetch(action, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          setNote("Thank you, " + name + ". Your message has been sent.", "ok");
        } else {
          setNote("Something went wrong. Please try again, or reach me on LinkedIn.", "error");
        }
      }).catch(function () {
        setNote("Network error. Please try again, or reach me on LinkedIn.", "error");
      }).finally(function () {
        if (btn) btn.disabled = false;
      });
    });
  }
})();
