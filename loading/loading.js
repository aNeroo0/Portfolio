document.addEventListener("DOMContentLoaded", () => {
    const startTime = Date.now();

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "loading/loading.css";
    document.head.appendChild(link);

    fetch("loading/loading.html")
        .then(response => response.text())
        .then(data => {
            const loaderWrapper = document.createElement("div");
            loaderWrapper.id = "page-loader";
            loaderWrapper.innerHTML = data;
            document.body.prepend(loaderWrapper);

            styleLoader();
            monitorLoading(loaderWrapper, startTime);
        })
        .catch(error => console.error("Errore nel caricamento del loader:", error));
});

function styleLoader() {
    const style = document.createElement("style");
    style.innerHTML = `
        #page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #f8f6f2;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.6s ease, visibility 0.6s ease;
        }

        #page-loader.fade-out {
            opacity: 0;
            visibility: hidden;
        }
    `;
    document.head.appendChild(style);
}

function monitorLoading(loader, startTime) {
    const MIN_LOADING_TIME = 3000; // 3 secondi
    const resources = Array.from(document.images);
    let loaded = 0;
    const total = resources.length || 1;

    function tryHideLoader() {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = MIN_LOADING_TIME - elapsedTime;

        setTimeout(() => {
            hideLoader(loader);
        }, Math.max(0, remainingTime));
    }

    function updateProgress() {
        loaded++;
        const progress = Math.floor((loaded / total) * 100);

        if (progress >= 80) {
            tryHideLoader();
        }
    }

    if (resources.length === 0) {
        tryHideLoader();
    } else {
        resources.forEach(img => {
            if (img.complete) {
                updateProgress();
            } else {
                img.addEventListener("load", updateProgress);
                img.addEventListener("error", updateProgress);
            }
        });
    }

    window.addEventListener("load", tryHideLoader);
}

function hideLoader(loader) {
    if (!loader.classList.contains("fade-out")) {
        loader.classList.add("fade-out");
        setTimeout(() => loader.remove(), 600);
    }
}