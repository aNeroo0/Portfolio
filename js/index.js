document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // --- SELETTORI DESKTOP ---
  const settingsToggle = document.getElementById("settingsToggle");
  const settingsMenu = document.getElementById("settingsMenu");
  const settingsContainer = document.querySelector(".settings-container");

  // --- SELETTORI MENU MOBILE ---
  const menuToggle = document.getElementById("menuToggle");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuLinks = document.querySelectorAll(".mobile-nav a, .menu-box a");

  // --- TOGGLE TEMA / FONT DESKTOP + MOBILE ---
  const themeToggles = document.querySelectorAll("#themeToggle, #themeToggleMobile");
  const fontToggles = document.querySelectorAll("#fontToggle, #fontToggleMobile");

  // FUNZIONI GENERALI
  function closeMobileMenu() {
    if (!menuOverlay || !menuToggle) return;

    menuOverlay.classList.remove("active");
    body.style.overflow = "auto";

    const icon = menuToggle.querySelector("i");
    if (icon) {
      icon.classList.remove("bi-x-lg");
      icon.classList.add("bi-list");
    }
  }

  function openOrToggleMobileMenu() {
    if (!menuOverlay || !menuToggle) return;

    const isActive = menuOverlay.classList.toggle("active");
    body.style.overflow = isActive ? "hidden" : "auto";

    const icon = menuToggle.querySelector("i");
    if (icon) {
      icon.classList.toggle("bi-list", !isActive);
      icon.classList.toggle("bi-x-lg", isActive);
    }
  }

  function updateTheme(isDark) {
    body.classList.toggle("dark-mode", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");

    themeToggles.forEach(toggle => {
      toggle.checked = isDark;
    });
  }

  function updateFont(isLarge) {
    body.classList.toggle("large-text", isLarge);
    localStorage.setItem("fontSize", isLarge ? "large" : "normal");

    fontToggles.forEach(toggle => {
      toggle.checked = isLarge;
    });
  }

  // INIZIALIZZAZIONE TEMA / FONT
  updateTheme(localStorage.getItem("theme") === "dark");
  updateFont(localStorage.getItem("fontSize") === "large");

  // MENU MOBILE
  if (menuToggle && menuOverlay) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      openOrToggleMobileMenu();
    });

    menuOverlay.addEventListener("click", (e) => {
      if (e.target === menuOverlay) {
        closeMobileMenu();
      }
    });

    menuLinks.forEach(link => {
      link.addEventListener("click", () => {
        closeMobileMenu();
      });
    });
  }

  // MENU IMPOSTAZIONI DESKTOP
  if (settingsToggle && settingsMenu) {
    settingsToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      settingsMenu.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (settingsContainer && !settingsContainer.contains(e.target)) {
        settingsMenu.classList.remove("active");
      }
    });
  }

  // TOGGLE TEMA
  themeToggles.forEach(toggle => {
    toggle.addEventListener("change", (e) => {
      updateTheme(e.target.checked);
    });
  });

  // TOGGLE TESTO GRANDE
  fontToggles.forEach(toggle => {
    toggle.addEventListener("change", (e) => {
      updateFont(e.target.checked);
    });
  });
});