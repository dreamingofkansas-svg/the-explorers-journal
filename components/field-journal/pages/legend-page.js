/*
=========================================================
Field Journal Legend Page
Data Driven
=========================================================
*/

const FieldJournalLegendPage = (() => {

    function render(destination, journal){

        const legend = journal?.legend;

        if (!legend) {
            return `
                <div class="field-journal-page field-journal-page--legend">
                    <p class="field-journal-page__label">LOCAL LEGEND</p>
                    <h1>No legend found.</h1>
                </div>
            `;
        }

        const visitedDate =
            new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
            });

        return `
            <div class="field-journal-page field-journal-page--legend">

                <p class="field-journal-page__label">
                    LOCAL LEGEND
                </p>

                <h1>
                    ${legend.name}
                </h1>

                <h2>
                    ${destination.city}, ${destination.state}
                </h2>

                <div class="legend-card">

                    <p class="legend-card__body">
                        ${legend.body}
                    </p>

                    <div class="legend-index">

                        <div>
                            <span>Evidence</span>
                            <strong>★★☆☆☆</strong>
                        </div>

                        <div>
                            <span>Mystery</span>
                            <strong>★★★★★</strong>
                        </div>

                        <div>
                            <span>Historical Value</span>
                            <strong>★★★★☆</strong>
                        </div>

                        <div>
                            <span>Worth Investigating</span>
                            <strong>★★★★★</strong>
                        </div>

                    </div>

                </div>

                <aside class="archive-stamp">
                    <strong>ARCHIVE STATUS</strong>
                    <p>Historical roots confirmed. Supernatural claims remain unresolved.</p>
                    <span>— The Archivist</span>
                </aside>

                <footer class="field-journal-page__footer">
                    <span>Visited on: ${visitedDate}</span>
                    <span>Current temp: Weather feed pending</span>
                </footer>

            </div>
        `;
    }

    return { render };

})();