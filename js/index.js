document.addEventListener("DOMContentLoaded", () => {
    const settingsToggle = document.getElementById("settingsToggle");
    const settingsMenu = document.getElementById("settingsMenu");
    const themeToggle = document.getElementById("themeToggle");
    const fontToggle = document.getElementById("fontToggle");
    const settingsContainer = document.querySelector(".settings-container");

    // Apertura e chiusura menu impostazioni
    if (settingsToggle && settingsMenu) {
        settingsToggle.addEventListener("click", () => {
        settingsMenu.classList.toggle("active");
        });
    }

    // Chiusura del menu cliccando fuori
    document.addEventListener("click", (e) => {
        if (settingsContainer && !settingsContainer.contains(e.target)) {
        settingsMenu.classList.remove("active");
        }
    });

    // Modalità scura
    if (themeToggle) {
        themeToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
        });

        if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.checked = true;
        }
    }

    // Testo grande
    if (fontToggle) {
        fontToggle.addEventListener("change", () => {
        document.body.classList.toggle("large-text");

        if (document.body.classList.contains("large-text")) {
            localStorage.setItem("fontSize", "large");
        } else {
            localStorage.setItem("fontSize", "normal");
        }
        });

        if (localStorage.getItem("fontSize") === "large") {
        document.body.classList.add("large-text");
        fontToggle.checked = true;
        }
    }

});