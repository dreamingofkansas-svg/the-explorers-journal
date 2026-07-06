/*
=========================================================
Atlas Headquarters
Beta 1.5B
Dynamic Progress
=========================================================
*/

document.addEventListener("DOMContentLoaded", async () => {

    const STORAGE_KEY = "explorerJournal.issue001.foodVotes";

    const savedVotes =
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

    const response =
        await fetch("data/foods.json");

    const foods =
        await response.json();

    const completed =
        Object.keys(savedVotes).length;

    const total =
        foods.length;

    const percent =
        Math.round((completed / total) * 100);

    const progressText =
        document.getElementById("guide-001-progress-text");

    const progressFill =
        document.getElementById("guide-001-progress-fill");

    const guideStatus =
        document.getElementById("guide-001-status");

    const explorerRank =
        document.getElementById("hq-explorer-rank");

    if (progressText) {
        progressText.textContent =
            `${completed} / ${total} Explored`;
    }

    if (progressFill) {
        progressFill.style.width =
            `${percent}%`;
    }

    if (guideStatus) {
        guideStatus.textContent =
            completed === total ? "Completed" : "In Progress";
    }

   ExplorerProfile.update({
    completed,
    total
});

});