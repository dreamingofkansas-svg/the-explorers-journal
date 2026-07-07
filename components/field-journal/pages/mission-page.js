/*
=========================================================
Mission Page
=========================================================
*/

const FieldJournalMissionPage = (() => {

    function render(destination, journal) {

        const mission = journal?.mission;

        if (!mission) {
            return `
                <section class="mission-page">
                    <h1>Mission Brief</h1>
                    <p>No mission data found.</p>
                </section>
            `;
        }

        return `

            <section class="mission-page">

                <span class="journal-label">
                    ${mission.issuedBy}
                </span>

                <h1>
                    ${mission.title}
                </h1>

                <p>
                    ${mission.body}
                </p>

            </section>

        `;

    }

    return {
        render
    };

})();