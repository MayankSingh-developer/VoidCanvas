/* =====================================================
   VOIDCANVAS — FINAL JAVASCRIPT
===================================================== */


/* ================= LETTER ANIMATION ================= */

function splitText(element) {

    if (!element) return;

    if (element.dataset.split === "true") {
        return;
    }

    element.dataset.split = "true";

    const text =
        element.textContent.trim();

    element.innerHTML = "";

    const words =
        text.split(/\s+/);

    words.forEach(
        (word, wordIndex) => {

            const wordElement =
                document.createElement("span");

            wordElement.className =
                "word";

            [...word].forEach(
                character => {

                    const letter =
                        document.createElement("span");

                    letter.className =
                        "letter";

                    letter.textContent =
                        character;

                    wordElement.appendChild(
                        letter
                    );

                }
            );

            element.appendChild(
                wordElement
            );

            if (
                wordIndex <
                words.length - 1
            ) {

                element.appendChild(
                    document.createTextNode(" ")
                );

            }

        }
    );
}


/* ================= ANIMATED TEXT ================= */

const animated =
    document.querySelectorAll(
        ".eyebrow," +
        "h1," +
        ".hero-description," +
        ".hero-text," +
        ".hero-buttons a," +
        ".scroll-indicator span," +
        ".section-label," +
        ".section-heading h2," +
        ".section-heading p," +
        ".service-card h3," +
        ".service-card p," +
        ".service-link," +
        ".about h2," +
        ".about p," +
        ".contact h2," +
        ".contact p," +
        ".contact-button," +
        "footer"
    );


animated.forEach(
    splitText
);


/* ================= PLAY LETTERS ================= */

function playLetters(element) {

    if (!element) return;

    if (
        element.dataset.played ===
        "true"
    ) {
        return;
    }

    element.dataset.played =
        "true";

    const letters =
        element.querySelectorAll(
            ".letter"
        );

    letters.forEach(
        (letter, index) => {

            setTimeout(
                () => {

                    letter.classList.add(
                        "show"
                    );

                },
                index * 18
            );

        }
    );
}


/* ================= SCROLL OBSERVER ================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        playLetters(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: .12
        }
    );


animated.forEach(
    element => {

        observer.observe(
            element
        );

    }
);


/* ================= PARTICLES ================= */

const hero =
    document.querySelector(".hero");


if (hero) {

    for (
        let i = 0;
        i < 38;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );

        particle.style.cssText = `
            position:absolute;
            width:${Math.random() * 3 + 1}px;
            height:${Math.random() * 3 + 1}px;
            border-radius:50%;
            background:#ff7b18;
            box-shadow:0 0 10px #ffb52e;
            left:${Math.random() * 100}%;
            top:${Math.random() * 100}%;
            pointer-events:none;
            z-index:0;
        `;

        particle.animate(
            [
                {
                    opacity: 0,

                    transform:
                        "translateY(40px) scale(.3)"
                },

                {
                    opacity: 1,

                    transform:
                        "translateY(-20px) scale(1)"
                },

                {
                    opacity: 0,

                    transform:
                        "translateY(-220px) scale(.5)"
                }
            ],
            {
                duration:
                    5000 +
                    Math.random() * 6000,

                delay:
                    Math.random() * 5000,

                iterations:
                    Infinity
            }
        );

        hero.appendChild(
            particle
        );

    }

}


/* ================= CARD EXPAND ================= */

const cardsContainer =
    document.getElementById(
        "cardsContainer"
    );

let expanded = false;


if (cardsContainer) {

    cardsContainer.addEventListener(
        "click",
        event => {

            const card =
                event.target.closest(
                    ".manga-card"
                );

            if (!card) return;

            expanded =
                !expanded;

            cardsContainer.classList.toggle(
                "expanded",
                expanded
            );

        }
    );

}


/* ================= 3D MOUSE ================= */

const visual =
    document.querySelector(
        ".hero-visual"
    );


if (
    visual &&
    cardsContainer
) {

    visual.addEventListener(
        "mousemove",
        event => {

            if (expanded) return;

            const rect =
                visual.getBoundingClientRect();

            const rotateX =
                (
                    (event.clientY -
                    rect.top) /
                    rect.height -
                    .5
                ) * -5;

            const rotateY =
                (
                    (event.clientX -
                    rect.left) /
                    rect.width -
                    .5
                ) * 7;

            cardsContainer.style.transform =
                `
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                `;

        }
    );


    visual.addEventListener(
        "mouseleave",
        () => {

            cardsContainer.style.transform =
                "";

        }
    );

}


/* ================= NAVBAR ================= */

const navbar =
    document.querySelector(
        ".navbar"
    );


window.addEventListener(
    "scroll",
    () => {

        if (!navbar) return;

        if (
            window.scrollY > 40
        ) {

            navbar.style.background =
                "rgba(3,3,5,.96)";

        } else {

            navbar.style.background =
                "rgba(3,3,5,.72)";

        }

    }
);


/* ================= PAGE TRANSITION ================= */

const transition =
    document.getElementById(
        "pageTransition"
    );


const serviceLinks =
    document.querySelectorAll(
        'a[href="editing.html"],' +
        'a[href="drawing.html"],' +
        'a[href="web.html"]'
    );


serviceLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const destination =
                    link.href;

                transition.classList.remove(
                    "close"
                );

                transition.classList.add(
                    "open"
                );

                setTimeout(
                    () => {

                        window.location.href =
                            destination;

                    },
                    800
                );

            }
        );

    }
);


/* ================= HOME ================= */

document.querySelectorAll(
    'a[href="#home"]'
).forEach(
    link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

                document
                    .querySelector("#home")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    }
);


/* ================= PAGE SHOW ================= */

window.addEventListener(
    "pageshow",
    () => {

        if (!transition) return;

        transition.classList.remove(
            "open",
            "close"
        );

    }
);


/* ================= AUTO CARD FOCUS ================= */

let autoStep = 0;


setInterval(
    () => {

        if (
            !cardsContainer ||
            expanded
        ) {
            return;
        }

        autoStep =
            (autoStep + 1) % 3;

        const cards =
            cardsContainer.querySelectorAll(
                ".manga-card"
            );

        cards.forEach(
            card => {

                card.classList.remove(
                    "focus-card"
                );

            }
        );

        cards[
            autoStep
        ].classList.add(
            "focus-card"
        );

        setTimeout(
            () => {

                cards[
                    autoStep
                ].classList.remove(
                    "focus-card"
                );

            },
            1200
        );

    },
    4000
);