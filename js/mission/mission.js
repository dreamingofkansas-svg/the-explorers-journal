/*
=========================================================
Explorer Mission Module
Beta 1.2E Pack B
=========================================================
*/

const ExplorerMission = (() => {

    const missionFill = document.getElementById("mission-progress-fill");
    const missionText = document.getElementById("mission-progress-text");
    const missionCount = document.getElementById("mission-foods-count");
    const missionRank = document.getElementById("mission-rank");
    const progressText = document.getElementById("progress-text");

    function getRank(completed, total){

        if (completed === 0) return "New Explorer";
        if (completed < 6) return "Curious Explorer";
        if (completed < 12) return "Brave Explorer";
        if (completed < total) return "Fearless Explorer";

        return "Food Expedition Master";
    }

    function update(completed, total){

        const percent =
            Math.round((completed / total) * 100);

        if (progressText) {
            progressText.textContent =
                `${completed} / ${total} Explored`;
        }

        if (missionFill) {
            missionFill.style.width =
                `${percent}%`;
        }

        if (missionText) {
            missionText.textContent =
                `${percent}% Complete`;
        }

        if (missionCount) {
            missionCount.textContent =
                completed;
        }

        if (missionRank) {
            missionRank.textContent =
                getRank(completed, total);
        }
    }

    return {
        update
    };

})();