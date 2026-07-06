/*
=========================================================
Explorer Society Dispatch Engine
Beta 1.3.1B
Rich Dispatch System
=========================================================
*/

const ExplorerDispatch = (() => {

    function send({

        title = "",

        classification = "Routine Observation",

        author = "",

        department = "",

        message = ""

    }){

        const existing =
            document.querySelector(".achievement-toast");

        if(existing){
            existing.remove();
        }

        const toast =
            document.createElement("div");

        toast.className =
            "achievement-toast";

        toast.innerHTML = `

            <div class="dispatch-classification">

                ${classification}

            </div>

            <h3>

                📜 Explorer Society Dispatch

            </h3>

            <h2>${title}</h2>

            <p>${message}</p>

            <footer>

                <strong>${author}</strong>

                <br>

                <small>${department}</small>

            </footer>

        `;

        document.body.appendChild(toast);

        requestAnimationFrame(() => {

            toast.classList.add(
                "achievement-toast--show"
            );

        });

        setTimeout(() => {

            toast.classList.remove(
                "achievement-toast--show"
            );

            setTimeout(() => {
                toast.remove();
            }, 500);

        }, 4500);

    }

    return {
        send
    };

})();