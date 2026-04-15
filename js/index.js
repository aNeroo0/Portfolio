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

        // Caricamento preferenza salvata
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

        // Caricamento preferenza salvata
        if (localStorage.getItem("fontSize") === "large") {
        document.body.classList.add("large-text");
        fontToggle.checked = true;
        }
    }

    // Funzione per cancellare il sito
    const deleteSiteBtn = document.getElementById("deleteSiteBtn");
    const fake404 = document.getElementById("fake404");
    const restoreSiteBtn = document.getElementById("restoreSiteBtn");

    if (deleteSiteBtn) {
    deleteSiteBtn.addEventListener("click", () => {
        // Aggiunge la classe per l'animazione
        document.body.classList.add("site-deleted");

        // Mostra il finto errore 404 dopo l'animazione
        setTimeout(() => {
        fake404.classList.add("show");
        }, 2000);
    });
    }

    if (restoreSiteBtn) {
    restoreSiteBtn.addEventListener("click", () => {
        // Nasconde il 404
        fake404.classList.remove("show");

        // Ripristina il sito
        setTimeout(() => {
        document.body.classList.remove("site-deleted");
        }, 300);
    });
    }

});