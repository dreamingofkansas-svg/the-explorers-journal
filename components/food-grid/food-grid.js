/*
=========================================================
Food Grid
Release 3.2.1
Flag Progress + Explorer Card Votes
=========================================================
*/

document.addEventListener("DOMContentLoaded", async () => {

    const container = document.getElementById("food-container");
    const progress = document.getElementById("passport-progress");
    const progressText = document.getElementById("progress-text");
    const template = document.getElementById("explorer-card-template");

    if (!container || !progress || !template) {
        console.error("Food Grid setup error: missing container, progress, or explorer-card-template.");
        return;
    }

    const response = await fetch("data/foods.json");
    const foods = await response.json();

    progress.innerHTML = "";

    foods.forEach(food => {
        const stamp = document.createElement("span");
        stamp.classList.add("passport-stamp");
        stamp.textContent = food.flag || "○";
        stamp.dataset.foodId = food.id;
        progress.appendChild(stamp);
    });

    progressText.textContent = `0 / ${foods.length} Explored`;

    foods.forEach(food => {

        const clone = template.content.cloneNode(true);

        const card = clone.querySelector(".explorer-card");

        const image = clone.querySelector(".explorer-card__photo");
        image.src = food.image;
        image.alt = food.name;

        clone.querySelector(".explorer-card__number").textContent =
            String(food.id).padStart(2, "0");

        clone.querySelector(".explorer-card__title").textContent =
            food.name;

        clone.querySelector(".explorer-card__country").textContent =
            `${food.flag} ${food.country}`;

        clone.querySelector(".explorer-card__question").textContent =
            food.question || "Would you try this?";

        clone.querySelectorAll(".vote").forEach(button => {
            button.addEventListener("click", () => {

                if (card.classList.contains("explorer-card--completed")) {
                    return;
                }

                const vote = button.dataset.vote;

                card.classList.add("explorer-card--completed");
                button.classList.add("vote--selected");

                const stamp = progress.querySelector(
                    `[data-food-id="${food.id}"]`
                );

                if (stamp) {
                    stamp.classList.add("passport-stamp--complete");
                }

                const completed =
                    document.querySelectorAll(".explorer-card--completed").length;

                progressText.textContent =
                    `${completed} / ${foods.length} Explored`;

                console.log(`${food.name}: ${vote}`);
            });
        });

        container.appendChild(clone);
    });
});