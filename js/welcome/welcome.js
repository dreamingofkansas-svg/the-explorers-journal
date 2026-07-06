/*
=========================================================
Explorer Society Welcome
Beta 1.8A — Admission
=========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    const STORAGE_KEY = "explorerSociety.welcomeAccepted";

    const overlay =
        document.getElementById("welcome-overlay");

    const beginButton =
        document.getElementById("welcome-begin");

    if (!overlay || !beginButton) {
        return;
    }

    const hasAccepted =
        localStorage.getItem(STORAGE_KEY);

    if (hasAccepted) {
        overlay.style.display = "none";
        return;
    }

    beginButton.addEventListener("click", () => {

        localStorage.setItem(STORAGE_KEY, "true");

        overlay.style.display = "none";

    });

});