/*
=========================================================
Road Transition
Beta 4.0
=========================================================
*/

const RoadTransition = (() => {

    const template =
        document.getElementById("road-transition-template");

    function create(route, destinations){

        if (!template) {
            console.error("RoadTransition error: missing template.");
            return null;
        }

        const fromDestination =
            destinations.find(destination => destination.id === route.from);

        const toDestination =
            destinations.find(destination => destination.id === route.to);

        if (!fromDestination || !toDestination) {
            console.error("RoadTransition error: missing destination.", route);
            return null;
        }

        const clone =
            template.content.cloneNode(true);

        clone.querySelector(".road-from").textContent =
            fromDestination.city;

        clone.querySelector(".road-transition__title").innerHTML =
            `Leaving ${fromDestination.city}<br><span>Arriving in ${toDestination.city}</span>`;

        clone.querySelector(".road-highway").textContent =
            route.highway;

        clone.querySelector(".road-distance").textContent =
            `${route.distance} miles`;

        clone.querySelector(".road-time").textContent =
            route.driveTime;

        clone.querySelector(".road-transition__story").textContent =
            route.roadStory;

        clone.querySelector(".road-note").textContent =
            route.blakeNote;

        return clone;
    }

    return {
        create
    };

})();