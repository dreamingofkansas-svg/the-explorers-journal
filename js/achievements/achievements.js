/*
=========================================================
Explorer Society
Achievements
Beta 1.3.1B
=========================================================
*/

const ExplorerAchievements = (() => {

    function diplomat(){

        ExplorerDispatch.send({

            title:
                "Diplomat",

            classification:
                "Behavioral Observation",

            author:
                "Professor Beatrice Finch",

            department:
                "Behavioral Observation Division",

            message:
                "Subject has consistently avoided committing to a definitive culinary position. Further interviews are unlikely to improve this condition."

        });

    }

    function openMinded(){

        ExplorerDispatch.send({

            title:
                "Open Minded",

            classification:
                "Personnel Commendation",

            author:
                "Captain Elias Graves",

            department:
                "Expedition Logistics",

            message:
                "Subject willingly accepted an unfamiliar culinary challenge. Such curiosity advances the Society's mission."

        });

    }

    return {

        diplomat,
        openMinded

    };

})();