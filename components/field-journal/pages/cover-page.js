/*
=========================================================
Field Journal Cover Page
Data Driven
=========================================================
*/

const FieldJournalCoverPage = (() => {

    function render(destination, journal){

        const cover = journal?.cover;

        return `
            <div class="field-journal-page field-journal-page--cover">

                <p class="field-journal-page__label">
                    FIELD JOURNAL
                </p>

                <h1>
                    ${cover?.title || destination.city}
                </h1>

                <h2>
                    ${cover?.subtitle || destination.state}
                </h2>

                <p class="field-journal-page__meta">
                    ${cover?.label || `Journal Entry ${String(destination.id).padStart(3, "0")}`}
                </p>

                <p class="field-journal-page__subtitle">
                    Primary Investigation: ${cover?.primaryInvestigation || destination.primaryStop}
                </p>

            </div>
        `;
    }

    return { render };

})();