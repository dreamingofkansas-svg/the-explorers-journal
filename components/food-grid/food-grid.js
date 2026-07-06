/*
=========================================================
Food Grid
Beta 1.2D
Explorer Memory with localStorage
=========================================================
*/

document.addEventListener("DOMContentLoaded", async () => {

    const STORAGE_KEY = "explorerJournal.issue001.foodVotes";

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

    const savedVotes =
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

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

    function saveVote(foodId, vote){
        savedVotes[foodId] = vote;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedVotes));
    }

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

    function updatePassport(food, vote){

        if (!passportEntries) return;

        const emptyMessage =
            passportEntries.querySelector(".passport-log__empty");

        if (emptyMessage) {
            emptyMessage.remove();
        }

        const alreadyAdded =
            passportEntries.querySelector(`[data-food-id="${food.id}"]`);

        if (alreadyAdded) return;

        const entry = document.createElement("button");

        entry.classList.add("passport-entry");
        entry.classList.add(`passport-entry--${vote}`);

        entry.dataset.country = food.country;
        entry.dataset.foodId = food.id;

        const rotation =
            Math.floor(Math.random() * 9) - 4;

        entry.style.setProperty("--rotation", rotation);

        const today =
            new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
            });

        let status = "✓ VISITED";

        if (vote === "yes") status = "✓ WOULD TRY";
        if (vote === "maybe") status = "? MAYBE";
        if (vote === "no") status = "✕ NOT YET";

        entry.innerHTML = `
            <div class="passport-entry__stamp">

                <div class="passport-entry__seal">
                    <span>${food.flag}</span>
                </div>

                <p class="passport-entry__visa">
                    ENTRY VISA
                </p>

                <h3 class="passport-entry__country">
                    ${food.country}
                </h3>

                <p class="passport-entry__issue">
                    DISCOVERED
                </p>

                <p class="passport-entry__mission">
                    ${today}
                </p>

                <p class="passport-entry__status">
                    ${status}
                </p>

                <small class="passport-entry__hint">
                    Click to review
                </small>

            </div>
        `;

        entry.addEventListener("click", () => {

            const targetCard =
                document.querySelector(`[data-food-card-id="${food.id}"]`);

            if (!targetCard) return;

            targetCard.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            targetCard.classList.add("explorer-card--review");

            setTimeout(() => {
                targetCard.classList.remove("explorer-card--review");
            }, 1400);
        });

        passportEntries.appendChild(entry);
    }

    function applyVoteToCard(card, food, vote, shouldFlip = true){

        const stamp = card.querySelector(".explorer-card__stamp");
        const selectedButton = card.querySelector(`[data-vote="${vote}"]`);

        card.classList.add("explorer-card--voted");

        if (selectedButton) {
            selectedButton.classList.add("vote--selected");
        }

        if (stamp) {
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
        }

        const progressStamp = progress.querySelector(
            `[data-food-id="${food.id}"]`
        );

        if (progressStamp) {
            progressStamp.classList.add("passport-stamp--complete");
        }

        updatePassport(food, vote);

        if (shouldFlip) {
            card.classList.add("explorer-card--flipped");
        }
    }

    foods.forEach(food => {

        const clone = template.content.cloneNode(true);
        const card = clone.querySelector(".explorer-card");

        card.dataset.foodCardId = food.id;

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

                saveVote(food.id, vote);
                applyVoteToCard(card, food, vote, false);

                const completed =
                    Object.keys(savedVotes).length;

                updateMission(completed);

                setTimeout(() => {
                    card.classList.add("explorer-card--flipped");
                }, 750);

                console.log(`${food.name}: ${vote}`);
            });
        });

        container.appendChild(clone);

        const rememberedVote = savedVotes[food.id];

        if (rememberedVote) {
            applyVoteToCard(card, food, rememberedVote, true);
        }
    });

    updateMission(Object.keys(savedVotes).length);
});