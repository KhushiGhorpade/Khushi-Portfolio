/* ==========================================================================
   PORTFOLIO SCRIPT
   Sections: footer year, mobile nav, theme toggle, network background
   animation, typed-role effect, scroll-reveal animations, and the
   EmailJS contact form.
   ========================================================================== */

/* ---- Footer year ------------------------------------------------------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---- Mobile nav toggle -------------------------------------------------- */
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ==========================================================================
   THEME TOGGLE (dark / light)
   Preference is remembered in localStorage so it persists on return visits.
   ========================================================================== */
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("kg-theme", theme);

  const moon = document.querySelector(".theme-toggle__icon--moon");
  const sun = document.querySelector(".theme-toggle__icon--sun");

  if (theme === "dark") {
    // Show sun because clicking it will switch to light
    sun.style.display = "block";
    moon.style.display = "none";
  } else {
    // Show moon because clicking it will switch to dark
    sun.style.display = "none";
    moon.style.display = "block";
  }
}

/* ==========================================================================
   NETWORK BACKGROUND CANVAS
   Lightweight animated nodes-and-lines effect, evoking a security /
   network-monitoring dashboard. Fully decorative, pauses off-screen and
   respects prefers-reduced-motion.
   ========================================================================== */
function initNetworkCanvas() {
  const canvas = document.getElementById("netCanvas");
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let width, height, nodes;
  const NODE_COUNT = 60;
  const LINK_DIST = 130;

  function getColors() {
    const styles = getComputedStyle(root);
    return {
      line: styles.getPropertyValue("--net-line").trim(),
      node: styles.getPropertyValue("--net-node").trim(),
    };
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function makeNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));
  }

  function step() {
    const colors = getColors();
    ctx.clearRect(0, 0, width, height);

    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          ctx.strokeStyle = colors.line;
          ctx.lineWidth = 1;
          ctx.globalAlpha = 1 - dist / LINK_DIST;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;

    for (const n of nodes) {
      ctx.fillStyle = colors.node;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }

    if (!reduceMotion) requestAnimationFrame(step);
  }

  resize();
  makeNodes();
  window.addEventListener("resize", () => {
    resize();
    makeNodes();
  });

  if (reduceMotion) {
    step(); // draw a single static frame, no animation loop
  } else {
    requestAnimationFrame(step);
  }
}
initNetworkCanvas();

/* ==========================================================================
   TYPED ROLE EFFECT
   Cycles through a short list of roles in the hero, typewriter-style.
   ========================================================================== */
function initTypedRole() {
  const el = document.getElementById("typedRole");
  const roles = [
    "Cybersecurity Enthusiast",
    "Aspiring SOC Analyst",
    "BCA Graduate",
    "CEH in Progress",
  ];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    el.textContent = roles[0];
    return;
  }

  let roleIndex = 0, charIndex = 0, deleting = false;

  function tick() {
    const current = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 65);
  }
  tick();
}
initTypedRole();

/* ==========================================================================
   SCROLL REVEAL
   Fades/slides elements with the .reveal class in as they enter view.
   ========================================================================== */
function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    targets.forEach((t) => t.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("is-visible"), i * 40);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((t) => observer.observe(t));
}
initScrollReveal();

/* ==========================================================================
   CONTACT FORM — EmailJS
   --------------------------------------------------------------------------
   STEP 1: Replace the three placeholder values below with your own,
           after following the EmailJS setup steps in SETUP-GUIDE.md:

             - PUBLIC_KEY   -> found in EmailJS Account > General
             - SERVICE_ID   -> found in EmailJS Email Services
             - TEMPLATE_ID  -> found in EmailJS Email Templates

   STEP 2: Your EmailJS template should use variables that match the
           form field "name" attributes used below:
             {{from_name}}, {{reply_to}}, {{message}}
   ========================================================================== */

const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";   // EDIT ME
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";   // EDIT ME
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // EDIT ME

if (window.emailjs && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");
const contactSubmit = document.getElementById("contactSubmit");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
    contactStatus.dataset.state = "error";
    contactStatus.textContent =
      "Contact form isn't connected yet — add your EmailJS keys in js/script.js (see SETUP-GUIDE.md).";
    return;
  }

  contactSubmit.disabled = true;
  contactSubmit.textContent = "Sending...";
  contactStatus.dataset.state = "";
  contactStatus.textContent = "";

  emailjs
    .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
    .then(() => {
      contactStatus.dataset.state = "success";
      contactStatus.textContent = "Message sent — thank you! I'll get back to you soon.";
      contactForm.reset();
    })
    .catch((error) => {
      contactStatus.dataset.state = "error";
      contactStatus.textContent = "Something went wrong. Please try again or email me directly.";
      console.error("EmailJS error:", error);
    })
    .finally(() => {
      contactSubmit.disabled = false;
      contactSubmit.textContent = "Send Message";
    });
});
