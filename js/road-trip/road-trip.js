/*
=========================================================
Road Trip America
Atlas v0.5
Persistent Expedition Progress
=========================================================
*/

document.addEventListener("DOMContentLoaded", async () => {

    const container =
        document.getElementById("travel-journal-container");

    if (!container) {
        console.error("Road Trip setup error: missing journal container.");
        return;
    }

    container.innerHTML = "";

    const destinationResponse =
        await fetch("issues/003-road-trip-america/data/destinations.json");

    const routeResponse =
        await fetch("issues/003-road-trip-america/data/routes.json");

    const journalResponse =
        await fetch("issues/003-road-trip-america/data/journal.json");

    const destinationData =
        await destinationResponse.json();

    const routes =
        await routeResponse.json();

    const journalData =
        await journalResponse.json();

    const destinations =
        Array.isArray(destinationData)
            ? destinationData
            : destinationData.destinations ||
              destinationData.stops ||
              destinationData.route ||
              destinationData.items;

    if (!Array.isArray(destinations)) {
        console.error("Destinations data is not an array.", destinationData);
        return;
    }

    ExpeditionRoute.render(destinations);

    window.AtlasDestinations = destinations;

AtlasHQ.render(destinations);

    destinations.forEach((destination, index) => {

        const journal =
            TravelJournal.create(
                destination,
                journalData[destination.id]
            );

        if (journal) {
            const journalElement =
                journal.querySelector(".travel-journal");

            if (journalElement) {
                journalElement.dataset.destinationId =
                    destination.id;

                if (ExpeditionManager.isCompleted(destination.id)) {
                    journalElement.classList.add("travel-journal--completed");
                }
            }

            container.appendChild(journal);
        }

        if (index < destinations.length - 1) {

            const route =
                routes.find(route =>
                    route.from === destination.id
                );

            if (route) {

                const road =
                    RoadTransition.create(route, destinations);

                if (road) {
                    const roadElement =
                        road.querySelector(".road-transition");

                    if (roadElement) {
                        roadElement.dataset.routeFrom =
                            route.from;

                        if (ExpeditionManager.isCompleted(route.from)) {
                            roadElement.classList.add("road-transition--unlocked");
                        } else {
                            roadElement.classList.add("road-transition--locked");
                        }
                    }

                    container.appendChild(road);
                }

            }

        }

    });

    document.body.addEventListener(
        "expedition:filed",
        event => {

            const filedDestination =
                event.detail.destination;

            const completedCard =
                container.querySelector(
                    `[data-destination-id="${filedDestination.id}"]`
                );

            if (completedCard) {
                completedCard.classList.add("travel-journal--completed");
            }

            const unlockedRoad =
                container.querySelector(
                    `[data-route-from="${filedDestination.id}"]`
                );

            if (unlockedRoad) {

                unlockedRoad.classList.remove("road-transition--locked");

                unlockedRoad.classList.add("road-transition--unlocked");

                unlockedRoad.scrollIntoView({

                    behavior: "smooth",

                    block: "center"

                });

            }

        }

    );

});