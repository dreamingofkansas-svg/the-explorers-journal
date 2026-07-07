/*
=========================================================
Field Journal Notebook Page
Data Driven
=========================================================
*/

const FieldJournalNotebookPage = (() => {

    function render(destination, journal){

        const notebook = journal?.notebook;

        if (!notebook) {
            return `
                <div class="field-journal-page field-journal-page--notebook">
                    <p class="field-journal-page__label">EXPLORER'S NOTEBOOK</p>
                    <h1>No notebook data found.</h1>
                </div>
            `;
        }

        const localWords =
            notebook.localLanguage.words
                .map(item => `
                    <div class="notebook-word">
                        <strong>${item.word}</strong>
                        <span>${item.definition}</span>
                    </div>
                `)
                .join("");

        const travelWords =
            notebook.travelEnglish.words
                .map(item => `
                    <div class="notebook-word">
                        <strong>${item.word}</strong>
                        <span>${item.definition}</span>
                    </div>
                `)
                .join("");

        const checklist =
            notebook.checklist
                .map(item => `
                    <li>${item}</li>
                `)
                .join("");

        return `
            <div class="field-journal-page field-journal-page--notebook">

                <p class="field-journal-page__label">
                    EXPLORER'S NOTEBOOK
                </p>

                <h1>${notebook.title}</h1>

                <section class="notebook-section">
                    <h2>🗣 ${notebook.localLanguage.title}</h2>
                    <div class="notebook-word-list">
                        ${localWords}
                    </div>
                </section>

                <section class="notebook-section">
                    <h2>✈️ ${notebook.travelEnglish.title}</h2>
                    <div class="notebook-word-list">
                        ${travelWords}
                    </div>
                </section>

                <section class="notebook-section">
                    <h2>Mission Checklist</h2>
                    <ul class="notebook-checklist">
                        ${checklist}
                    </ul>
                </section>

                <section class="notebook-section notebook-journal">
                    <h2>Explorer Journal</h2>
                    <p>${notebook.journalPrompt}</p>
                    <div class="discovery-lines"></div>
                </section>

                <aside class="notebook-archivist">
                    ${notebook.archivist}
                    <span>— The Archivist</span>
                </aside>

            </div>
        `;
    }

    return { render };

})();