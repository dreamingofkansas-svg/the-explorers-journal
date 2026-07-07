/*
=========================================================
Field Journal
Beta 3.4
Page Engine
=========================================================
*/

const FieldJournal = (() => {

    const template =
        document.getElementById("field-journal-template");

    function open(destination, journalEntry = null){

        if (!template) {
            console.error("FieldJournal error: missing template.");
            return;
        }

        let currentPage = 0;

        const pages = [

    FieldJournalCoverPage,

    FieldJournalMissionPage,

    {

        render: (destination, journalEntry) =>

            FieldJournalDiscoveryPage.render(journalEntry?.food, destination)

    },

    {

        render: (destination, journalEntry) =>

            FieldJournalDiscoveryPage.render(journalEntry?.culture, destination)

    },

    FieldJournalNotebookPage,

    FieldJournalBlakePage,

    FieldJournalLegendPage,

    FieldJournalArchivePage

];

        const clone =
            template.content.cloneNode(true);

        const journal =
            clone.querySelector(".field-journal");

        const page =
            clone.querySelector(".field-journal__page");

        const closeButton =
            clone.querySelector(".field-journal__close");

        const nav =
            document.createElement("div");

        nav.classList.add("field-journal__nav");

        const backButton =
            document.createElement("button");

        backButton.textContent =
            "← Previous";

        const nextButton =
            document.createElement("button");

        nextButton.textContent =
            "Continue Expedition →";

        nav.appendChild(backButton);
        nav.appendChild(nextButton);

        function renderPage(){

            const pageModule =
                pages[currentPage];

            page.innerHTML =
                pageModule.render(destination, journalEntry);

            backButton.disabled =
                currentPage === 0;

            if (currentPage === pages.length - 1) {
                nextButton.textContent =
                    nextButton.textContent =
    "File Expedition →";
            } else {
                nextButton.textContent =
                    "Continue Expedition →";
            }

        }

        backButton.addEventListener("click", () => {
            if (currentPage > 0) {
                currentPage--;
                renderPage();
            }
        });

        nextButton.addEventListener("click", () => {

            if (currentPage < pages.length - 1) {
    currentPage++;
    renderPage();
    return;
}

/*
-------------------------------------
Final page reached
-------------------------------------
*/

ExpeditionManager.complete(destination);

journal.remove();

        });

        closeButton.addEventListener("click", () => {
            journal.remove();
        });

        journal.addEventListener("click", event => {
            if (event.target === journal) {
                journal.remove();
            }
        });

        renderPage();

        const book =
            journal.querySelector(".field-journal__book");

        book.appendChild(nav);

        document.body.appendChild(journal);
    }

    return {
        open
    };

})();