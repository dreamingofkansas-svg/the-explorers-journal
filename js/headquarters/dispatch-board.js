/*
=========================================================
Dispatch Board
Beta 1.5D
=========================================================
*/

const ExplorerDispatchBoard = (() => {

    function render(){

        const list =
            document.getElementById(
                "dispatch-board-list"
            );

        if(!list) return;

        list.innerHTML = `

<div class="dispatch-item">

<small>Today</small>

<h3>Professor Beatrice Finch</h3>

<p>

Excellent work documenting
your recent discoveries.

</p>

</div>

<div class="dispatch-item">

<small>Yesterday</small>

<h3>Archivist Moore</h3>

<p>

Your Explorer Passport
has been successfully archived.

</p>

</div>

<div class="dispatch-item">

<small>Incoming</small>

<h3>Chief Cartographer Ellis</h3>

<p>

Road Trip America is
currently under preparation.

</p>

</div>

`;

    }

    return{
        render
    };

})();