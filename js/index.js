document.addEventListener("DOMContentLoaded", () => {
    // --- SELETTORI ---
    const settingsToggle = document.getElementById("settingsToggle");
    const settingsMenu = document.getElementById("settingsMenu");
    const settingsContainer = document.querySelector(".settings-container");
    
    const menuToggle = document.getElementById("menuToggle");
    const menuOverlay = document.getElementById("menuOverlay");
    const menuLinks = document.querySelectorAll(".menu-box a");

    // Selezioniamo TUTTI i toggle (sia desktop che mobile) usando le classi o gli ID multipli
    const themeToggles = document.querySelectorAll("#themeToggle, #themeToggleMobile");
    const fontToggles = document.querySelectorAll("#fontToggle, #fontToggleMobile");

    // --- GESTIONE MENU MOBILE (Apertura/Chiusura) ---
    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener("click", () => {
            menuOverlay.classList.toggle("active");
            const icon = menuToggle.querySelector("i");
            icon.classList.toggle("bi-list");
            icon.classList.toggle("bi-x-lg");
        });

        menuLinks.forEach(link => {
            link.addEventListener("click", () => {
                menuOverlay.classList.remove("active");
                menuToggle.querySelector("i").classList.replace("bi-x-lg", "bi-list");
            });
        });

        menuOverlay.addEventListener("click", (e) => {
            if (e.target === menuOverlay) {
                menuOverlay.classList.remove("active");
                menuToggle.querySelector("i").classList.replace("bi-x-lg", "bi-list");
            }
        });
    }

    // --- GESTIONE IMPOSTAZIONI DESKTOP (Menu a comparsa) ---
    if (settingsToggle && settingsMenu) {
        settingsToggle.addEventListener("click", () => {
            settingsMenu.classList.toggle("active");
        });
    }

    document.addEventListener("click", (e) => {
        if (settingsContainer && !settingsContainer.contains(e.target) && !settingsToggle.contains(e.target)) {
            settingsMenu.classList.remove("active");
        }
    });

    // --- LOGICA THEME (Sincronizzata) ---
    const updateTheme = (isDark) => {
        if (isDark) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
        // Sincronizza tutti i toggle presenti nella pagina
        themeToggles.forEach(t => t.checked = isDark);
    };

    themeToggles.forEach(toggle => {
        toggle.addEventListener("change", (e) => {
            updateTheme(e.target.checked);
        });
    });

    // Inizializzazione Tema al caricamento
    if (localStorage.getItem("theme") === "dark") {
        updateTheme(true);
    }

    // --- LOGICA FONT SIZE (Sincronizzata) ---
    const updateFont = (isLarge) => {
        if (isLarge) {
            document.body.classList.add("large-text");
            localStorage.setItem("fontSize", "large");
        } else {
            document.body.classList.remove("large-text");
            localStorage.setItem("fontSize", "normal");
        }
        // Sincronizza tutti i toggle presenti nella pagina
        fontToggles.forEach(t => t.checked = isLarge);
    };

    fontToggles.forEach(toggle => {
        toggle.addEventListener("change", (e) => {
            updateFont(e.target.checked);
        });
    });

    // Inizializzazione Font al caricamento
    if (localStorage.getItem("fontSize") === "large") {
        updateFont(true);
    }
});