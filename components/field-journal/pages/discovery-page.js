/*
=========================================================
Field Journal Discovery Page
Generic Data Renderer
Image Ready
=========================================================
*/

const FieldJournalDiscoveryPage = (() => {

    function render(section, destination){

        if (!section) {
            return `
                <div class="field-journal-page field-journal-page--discovery">
                    <p class="field-journal-page__label">DISCOVERY</p>
                    <h1>No discovery data found.</h1>
                </div>
            `;
        }

        const items =
            section.items
                .map((item, index) => {

                    const itemTitle =
                        item.name || item.title;

                    const rating =
                        item.rating
                            ? "★".repeat(item.rating) + "☆".repeat(5 - item.rating)
                            : "";

                    return `
                        <article class="discovery-card">

                            ${
                                item.image
                                    ? `
                                        <figure class="discovery-evidence">

    <img
        class="discovery-card__image"
        src="assets/road-trip/${destination.folder}/${item.image}"
        alt="${itemTitle}">

    <figcaption>
        Evidence No. ${String(index + 1).padStart(3, "0")}
        <span>${itemTitle}</span>
    </figcaption>

</figure>
                                      `
                                    : `
                                        <div class="discovery-card__emoji">
                                            ${item.emoji || "✦"}
                                        </div>
                                      `
                            }

                            <div>
                                <h2>
                                    ${itemTitle}
                                </h2>

                                ${
                                    item.location
                                        ? `<p class="discovery-card__location">${item.location}</p>`
                                        : ""
                                }

                                <p>
                                    ${item.description}
                                </p>

                                ${
                                    rating
                                        ? `<strong class="discovery-card__rating">${rating}</strong>`
                                        : ""
                                }
                            </div>

                        </article>
                    `;
                })
                .join("");

        return `
            <div class="field-journal-page field-journal-page--discovery">

                <p class="field-journal-page__label">
                    DISCOVERY
                </p>

                <h1>
                    ${section.title}
                </h1>

                <p class="discovery-intro">
                    ${section.intro}
                </p>

                <div class="discovery-list">
                    ${items}
                </div>

                ${
                    section.blakeNote
                        ? `
                            <aside class="discovery-blake-note">
                                <strong>Blake's Note</strong>
                                <p>${section.blakeNote}</p>
                            </aside>
                        `
                        : ""
                }

                ${
                    section.question
                        ? `
                            <div class="discovery-question">
                                <strong>Explorer Notes</strong>
                                <p>${section.question}</p>
                                <div class="discovery-lines"></div>
                            </div>
                        `
                        : ""
                }

            </div>
        `;
    }

    return { render };

})();