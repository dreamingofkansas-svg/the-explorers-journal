/*
=========================================================
Explorer Card Module
Beta 1.2E Pack D
=========================================================
*/

const ExplorerCard = (() => {

    const template =
        document.getElementById("explorer-card-template");

    function create(food, options = {}){

        if (!template) {
            console.error("ExplorerCard error: missing explorer-card-template.");
            return null;
        }

        const clone = template.content.cloneNode(true);
        const card = clone.querySelector(".explorer-card");

        card.dataset.foodCardId = food.id;

        clone.querySelector(".explorer-card__photo").src = food.image;
        clone.querySelector(".explorer-card__photo").alt = food.name;

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
                if (card.classList.contains("explorer-card--voted")) return;

                const vote = button.dataset.vote;

                if (options.onVote) {
                    options.onVote(food, vote, card);
                }
            });
        });

        return card;
    }

    function applyVote(card, vote, shouldFlip = true){

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

        if (shouldFlip) {
            card.classList.add("explorer-card--flipped");
        }
    }

    return {
        create,
        applyVote
    };

})();