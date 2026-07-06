/*
=========================================================
Explorer Journal Storage
Beta 1.2E
=========================================================
*/

const ExplorerStorage = (() => {

    const STORAGE_KEY = "explorerJournal.issue001.foodVotes";

    function loadVotes(){
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    }

    function saveVotes(votes){
        localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
    }

    function saveVote(foodId, vote){
        const votes = loadVotes();

        votes[foodId] = vote;

        saveVotes(votes);

        return votes;
    }

    function clearVotes(){
        localStorage.removeItem(STORAGE_KEY);
    }

    return {
        loadVotes,
        saveVotes,
        saveVote,
        clearVotes
    };

})();