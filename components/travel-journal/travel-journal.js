/*
=========================================================
Travel Journal Component
Beta 3.2
=========================================================
*/

const TravelJournal = (() => {

    const template =
        document.getElementById("travel-journal-template");

    function create(destination, journalEntry = null){

        if (!template) {
            console.error("TravelJournal error: missing template.");
            return null;
        }

        const clone =
            template.content.cloneNode(true);

        clone.querySelector(".travel-journal__day").textContent =
            `JOURNAL ENTRY ${String(destination.id).padStart(3, "0")}`;

        clone.querySelector(".travel-journal__city").textContent =
            destination.city;

        clone.querySelector(".travel-journal__state").textContent =
            destination.state;

        const image =
            clone.querySelector(".travel-journal__photo");

        image.src =
    `assets/road-trip/${destination.folder}/${destination.image}`;

        image.alt =
            destination.city;

        clone.querySelector(".travel-stop").textContent =
            destination.primaryStop;

        clone.querySelector(".travel-budget").textContent =
            `$${destination.estimatedBudget}`;

        clone.querySelector(".travel-days").textContent =
            destination.recommendedStay;

        clone.querySelector(".travel-description").textContent =
            destination.directorBriefing;

        const button =
            clone.querySelector(".travel-journal__open");

        button.textContent = "Open Field Journal →";
        button.addEventListener("click", () => {
    FieldJournal.open(destination, journalEntry);
});

        return clone;
    }

    return {
        create
    };

})();