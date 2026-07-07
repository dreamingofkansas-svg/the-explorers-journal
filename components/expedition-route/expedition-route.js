/*
=========================================================
Expedition Route
Atlas v0.5
Self-Updating Route Component
=========================================================
*/

const ExpeditionRoute = (() => {

    let savedDestinations = [];

    function render(destinations){

        savedDestinations = destinations;

        const container =
            document.getElementById("expedition-route");

        if(!container) return;

        const completedCount =
            destinations.filter(destination =>
                ExpeditionManager.isCompleted(destination.id)
            ).length;

        const total =
            destinations.length;

        const progressPercent =
            Math.round((completedCount / total) * 100);

        let html = `
            <h2 class="expedition-route__title">
                EXPEDITION ROUTE
            </h2>

            <div class="route-map">

                <div class="route-map__line"></div>

                <div class="route-map__stops">
        `;

        destinations.forEach((destination, index) => {

            const isCompleted =
                ExpeditionManager.isCompleted(destination.id);

            const isCurrent =
                !isCompleted && index === completedCount;

            let statusClass = "";

            if(isCompleted){
                statusClass = "route-stop--complete";
            }else if(isCurrent){
                statusClass = "route-stop--current";
            }

            html += `
                <div class="route-stop ${statusClass}">

                    <div class="route-stop__pin"></div>

                    <div class="route-stop__city">
                        ${destination.city}
                    </div>

                    <span class="route-stop__state">
                        ${destination.state}
                    </span>

                </div>
            `;

        });

        html += `
                </div>
            </div>

            <div class="expedition-progress">

                <div>
                    <div class="expedition-progress__label">
                        EXPLORER PROGRESS
                    </div>

                    <div class="expedition-progress__bar">
                        <div
                            class="expedition-progress__fill"
                            style="width:${progressPercent}%">
                        </div>
                    </div>

                    <div class="expedition-progress__text">
                        ${completedCount} / ${total} Destinations
                    </div>
                </div>

                <div class="expedition-distance">
                    <div class="expedition-distance__label">
                        CURRENT ASSIGNMENT
                    </div>

                    <div class="expedition-distance__value">
                        ${
                            destinations[completedCount]
                                ? destinations[completedCount].city
                                : "Expedition Complete"
                        }
                    </div>
                </div>

            </div>
        `;

        container.innerHTML = html;
    }

    document.body.addEventListener(
        "expedition:filed",
        () => {
            if(savedDestinations.length){
                render(savedDestinations);
            }
        }
    );

    return {
        render
    };

})();