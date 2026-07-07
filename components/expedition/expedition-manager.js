/*
=========================================================
Expedition Manager
Atlas v0.5
Persistent Progress
=========================================================
*/

const ExpeditionManager = (() => {

    const storageKey = "atlas.completedDestinations";

    let completedDestinations =
        JSON.parse(localStorage.getItem(storageKey)) || [];

    function save(){
        localStorage.setItem(
            storageKey,
            JSON.stringify(completedDestinations)
        );
    }

    function complete(destination){

        if (!destination?.id) return;

        if (!completedDestinations.includes(destination.id)) {
            completedDestinations.push(destination.id);
            save();
        }

        document.body.dispatchEvent(
            new CustomEvent("expedition:filed", {
                detail: {
                    destination,
                    completedDestinations
                }
            })
        );
    }

    function isCompleted(destinationId){
        return completedDestinations.includes(destinationId);
    }

    function getCompleted(){
        return completedDestinations;
    }

    function reset(){
        completedDestinations = [];
        save();
    }

    return {
        complete,
        isCompleted,
        getCompleted,
        reset
    };

})();