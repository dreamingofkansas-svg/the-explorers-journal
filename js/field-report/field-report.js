/*
=========================================================
Explorer Field Assignment Module
Beta 1.4B
Open Assignment Modal
=========================================================
*/

const ExplorerFieldReport = (() => {

    function getAssignment(food){

        return food.fieldAssignment || {
            title: "Interview Another Explorer",
            issuedBy: "Professor Beatrice Finch",
            department: "Behavioral Observation Division",
            mission: "Ask one classmate: Would you try this food? Compare your answers."
        };

    }

    function openAssignment(assignment){

        const modal = document.getElementById("assignment-modal");

        if (!modal) return;

        document.getElementById("assignment-modal-title").textContent =
            assignment.title;

        document.getElementById("assignment-modal-meta").textContent =
            `${assignment.issuedBy} · ${assignment.department}`;

        document.getElementById("assignment-modal-mission").textContent =
            assignment.mission;

        modal.classList.add("assignment-modal--open");

    }

    function closeAssignment(){

        const modal = document.getElementById("assignment-modal");

        if (!modal) return;

        modal.classList.remove("assignment-modal--open");

    }

    document.addEventListener("DOMContentLoaded", () => {

        const closeButton =
            document.getElementById("assignment-modal-close");

        const modal =
            document.getElementById("assignment-modal");

        if (closeButton) {
            closeButton.addEventListener("click", closeAssignment);
        }

        if (modal) {
            modal.addEventListener("click", event => {
                if (event.target === modal) {
                    closeAssignment();
                }
            });
        }

    });

    return {
        getAssignment,
        openAssignment,
        closeAssignment
    };

})();