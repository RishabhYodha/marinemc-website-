// =========================================================
// MARINEMC — PREMIUM WEBSITE JAVASCRIPT
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

// =====================================================
// NAVBAR SCROLL EFFECT
// =====================================================

const nav = document.querySelector("nav");

function updateNavbar() {
    if (!nav) return;

    if (window.scrollY > 40) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", updateNavbar, {
    passive: true
});

updateNavbar();


// =====================================================
// SCROLL REVEAL ANIMATION
// =====================================================

const revealElements = document.querySelectorAll(
    ".section-head, .card, .status-box, .join"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


// =====================================================
// SMOOTH NAVIGATION
// =====================================================

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const navHeight = nav
            ? nav.offsetHeight
            : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            navHeight -
            15;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


// =====================================================
// MOUSE PARALLAX HERO
// =====================================================

const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");

if (hero && heroContent) {

    hero.addEventListener("mousemove", (event) => {

        // Disable effect on small screens
        if (window.innerWidth < 800) return;

        const rect = hero.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) /
            rect.width -
            0.5;

        const y =
            (event.clientY - rect.top) /
            rect.height -
            0.5;

        const moveX = x * 10;
        const moveY = y * 7;

        heroContent.style.transform =
            `translate3d(${moveX}px, ${moveY}px, 0)`;

    });

    hero.addEventListener("mouseleave", () => {

        heroContent.style.transform =
            "translate3d(0, 0, 0)";

    });

}


// =====================================================
// 3D CARD TILT
// =====================================================

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        if (window.innerWidth < 800) return;

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -3;

        const rotateY =
            ((x - centerX) / centerX) * 3;

        card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


// =====================================================
// COPY SERVER IP
// =====================================================

window.copyIP = async function () {

    const ip = "marinemc.mcsh.io";

    try {

        await navigator.clipboard.writeText(ip);

        showNotification(
            "✓ Server IP copied!",
            ip
        );

    } catch (error) {

        // Fallback for browsers that block clipboard API

        const textarea =
            document.createElement("textarea");

        textarea.value = ip;

        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.select();

        try {
            document.execCommand("copy");

            showNotification(
                "✓ Server IP copied!",
                ip
            );

        } catch {

            showNotification(
                "Server IP",
                ip
            );

        }

        textarea.remove();

    }

};


// =====================================================
// CUSTOM NOTIFICATION
// =====================================================

function
