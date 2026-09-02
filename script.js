/* =====================================================
   VOIDCANVAS — OPTIMIZED JAVASCRIPT
===================================================== */


/* =====================================================
   LETTER ANIMATION
===================================================== */

function splitText(element) {

    if (!element) return;

    // Already processed
    if (element.dataset.split === "true") return;

    // IMPORTANT:
    // Agar element ke andar existing HTML hai
    // jaise <span>, <b> etc. to uska HTML destroy
    // nahi karna.

    if (element.children.length > 0) {
        return;
    }

    const text = element.textContent.trim();

    if (!text) return;

    element.dataset.split = "true";

    element.innerHTML = "";

    const words = text.split(/\s+/);

    words.forEach((word, wordIndex) => {

        const wordElement = document.createElement("span");

        wordElement.className = "word";

        [...word].forEach(character => {

            const letter = document.createElement("span");

            letter.className = "letter";

            letter.textContent = character;

            wordElement.appendChild(letter);
        });

        element.appendChild(wordElement);

        if (wordIndex < words.length - 1) {

            element.appendChild(
                document.createTextNode(" ")
            );
        }
    });
}


/* =====================================================
   ANIMATED ELEMENTS
===================================================== */

const animated = document.querySelectorAll(
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


/*
   Only split simple text elements.

   This prevents:
   <h1>We create things <span>worth remembering.</span></h1>

   from losing its gradient span.
*/

animated.forEach(element => {

    if (element.children.length === 0) {
        splitText(element);
    }
});


/* =====================================================
   PLAY LETTERS
===================================================== */

function playLetters(element) {

    if (!element) return;

    if (element.dataset.played === "true") {
        return;
    }

    element.dataset.played = "true";

    const letters =
        element.querySelectorAll(".letter");

    letters.forEach((letter, index) => {

        setTimeout(() => {

            letter.classList.add("show");

        }, index * 18);
    });
}


/* =====================================================
   INTERSECTION OBSERVER
===================================================== */

if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        playLetters(entry.target);

                        observer.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: 0.12
            }
        );

    animated.forEach(element => {

        if (
            element.querySelector(".letter")
        ) {
            observer.observe(element);
        }
    });

} else {

    animated.forEach(element => {

        playLetters(element);

    });
}


/* =====================================================
   PARTICLES — MOBILE OPTIMIZED
===================================================== */

const hero =
    document.querySelector(".hero");

if (hero) {

    let particleCount = 38;

    if (window.innerWidth <= 480) {

        particleCount = 10;

    } else if (window.innerWidth <= 768) {

        particleCount = 18;
    }


    /*
       Use DocumentFragment so browser doesn't
       continuously repaint while creating particles.
    */

    const fragment =
        document.createDocumentFragment();


    for (let i = 0; i < particleCount; i++) {

        const particle =
            document.createElement("span");


        const size =
            Math.random() * 3 + 1;

        particle.style.cssText = `
            position:absolute;
            width:${size}px;
            height:${size}px;
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

                iterations: Infinity
            }
        );


        fragment.appendChild(particle);
    }


    hero.appendChild(fragment);
}


/* =====================================================
   CARD EXPAND
===================================================== */

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


            expanded = !expanded;


            cardsContainer.classList.toggle(
                "expanded",
                expanded
            );
        }
    );
}


/* =====================================================
   3D MOUSE
   DESKTOP ONLY
===================================================== */

const visual =
    document.querySelector(
        ".hero-visual"
    );


const hasFinePointer =
    window.matchMedia(
        "(pointer: fine)"
    ).matches;


if (
    visual &&
    cardsContainer &&
    hasFinePointer
) {

    visual.addEventListener(
        "mousemove",
        event => {

            if (expanded) return;


            const rect =
                visual.getBoundingClientRect();


            const rotateX =
                (
                    (
                        (event.clientY - rect.top) /
                        rect.height
                    ) - 0.5
                ) * -5;


            const rotateY =
                (
                    (
                        (event.clientX - rect.left) /
                        rect.width
                    ) - 0.5
                ) * 7;


            cardsContainer.style.transform =
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
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


/* =====================================================
   NAVBAR
===================================================== */

const navbar =
    document.querySelector(
        ".navbar"
    );


function updateNavbar() {

    if (!navbar) return;


    if (window.scrollY > 40) {

        navbar.style.background =
            "rgba(3,3,5,.96)";

    } else {

        navbar.style.background =
            "rgba(3,3,5,.72)";
    }
}


window.addEventListener(
    "scroll",
    updateNavbar,
    {
        passive: true
    }
);


updateNavbar();


/* =====================================================
   PAGE TRANSITION
===================================================== */

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


if (transition) {

    serviceLinks.forEach(link => {

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


                setTimeout(() => {

                    window.location.href =
                        destination;

                }, 800);
            }
        );
    });
}


/* =====================================================
   HOME LINK
===================================================== */

document
    .querySelectorAll(
        'a[href="#home"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();


                const home =
                    document.querySelector(
                        "#home"
                    );


                if (home) {

                    home.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        );
    });


/* =====================================================
   PAGE SHOW
===================================================== */

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


/* =====================================================
   AUTO CARD FOCUS
===================================================== */

let autoStep = 0;


setInterval(() => {

    if (!cardsContainer) return;

    if (expanded) return;


    const cards =
        cardsContainer.querySelectorAll(
            ".manga-card"
        );


    if (!cards.length) return;


    autoStep =
        (autoStep + 1) %
        cards.length;


    cards.forEach(card => {

        card.classList.remove(
            "focus-card"
        );
    });


    const activeCard =
        cards[autoStep];


    if (!activeCard) return;


    activeCard.classList.add(
        "focus-card"
    );


    setTimeout(() => {

        activeCard.classList.remove(
            "focus-card"
        );

    }, 1200);

}, 4000);