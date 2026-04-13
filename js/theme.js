function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark-mode");

  const theme = body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", theme);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
    }
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      document.body.classList.add("dark-mode");
    }
  }
});