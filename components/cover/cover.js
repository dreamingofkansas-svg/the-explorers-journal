/*
=========================================================
Explorer's Journal
Component: Cover
Version: 2.4.4
Purpose: Controls the opening animation of the passport
         and transitions to the Editor's Letter.
=========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    // --------------------------------------------------
    // Elements
    // --------------------------------------------------

    const cover = document.querySelector(".cover");
    const button = document.getElementById("begin-expedition");
    const editor = document.getElementById("editors-letter");

    // Stop if required elements are missing
    if (!cover || !button) return;

    // --------------------------------------------------
    // Begin Expedition
    // --------------------------------------------------

    button.addEventListener("click", () => {

        // Prevent multiple rapid clicks
        button.disabled = true;

        // Play passport opening animation
        cover.classList.add("cover--opening");

        // Wait for the animation to finish
        setTimeout(() => {

            if (editor) {

                // Scroll to the Editor's Letter
                editor.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // Reset the cover after scrolling
                setTimeout(() => {

                    cover.classList.remove("cover--opening");
                    button.disabled = false;

                }, 1200);

            } else {

                // Temporary fallback while developing
                alert("Editor's Letter component not found.");

                cover.classList.remove("cover--opening");
                button.disabled = false;

            }

        }, 900);

    });

});