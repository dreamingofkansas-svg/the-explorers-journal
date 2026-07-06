/*
=========================================================
Explorer Passport Module
Beta 1.2E Pack C
=========================================================
*/

const ExplorerPassport = (() => {

    const passportEntries =
        document.getElementById("passport-log-entries");

    function add(food, vote){

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

    return {
        add
    };

})();