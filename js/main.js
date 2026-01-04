document.addEventListener("DOMContentLoaded", () => {
  initHamburger();
  initScrollAnimation();
});

function initHamburger() {
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("mobile-overlay");

  if (!btn || !menu || !overlay) return;

  const ICON_OPEN = "☰";
  const ICON_CLOSE = "✕";

  const openMenu = () => {
    menu.classList.remove("translate-x-full");
    overlay.classList.remove("opacity-0", "pointer-events-none");
    btn.textContent = ICON_CLOSE;
  };

  const closeMenu = () => {
    menu.classList.add("translate-x-full");
    overlay.classList.add("opacity-0", "pointer-events-none");
    btn.textContent = ICON_OPEN;
  };

  // toggle hamburger
  btn.addEventListener("click", () => {
    menu.classList.contains("translate-x-full")
      ? openMenu()
      : closeMenu();
  });

  // klik area gelap = close
  overlay.addEventListener("click", closeMenu);

  // klik menu link = close
  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });
}


function initScrollAnimation() {
  const elements = document.querySelectorAll("[data-animate]");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.05}s`;
    observer.observe(el);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll("[data-animate]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); // animasi sekali saja
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  animatedElements.forEach((el, index) => {
    // efek stagger halus
    el.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(el);
  });
});

