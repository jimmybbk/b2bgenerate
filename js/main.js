// ===== B2BGenerate shared site script =====

// ===== Lead delivery =====
// FormSubmit auto-emails every submission to the address below — no mail popup for the visitor.
// One-time setup: the very first submission makes FormSubmit send an activation link to that
// inbox; clicking it once switches on automatic delivery for all future submissions.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/hello@b2bgenerate.com";
const LEAD_EMAIL = "hello@b2bgenerate.com";
const WHATSAPP_NUMBER = "61450463767"; // international format without "+", for wa.me links

async function deliverLead(payload) {
  if (FORM_ENDPOINT) {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        _subject: "New B2BGenerate website lead",
        _template: "table",
        _captcha: "false"
      })
    });
    if (!res.ok) throw new Error("Lead delivery failed");
    return;
  }
  // Fallback: compose an email with the lead details
  const body = encodeURIComponent(
    Object.entries(payload).map(([k, v]) => k.toUpperCase() + ": " + v).join("\n")
  );
  window.location.href = "mailto:" + LEAD_EMAIL + "?subject=" +
    encodeURIComponent("New website lead") + "&body=" + body;
}

document.addEventListener("DOMContentLoaded", () => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Sticky header shadow
  const header = document.getElementById("siteHeader");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Mobile nav
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const open = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open);
    });
    mainNav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-q");
    const panel = item.querySelector(".faq-a");
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((other) => {
        other.classList.remove("open");
        other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        other.querySelector(".faq-a").style.maxHeight = "0px";
      });
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // ===== Interactive enhancements =====
    // Scroll progress bar (sitewide)
    const progress = document.createElement("div");
    progress.className = "scroll-progress";
    document.body.appendChild(progress);
    const setProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", setProgress, { passive: true });
    window.addEventListener("resize", setProgress);
    setProgress();

    // Back-to-top button (sitewide)
    const toTop = document.createElement("button");
    toTop.className = "to-top";
    toTop.setAttribute("aria-label", "Back to top");
    toTop.innerHTML = "&uarr;";
    document.body.appendChild(toTop);
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" }));
    const toggleTop = () => toTop.classList.toggle("show", window.scrollY > 600);
    window.addEventListener("scroll", toggleTop, { passive: true });
    toggleTop();

    // WhatsApp mini-chat panel (sitewide)
    const waWidget = document.querySelector(".wa-widget");
    if (waWidget) {
      const chat = document.createElement("div");
      chat.className = "wa-chat";
      chat.setAttribute("role", "dialog");
      chat.setAttribute("aria-label", "Chat with B2BGenerate on WhatsApp");
      chat.innerHTML =
        '<div class="wa-chat-head"><button class="wa-chat-close" aria-label="Close chat">&times;</button><b>B2BGenerate</b><small>Typically replies within the hour (ICT)</small></div>' +
        '<div class="wa-chat-body"><div class="wa-hello">Hi there \uD83D\uDC4B Looking to generate more leads? Pick a topic and we will continue on WhatsApp:</div>' +
        '<button class="wa-opt" data-msg="I\'d like to book a strategy call.">\uD83D\uDCC5 Book a strategy call</button>' +
        '<button class="wa-opt" data-msg="I have a question about your pricing.">\uD83D\uDCB0 Pricing question</button>' +
        '<button class="wa-opt" data-msg="I\'d like a free cold email campaign plan.">\uD83D\uDCC4 Free campaign plan</button>' +
        '<button class="wa-opt" data-msg="I need help with email deliverability.">\uD83D\uDEE0 Deliverability help</button>' +
        '<div class="wa-chat-foot">Opens WhatsApp \u00b7 0450 463 767</div></div>';
      document.body.appendChild(chat);
      waWidget.addEventListener("click", (e) => {
        e.preventDefault();
        chat.classList.toggle("open");
      });
      chat.querySelector(".wa-chat-close").addEventListener("click", () => chat.classList.remove("open"));
      chat.querySelectorAll(".wa-opt").forEach((btn) => {
        btn.addEventListener("click", () => {
          window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(btn.dataset.msg), "_blank", "noopener");
          chat.classList.remove("open");
        });
      });
    }

    // Animated counters
    const counters = document.querySelectorAll("[data-count]");
    if (counters.length) {
      const fmtCount = (v) => Math.round(v).toLocaleString("en-US");
      const runCounter = (el) => {
        const target = parseFloat(el.dataset.count);
        if (prefersReduced) { el.textContent = fmtCount(target); return; }
        const t0 = performance.now(), dur = 1300;
        const tick = (now) => {
          const k = Math.min((now - t0) / dur, 1);
          el.textContent = fmtCount(target * (1 - Math.pow(1 - k, 3)));
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      };
      const cio = new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) { runCounter(en.target); cio.unobserve(en.target); }
      }), { threshold: 0.4 });
      counters.forEach((el) => cio.observe(el));
    }

    // Dashboard bar animation
    const dash = document.querySelector(".dash");
    if (dash && !prefersReduced) {
      dash.classList.add("pre");
      const dio = new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) {
          requestAnimationFrame(() => dash.classList.add("animate"));
          dio.unobserve(dash);
        }
      }), { threshold: 0.35 });
      dio.observe(dash);
    }

    // Testimonial carousel (home)
    const tCarousel = document.getElementById("tCarousel");
    if (tCarousel) {
      const track = tCarousel.querySelector(".t-track");
      const slides = tCarousel.querySelectorAll(".t-slide");
      const dotsBox = tCarousel.querySelector(".t-dots");
      let idx = 0, timer = null;
      slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.className = "t-dot";
        dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
        dot.addEventListener("click", () => { go(i); restart(); });
        dotsBox.appendChild(dot);
      });
      const dots = dotsBox.querySelectorAll(".t-dot");
      const go = (i) => {
        idx = (i + slides.length) % slides.length;
        track.style.transform = "translateX(-" + idx * 100 + "%)";
        dots.forEach((d, di) => d.classList.toggle("active", di === idx));
      };
      const restart = () => {
        if (prefersReduced) return;
        clearInterval(timer);
        timer = setInterval(() => go(idx + 1), 6000);
      };
      tCarousel.querySelector(".t-prev").addEventListener("click", () => { go(idx - 1); restart(); });
      tCarousel.querySelector(".t-next").addEventListener("click", () => { go(idx + 1); restart(); });
      tCarousel.addEventListener("mouseenter", () => clearInterval(timer));
      tCarousel.addEventListener("mouseleave", restart);
      go(0);
      restart();
    }

    // Rotating hero headline (home)
    const heroWord = document.getElementById("heroWord");
    if (heroWord && !prefersReduced) {
      const words = ["qualified meetings", "booked sales calls", "sales conversations", "pipeline growth"];
      let wi = 0, ci = words[0].length, deleting = true;
      const step = () => {
        const word = words[wi];
        if (deleting) {
          ci--;
          if (ci <= 0) { deleting = false; wi = (wi + 1) % words.length; }
        } else {
          ci++;
          if (ci >= word.length) { heroWord.textContent = word; setTimeout(step, 2400); return; }
        }
        heroWord.textContent = word.slice(0, ci);
        setTimeout(step, deleting ? 30 : 65);
      };
      setTimeout(step, 2600);
    }

    // FAQ live search (home)
    const faqSearch = document.getElementById("faqSearch");
    if (faqSearch) {
      const faqItems = document.querySelectorAll(".faq-item");
      const faqEmpty = document.getElementById("faqEmpty");
      faqSearch.addEventListener("input", () => {
        const q = faqSearch.value.trim().toLowerCase();
        let visible = 0;
        faqItems.forEach((item) => {
          const match = item.textContent.toLowerCase().includes(q);
          item.hidden = !match;
          if (match) visible++;
        });
        if (faqEmpty) faqEmpty.hidden = visible !== 0;
      });
    }

    // Button ripple (sitewide)
    if (!prefersReduced) {
      document.addEventListener("click", (e) => {
        const btn = e.target.closest(".btn");
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 1.2;
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
        ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 650);
      });
    }

    // Lead calculator (home)
    const calcRoot = document.getElementById("calcRoot");
    if (calcRoot) {
      const fmtN = (v) => Math.round(v).toLocaleString("en-US");
      const updateCalc = () => {
        const emails = +document.getElementById("cr-emails").value;
        const reply = +document.getElementById("cr-reply").value;
        const pos = +document.getElementById("cr-pos").value;
        const meet = +document.getElementById("cr-meet").value;
        document.getElementById("cv-emails").textContent = fmtN(emails);
        document.getElementById("cv-reply").textContent = reply + "%";
        document.getElementById("cv-pos").textContent = pos + "%";
        document.getElementById("cv-meet").textContent = meet + "%";
        const replies = emails * (reply / 100);
        const positives = replies * (pos / 100);
        document.getElementById("cv-out-replies").textContent = fmtN(replies);
        document.getElementById("cv-out-pos").textContent = fmtN(positives);
        document.getElementById("cv-out-meetings").textContent = fmtN(positives * (meet / 100));
      };
      ["emails", "reply", "pos", "meet"].forEach((id) =>
        document.getElementById("cr-" + id).addEventListener("input", updateCalc));
      updateCalc();
    }


  // Campaign plan form (contact page)
  const planForm = document.getElementById("planForm");
  if (planForm) {
    planForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      if (!form.reportValidity()) return;
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = "Sending…";
      const data = Object.fromEntries(new FormData(form).entries());
      try {
        await deliverLead({ type: "campaign plan request", ...data });
        form.style.display = "none";
        document.getElementById("planSuccess").classList.add("show");
      } catch (err) {
        alert("Sorry, something went wrong sending your request. Please WhatsApp us or email " + LEAD_EMAIL + " directly.");
      }
      btn.disabled = false;
      btn.textContent = "Request my campaign plan";
    });
  }

  // Footer message form (all pages)
  const footerForm = document.getElementById("footerForm");
  if (footerForm) {
    footerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      if (!form.reportValidity()) return;
      const data = Object.fromEntries(new FormData(form).entries());
      try {
        await deliverLead({ type: "footer message", ...data });
        form.innerHTML = '<p style="color:#fff">✓ Thanks! Your message has been sent. We reply within one business day.</p>';
      } catch (err) {
        alert("Sorry, something went wrong. Please WhatsApp us or email " + LEAD_EMAIL + " directly.");
      }
    });
  }

  // Current year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
