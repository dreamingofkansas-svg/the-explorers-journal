/*
=========================================================
Field Journal Blake Page
Data Driven
=========================================================
*/

const FieldJournalBlakePage = (() => {

    function render(destination, journal){

        const blake = journal?.blake;

        if (!blake) {
            return `
                <div class="field-journal-page field-journal-page--blake">
                    <p class="field-journal-page__label">
                        BLAKE'S FIELD NOTES
                    </p>

                    <h1>
                        Dear Explorer,
                    </h1>

                    <div class="blake-note">
                        <p>
                            ${destination.blakeReport || "No field notes found."}
                        </p>

                        <p class="blake-note__signature">
                            — Blake
                        </p>
                    </div>
                </div>
            `;
        }

        const paragraphs =
            blake.paragraphs
                .map(paragraph => `<p>${paragraph}</p>`)
                .join("");

        return `
            <div class="field-journal-page field-journal-page--blake">

                <p class="field-journal-page__label">
                    BLAKE'S FIELD NOTES
                </p>

                <h1>
                    ${blake.title}
                </h1>

                <div class="blake-note">

                    ${paragraphs}

                    <p class="blake-note__closing">
                        ${blake.closing || "See you down the road."}
                    </p>

                    <p class="blake-note__signature">
                        — Blake
                    </p>

                </div>

            </div>
        `;
    }

    return { render };

})();