document.addEventListener("DOMContentLoaded", () => {
  initHamburger();
});

function initHamburger() {
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");

  if (!btn || !menu) return;

  const ICON_OPEN = "☰";
  const ICON_CLOSE = "✕";

  const openMenu = () => {
    menu.classList.add("open");
    menu.style.maxHeight = menu.scrollHeight + "px";
    menu.style.opacity = "1";
    btn.textContent = ICON_CLOSE;
  };

  const closeMenu = () => {
    menu.classList.remove("open");
    menu.style.maxHeight = "0px";
    menu.style.opacity = "0";
    btn.textContent = ICON_OPEN;
  };

  // Toggle button ☰ / ✕
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.contains("open") ? closeMenu() : openMenu();
  });

  // Klik menu → otomatis close
  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

}

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll("[data-animate]").forEach(el => {
    observer.observe(el);
  });
