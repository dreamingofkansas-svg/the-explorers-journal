/*
=========================================================
Explorer Profile
Beta 1.5C
=========================================================
*/

const ExplorerProfile = (() => {

    function getRank(completed, total){

        if (completed === 0)
            return "New Explorer";

        if (completed < 6)
            return "Curious Explorer";

        if (completed < 12)
            return "Brave Explorer";

        if (completed < total)
            return "Fearless Explorer";

        return "Food Expedition Master";

    }

    function update({completed,total}){

        const rank =
            getRank(completed,total);

        const profileRank =
            document.getElementById("hq-profile-rank");

        const profileFoods =
            document.getElementById("hq-profile-foods");

        const profilePercent =
            document.getElementById("hq-profile-percent");

        if(profileRank)
            profileRank.textContent = rank;

        if(profileFoods)
            profileFoods.textContent =
                completed;

        if(profilePercent)
            profilePercent.textContent =
                `${Math.round((completed/total)*100)}%`;

    }

    return{
        update
    };

})();