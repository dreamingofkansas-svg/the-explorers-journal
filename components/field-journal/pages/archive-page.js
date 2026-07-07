/*
=========================================================
Field Journal Archive Page
Explorer Society
=========================================================
*/

const FieldJournalArchivePage = (() => {

    function render(destination, journal){

        const archive = journal?.archive;

        if (!archive){
            return `
                <div class="field-journal-page">
                    <h1>No archive found.</h1>
                </div>
            `;
        }

        const completed =
            archive.completed
                .map(item => `<li>✓ ${item}</li>`)
                .join("");

        const filedDate =
            new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
            });

        const fileNumber =
            `003-${String(destination.id).padStart(3, "0")}`;

        return `
            <div class="field-journal-page archive-page">

                <p class="field-journal-page__label">
                    EXPLORER SOCIETY
                </p>

                <h1>
                    ${archive.title}
                </h1>

                <div class="archive-meta">
                    <span>File No. ${fileNumber}</span>
                    <span>Filed: ${filedDate}</span>
                </div>

                <div class="archive-card">

                    <h2>
                        ${archive.destination}
                    </h2>

                    <p class="archive-status">
                        ${archive.status}
                    </p>

                    <ul class="archive-checklist">
                        ${completed}
                    </ul>

                </div>

                <aside class="archive-note">

                    <strong>
                        Archivist's Annotation
                    </strong>

                    <p>
                        ${archive.note}
                    </p>

                    <span>
                        — ${archive.filedBy}
                    </span>

                </aside>

            </div>
        `;
    }

    return { render };

})();