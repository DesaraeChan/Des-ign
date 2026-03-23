console.log("javascript on");

const sandToggle = document.querySelector(".Sandwich");
const navbar = document.querySelector("nav");
const navLinks = document.querySelector(".navLinks");
const mobileLinks = document.querySelector(".mobileLinks");

let isVisible = false;
// https://code-hl.com/javascript/tutorials/javascript-toggle-boolean
// navbar.setAttribute('aria-hidden', 'true');
// navbar.setAttribute('aria-labelledby', 'menu-toggle');

// sandToggle.setAttribute('id', 'menu_toggle')
sandToggle.setAttribute('aria-label', 'Sandwich Menu');
// sandToggle.setAttribute('aria-controls', 'menu')
sandToggle.setAttribute('aria-expanded', 'false');

sandToggle.addEventListener("click", () => {
    isVisible = !isVisible;

    sandToggle.classList.toggle('active');
    navbar.classList.toggle("active");

    if (isVisible) {
        mobileLinks.classList.add("active");

        sandToggle.setAttribute('aria-expanded', 'true');
    } else {
        mobileLinks.classList.remove("active");
        sandToggle.setAttribute('aria-expanded', 'false');
    }
});

window.addEventListener("resize", () => {
    const breakpoint = 880; // your breakpoint in pixels (match your CSS media query)

    if (window.innerWidth > breakpoint && isVisible) {
        // Close the menu
        isVisible = false;
        sandToggle.classList.remove('active');
        mobileLinks.classList.remove('active');
        navbar.classList.remove('active');
        sandToggle.setAttribute('aria-expanded', false);
    }
});