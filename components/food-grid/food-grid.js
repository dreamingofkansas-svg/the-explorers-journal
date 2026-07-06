/*
=========================================================
Food Grid
Beta 1.2E Pack D
Explorer Card Module Integration
=========================================================
*/

document.addEventListener("DOMContentLoaded", async () => {

    const container = document.getElementById("food-container");
    const progress = document.getElementById("passport-progress");
    const progressText = document.getElementById("progress-text");

    if (!container || !progress || !progressText) {
        console.error("Food Grid setup error.");
        return;
    }

    let savedVotes = ExplorerStorage.loadVotes();

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

    function completeFood(food, vote, card){

        savedVotes = ExplorerStorage.saveVote(food.id, vote);

        ExplorerCard.applyVote(card, vote, false);

        const progressStamp = progress.querySelector(
            `[data-food-id="${food.id}"]`
        );

        if (progressStamp) {
            progressStamp.classList.add("passport-stamp--complete");
        }

        ExplorerPassport.add(food, vote);

        const completed = Object.keys(savedVotes).length;

        ExplorerMission.update(completed, foods.length);

        setTimeout(() => {
            card.classList.add("explorer-card--flipped");
        }, 750);

        console.log(`${food.name}: ${vote}`);
    }

    foods.forEach(food => {

        const card = ExplorerCard.create(food, {
            onVote: completeFood
        });

        if (!card) return;

        container.appendChild(card);

        const rememberedVote = savedVotes[food.id];

        if (rememberedVote) {
            ExplorerCard.applyVote(card, rememberedVote, true);

            const progressStamp = progress.querySelector(
                `[data-food-id="${food.id}"]`
            );

            if (progressStamp) {
                progressStamp.classList.add("passport-stamp--complete");
            }

            ExplorerPassport.add(food, rememberedVote);
        }
    });

    ExplorerMission.update(Object.keys(savedVotes).length, foods.length);
});