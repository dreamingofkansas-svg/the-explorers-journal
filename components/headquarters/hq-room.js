const AtlasHQ = (() => {

    function render(destinations){

        const container = document.getElementById("atlas-hq");
        if (!container) return;

        const completed = destinations.filter(destination =>
            ExpeditionManager.isCompleted(destination.id)
        );

        if (completed.length === 0) {
            container.innerHTML = "";
            return;
        }

        const latest = completed[completed.length - 1];

        const next = destinations.find(destination =>
            !ExpeditionManager.isCompleted(destination.id)
        );

        container.innerHTML = `
            <section class="atlas-hq-room">

                <div class="atlas-hq-plaque">

    <p>EXPLORER SOCIETY</p>

    <h2>Headquarters</h2>

    <blockquote>

        "To preserve the stories of the road,<br>

        and those willing to follow it."

    </blockquote>

</div>

                <section class="atlas-hq-desk">

                    <article class="atlas-hq-file">
                        <span>AF-${String(latest.id).padStart(3, "0")}</span>
                        <h3>${latest.city}</h3>
                        <p>Expedition Filed</p>
                    </article>

                    <aside class="atlas-hq-note">

<strong>ARCHIVIST'S NOTE</strong>

<p>

Explorer,

<br><br>

Your first journal has been accepted into the archives.

You have officially been welcomed into the Explorer Society.

Your next assignment has already been prepared.

Travel well.

</p>

<span>

— The Archivist

</span>

</aside>

                </section>

                <section class="atlas-hq-board">

                    <div>
                        <h3>Filed Expeditions</h3>
                        <ul>
                            ${completed.map(destination =>
                                `<li>✓ ${destination.city}</li>`
                            ).join("")}
                        </ul>
                    </div>

                    <div>
                        <h3>Next Assignment</h3>
                        <p>${next ? next.city : "All expeditions filed"}</p>
                    </div>

                </section>

            </section>
        `;
    }

    document.body.addEventListener("expedition:filed", () => {
        if (window.AtlasDestinations) {
            render(window.AtlasDestinations);
        }
    });

    return { render };

})();