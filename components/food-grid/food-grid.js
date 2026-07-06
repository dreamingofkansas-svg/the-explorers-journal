/*
=========================================================
Food Grid
Beta 1.2A
Mission Panel + Passport Log Integration
=========================================================
*/

document.addEventListener("DOMContentLoaded", async () => {

    const container = document.getElementById("food-container");
    const progress = document.getElementById("passport-progress");
    const progressText = document.getElementById("progress-text");
    const template = document.getElementById("explorer-card-template");

    const missionFill = document.getElementById("mission-progress-fill");
    const missionText = document.getElementById("mission-progress-text");
    const missionCount = document.getElementById("mission-foods-count");
    const missionRank = document.getElementById("mission-rank");
    const passportEntries = document.getElementById("passport-log-entries");

    if (!container || !progress || !progressText || !template) {
        console.error("Food Grid setup error.");
        return;
    }

    const response = await fetch("data/foods.json");
    const foods = await response.json();

    progress.innerHTML = "";

    foods.forEach(food => {
        const progressStamp = document.createElement("span");
        progressStamp.classList.add("passport-stamp");
        progressStamp.textContent = food.flag || "○";
        progressStamp.dataset.foodId = food.id;
        progress.appendChild(progressStamp);
    });

    function updateMission(completed){
        const percent = Math.round((completed / foods.length) * 100);

        progressText.textContent = `${completed} / ${foods.length} Explored`;

        if (missionFill) missionFill.style.width = `${percent}%`;
        if (missionText) missionText.textContent = `${percent}% Complete`;
        if (missionCount) missionCount.textContent = completed;

        if (missionRank) {
            if (completed === 0) missionRank.textContent = "New Explorer";
            else if (completed < 6) missionRank.textContent = "Curious Explorer";
            else if (completed < 12) missionRank.textContent = "Brave Explorer";
            else if (completed < foods.length) missionRank.textContent = "Fearless Explorer";
            else missionRank.textContent = "Food Expedition Master";
        }
    }

    function updatePassport(food){

        if (!passportEntries) return;

        const emptyMessage =
            passportEntries.querySelector(".passport-log__empty");

        if (emptyMessage) {
            emptyMessage.remove();
        }

        const alreadyAdded =
            passportEntries.querySelector(`[data-country="${food.country}"]`);

        if (alreadyAdded) return;

        const entry = document.createElement("div");

        entry.classList.add("passport-log__entry");
        entry.dataset.country = food.country;

        entry.innerHTML = `
            <span>${food.flag}</span>
            <strong>${food.country}</strong>
            <small>Issue 001</small>
        `;

        passportEntries.appendChild(entry);
    }

    updateMission(0);

    foods.forEach(food => {

        const clone = template.content.cloneNode(true);
        const card = clone.querySelector(".explorer-card");

        const image = clone.querySelector(".explorer-card__photo");
        image.src = food.image;
        image.alt = food.name;

        clone.querySelector(".explorer-card__number").textContent =
            String(food.id).padStart(2, "0");

        clone.querySelector(".explorer-card__title").textContent = food.name;

        clone.querySelector(".explorer-card__country").textContent =
            `${food.flag} ${food.country}`;

        clone.querySelector(".explorer-card__question").textContent =
            food.question || "Would you try this?";

        clone.querySelector(".field-notes-title").textContent = food.name;

        clone.querySelector(".field-notes-country").textContent =
            `${food.flag} ${food.country}`;

        clone.querySelector(".field-notes-difficulty").textContent =
            `Explorer Difficulty: ${"★".repeat(food.difficulty)}${"☆".repeat(5 - food.difficulty)}`;

        clone.querySelector(".field-notes-description").textContent =
            food.description;

        clone.querySelector(".field-notes-fact").textContent =
            `Explorer Note: ${food.funFact}`;

        clone.querySelectorAll(".vote").forEach(button => {

            button.addEventListener("click", () => {

                if (card.classList.contains("explorer-card--voted")) {
                    return;
                }

                const vote = button.dataset.vote;
                const stamp = card.querySelector(".explorer-card__stamp");

                card.classList.add("explorer-card--voted");
                button.classList.add("vote--selected");

                if (vote === "yes") {
                    stamp.textContent = "APPROVED";
                    stamp.classList.add("stamp--yes");
                }

                if (vote === "maybe") {
                    stamp.textContent = "PENDING";
                    stamp.classList.add("stamp--maybe");
                }

                if (vote === "no") {
                    stamp.textContent = "DECLINED";
                    stamp.classList.add("stamp--no");
                }

                const progressStamp = progress.querySelector(
                    `[data-food-id="${food.id}"]`
                );

                if (progressStamp) {
                    progressStamp.classList.add("passport-stamp--complete");
                }

                const completed =
                    document.querySelectorAll(".explorer-card--voted").length;

                updateMission(completed);
                updatePassport(food);

                setTimeout(() => {
                    card.classList.add("explorer-card--flipped");
                }, 750);

                console.log(`${food.name}: ${vote}`);
            });
        });

        container.appendChild(clone);
    });
});