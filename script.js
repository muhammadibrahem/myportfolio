/* =============================================
   PORTFOLIO SCRIPT — PURE JS
============================================= */

"use strict";

// =============================================
// PRELOADER
// =============================================
window.addEventListener("load", () => {
  setTimeout(
    () => {
      const preloader = document.getElementById("preloader");
      preloader.classList.add("hidden");

      // Trigger hero reveal
      document
        .querySelectorAll(".reveal-hero, .reveal-hero-img")
        .forEach((el) => {
          el.classList.add("revealed");
        });
    },

    2000,
  );
});

// =============================================
// CUSTOM CURSOR
// =============================================
const cursor = document.getElementById("cursor");
const follower =
  document.getElementById("cursorFollower") ||
  document.getElementById("cursor-follower");
let mouseX = 0,
  mouseY = 0;
let followerX = 0,
  followerY = 0;

if (cursor && follower) {
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + "px";
    follower.style.top = followerY + "px";
    requestAnimationFrame(animateFollower);
  }

  animateFollower();

  document
    .querySelectorAll("a, button, .project-card, .skill-card, .ach-card")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor-hover");
        follower.classList.add("cursor-hover");
      });

      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor-hover");
        follower.classList.remove("cursor-hover");
      });
    });
}

// =============================================
// DARK / LIGHT THEME TOGGLE
// =============================================
const html = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

let currentTheme = localStorage.getItem("portfolio-theme") || "dark";
html.setAttribute("data-theme", currentTheme);
updateThemeIcon();

themeToggle.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", currentTheme);
  localStorage.setItem("portfolio-theme", currentTheme);
  updateThemeIcon();
});

function updateThemeIcon() {
  themeIcon.className = currentTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
}

// =============================================
// NAVBAR BEHAVIOR
// =============================================
const navbar = document.getElementById("navbar");
let lastScrollY = 0;

window.addEventListener(
  "scroll",
  () => {
    const scrollY = window.scrollY;

    // Scrolled class for shadow
    if (scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Hide on scroll down, show on scroll up
    if (scrollY > lastScrollY && scrollY > 200) {
      navbar.classList.add("hidden");
    } else {
      navbar.classList.remove("hidden");
    }

    lastScrollY = scrollY;

    // Active nav link
    updateActiveNavLink();

    // Back to top
    const btt = document.getElementById("back-to-top");
    if (scrollY > 400) btt.classList.add("visible");
    else btt.classList.remove("visible");
  },

  {
    passive: true,
  },
);

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
}

// =============================================
// HAMBURGER MENU
// =============================================
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
  const isOpen = hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", isOpen);
  mobileMenu.setAttribute("aria-hidden", !isOpen);
});

document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
  });
});

// Close mobile menu on outside click
document.addEventListener("click", (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
  }
});

// =============================================
// SMOOTH SCROLL
// =============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (href === "#") return;
    const target = document.querySelector(href);

    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  });
});

// =============================================
// BACK TO TOP
// =============================================
document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// =============================================
// TYPING ANIMATION
// =============================================
const phrases = [
  "build modern web experiences",
  "craft pixel-perfect UIs",
  "engineer scalable apps",
  "turn ideas into interfaces",
  "love clean, elegant code",
];

let phraseIdx = 0,
  charIdx = 0,
  isDeleting = false;
const typingEl = document.getElementById("typing-text");

function type() {
  const phrase = phrases[phraseIdx];

  if (isDeleting) {
    typingEl.textContent = phrase.substring(0, charIdx--);

    if (charIdx < 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(type, 500);
      return;
    }

    setTimeout(type, 50);
  } else {
    typingEl.textContent = phrase.substring(0, charIdx++);

    if (charIdx > phrase.length) {
      isDeleting = true;
      setTimeout(type, 2000);
      return;
    }

    setTimeout(type, 85);
  }
}

setTimeout(type, 2200);

// =============================================
// ANIMATED COUNTERS
// =============================================
function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }

  requestAnimationFrame(update);
}

// =============================================
// INTERSECTION OBSERVER (REVEAL + COUNTERS + SKILL BARS)
// =============================================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay
          ? entry.target.dataset.delay * 80
          : 0;

        setTimeout(
          () => {
            entry.target.classList.add("revealed");
          },

          delay,
        );
        revealObserver.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.1,
    rootMargin: "0px 0px -60px 0px",
  },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// Counter observer
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.5,
  },
);

document
  .querySelectorAll(".stat-num[data-count]")
  .forEach((el) => counterObserver.observe(el));

// Skill bar observer
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const bar = card.querySelector(".skill-fill");
        const width = card.querySelector(".skill-bar").dataset.width;

        if (bar) {
          const delay = (card.dataset.delay || 0) * 100;

          setTimeout(
            () => {
              bar.style.width = width + "%";
            },

            delay,
          );
        }

        skillObserver.unobserve(card);
      }
    });
  },

  {
    threshold: 0.2,
  },
);

document
  .querySelectorAll(".skill-card")
  .forEach((el) => skillObserver.observe(el));

// =============================================
// PROJECT FILTER
// =============================================
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;

    projectCards.forEach((card) => {
      const category = card.dataset.category;
      const show = filter === "all" || category === filter;
      card.classList.toggle("hidden", !show);
    });
  });
});

// =============================================
// PROJECT MODAL
// =============================================
const projects = [
  {
    title: "FinTrack Dashboard",
    desc: "A real-time financial analytics platform with interactive charts, budget tracking, and AI-powered spending insights. Built for finance teams managing multi-account portfolios.",
    tags: ["React", "Chart.js", "Firebase", "TypeScript"],
    features: [
      "Live portfolio tracking with Chart.js visualizations",
      "Firebase Realtime DB for multi-user sync",
      "AI spending categorization engine",
      "Mobile-responsive PWA with offline support",
    ],
    iconClass: "web-ph",
    icon: "fas fa-chart-line",
  },
  {
    title: "TaskFlow App",
    desc: "A cross-platform productivity app with drag-and-drop kanban boards, team collaboration features, and intelligent due-date reminders via push notifications.",
    tags: ["React Native", "Redux", "Node.js", "MongoDB"],
    features: [
      "Drag-and-drop kanban with gesture support",
      "Real-time collaboration via WebSockets",
      "Smart deadline prediction with ML model",
      "iOS & Android native builds from one codebase",
    ],
    iconClass: "app-ph",
    icon: "fas fa-mobile-alt",
  },
  {
    title: "Lumina Design System",
    desc: "A comprehensive component library with 60+ accessible components, full dark mode support, and detailed documentation built with Storybook.",
    tags: ["Figma", "CSS", "Storybook", "Web Components"],
    features: [
      "60+ production-ready UI components",
      "WCAG AA accessibility compliance",
      "Auto-generated Storybook documentation",
      "CSS custom properties for full theming",
    ],
    iconClass: "ui-ph",
    icon: "fas fa-paint-brush",
  },
  {
    title: "ShopSphere E-commerce",
    desc: "Full-stack e-commerce platform with server-side rendering, Stripe payments, real-time inventory management, and a powerful admin dashboard.",
    tags: ["Next.js", "Stripe", "MongoDB", "Tailwind"],
    features: [
      "SSR + ISR for optimal SEO and performance",
      "Stripe Checkout + webhook integrations",
      "Admin panel with real-time inventory updates",
      "Lighthouse score 95+ across all metrics",
    ],
    iconClass: "web2-ph",
    icon: "fas fa-shopping-cart",
  },
  {
    title: "PulseHealth App",
    desc: "A telemedicine platform connecting patients with licensed physicians, featuring HD video calls, digital prescriptions, and integrated health metric tracking.",
    tags: ["Vue.js", "Express", "PostgreSQL", "WebRTC"],
    features: [
      "WebRTC-powered HD video consultations",
      "Digital prescription + pharmacy integration",
      "Health metrics dashboard with trend analysis",
      "HIPAA-compliant data encryption",
    ],
    iconClass: "app2-ph",
    icon: "fas fa-heartbeat",
  },
  {
    title: "Agency Landing Kit",
    desc: "A stunning animated agency landing page template with WebGL background effects, scroll-driven animations via GSAP, and configurable sections.",
    tags: ["HTML", "GSAP", "Three.js", "Webpack"],
    features: [
      "Three.js particle WebGL background",
      "GSAP ScrollTrigger reveals & parallax",
      "Zero-dependency vanilla JS core",
      "Configurable via single config JSON file",
    ],
    iconClass: "ui2-ph",
    icon: "fas fa-layer-group",
  },
];

const modal = document.getElementById("project-modal");
const modalClose = document.getElementById("modal-close");
const modalIcon = document.getElementById("modal-icon");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalTags = document.getElementById("modal-tags");
const modalFeatures = document.getElementById("modal-features");

document.querySelectorAll(".project-modal-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = parseInt(btn.dataset.id);
    const p = projects[id];
    modalIcon.className = "modal-img-ph " + p.iconClass;
    modalIcon.innerHTML = `<i class="${p.icon}"></i>`;
    modalTitle.textContent = p.title;
    modalDesc.textContent = p.desc;

    modalTags.innerHTML = p.tags
      .map(
        (t) => `<span class="tag">$ {
            t
          }

          </span>`,
      )
      .join("");

    modalFeatures.innerHTML =
      "<ul>" +
      p.features
        .map(
          (f) => `<li>$ {
            f
          }

          </li>`,
        )
        .join("") +
      "</ul>";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modalClose.focus();
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// =============================================
// TESTIMONIALS SLIDER
// =============================================
const track = document.getElementById("testimonials-track");
const testimonialCards = document.querySelectorAll(".testimonial-card");
const dotsContainer = document.getElementById("slider-dots");
let currentSlide = 0;
let autoplayTimer;

// Create dots
testimonialCards.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = "slider-dot" + (i === 0 ? " active" : "");
  dot.setAttribute("role", "tab");

  dot.setAttribute(
    "aria-label",
    `Go to testimonial $ {
        i + 1
      }

      `,
  );
  dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

function goToSlide(idx) {
  currentSlide = idx;

  track.style.transform = `translateX(-$ {
      idx * 100
    }

    %)`;

  document.querySelectorAll(".slider-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === idx);
    dot.setAttribute("aria-selected", i === idx ? "true" : "false");
  });
  resetAutoplay();
}

document.getElementById("slider-prev").addEventListener("click", () => {
  goToSlide(
    (currentSlide - 1 + testimonialCards.length) % testimonialCards.length,
  );
});

document.getElementById("slider-next").addEventListener("click", () => {
  goToSlide((currentSlide + 1) % testimonialCards.length);
});

function startAutoplay() {
  autoplayTimer = setInterval(
    () => {
      goToSlide((currentSlide + 1) % testimonialCards.length);
    },

    4500,
  );
}

function resetAutoplay() {
  clearInterval(autoplayTimer);
  startAutoplay();
}

startAutoplay();

// Touch swipe for testimonials
let touchStartX = 0;

track.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },

  {
    passive: true,
  },
);

track.addEventListener(
  "touchend",
  (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) goToSlide((currentSlide + 1) % testimonialCards.length);
      else
        goToSlide(
          (currentSlide - 1 + testimonialCards.length) %
            testimonialCards.length,
        );
    }
  },

  {
    passive: true,
  },
);

// =============================================
// CONTACT FORM
// =============================================
const contactForm = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = "Sending…";
  btn.disabled = true;

  // Simulate form submission
  setTimeout(
    () => {
      contactForm.reset();
      formSuccess.classList.add("show");
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      btn.disabled = false;
      setTimeout(() => formSuccess.classList.remove("show"), 5000);
    },

    1500,
  );
});

// =============================================
// LAZY LOADING IMAGES
// =============================================
if ("loading" in HTMLImageElement.prototype) {
  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    img.src = img.src;
  });
} else {
  const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        lazyObserver.unobserve(img);
      }
    });
  });
  document
    .querySelectorAll('img[loading="lazy"]')
    .forEach((img) => lazyObserver.observe(img));
}

// =============================================
// KEYBOARD NAVIGATION & ACCESSIBILITY
// =============================================
document.addEventListener("keydown", (e) => {
  // Skip to main content on Tab
  if (e.key === "Tab" && document.body.classList.contains("no-outline")) {
    document.body.classList.remove("no-outline");
  }
});

document.addEventListener("mousedown", () => {
  document.body.classList.add("no-outline");
});

// =============================================
// PARALLAX EFFECT ON HERO ORBS
// =============================================
const orb1 = document.querySelector(".hero-orb-1");
const orb2 = document.querySelector(".hero-orb-2");

window.addEventListener(
  "mousemove",
  (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;

    if (orb1)
      orb1.style.transform = `translate($ {
        x
      }

      px, $ {
        y
      }

      px)`;

    if (orb2)
      orb2.style.transform = `translate($ {
        -x * 0.7
      }

      px, $ {
        -y * 0.7
      }

      px)`;
  },

  {
    passive: true,
  },
);

// =============================================
// INIT — fire reveal for elements already in view
// =============================================
window.addEventListener("DOMContentLoaded", () => {
  // Small timeout for layout to settle
  setTimeout(
    () => {
      document.querySelectorAll(".reveal").forEach((el) => {
        const rect = el.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.9) {
          el.classList.add("revealed");
        }
      });
    },

    100,
  );
});

console.log(
  "%c Muhammad Ibrahim Portfolio ",
  "background: linear-gradient(135deg, #c9a96e, #8b6fd4); color: white; font-size: 14px; font-weight: bold; padding: 8px 16px; border-radius: 4px;",
);
console.log(
  "%c Built with ♥ using pure HTML, CSS & JS",
  "color: #c9a96e; font-size: 12px;",
);
