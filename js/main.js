// ===== B2BGenerate shared site script =====

// ===== Lead delivery =====
// FormSubmit auto-emails every submission to the address below — no mail popup for the visitor.
// One-time setup: the very first submission makes FormSubmit send an activation link to that
// inbox; clicking it once switches on automatic delivery for all future submissions.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/hello@b2bgenerate.com";
const LEAD_EMAIL = "hello@b2bgenerate.com";
const WHATSAPP_NUMBER = "61466554433"; // international format without "+", for wa.me links

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
