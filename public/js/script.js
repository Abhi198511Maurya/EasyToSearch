
// ---------------------------------- FOOTER SUBSCRIPTION SECTION  --------------------------------------- //
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('newsletter-email').value.trim();
    const responseMessage = document.getElementById('newsletter-response');

    if (email.length === 0) {
        responseMessage.textContent = 'Please enter your email.';
        responseMessage.style.color = 'red';
        return;
    }

    // Simulate subscription process
    setTimeout(() => {
        responseMessage.textContent = 'Thank you for subscribing!';
        responseMessage.style.color = 'green';
        document.getElementById('newsletter-form').reset();
    }, 1000);
});


// ---------------------------------- ADD CLASS SCROLLED ON SCROLL USING JS --------------------------------------- //
window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) { // Change 100 to your desired scroll distance
        navbar.style.position = "fixed"
        navbar.classList.add('scrolled');
    } else {
        navbar.style.position = "absolute"
        navbar.classList.remove('scrolled');
    }
});

// --------------------- RESPONSIVE NAVIGATION (MENU BAR) BAR USING JS ---------------------------- //
const mobileMenu = document.getElementById('mobile-menu');
const navbarLinks = document.getElementById('navbar-links');
const icon = mobileMenu.querySelector('#mobile-menu i');

// ---------------------------------- CLICK EVENT ON OUTSIDE OF NAVLINKS ----------------------------- //
document.addEventListener('click', (e) => {
    if (mobileMenu.contains(e.target)) {
        navbarLinks.classList.toggle('open');
        icon.classList.toggle('fa-xmark');
    } else if (!navbarLinks.contains(e.target)) {
        icon.classList.remove('fa-xmark');
        navbarLinks.classList.remove('open');
    }
});


// ---------------------------------- HIDE NAV LINKS ON MOBILES  --------------------------------------- //
window.addEventListener('scroll', () => {
    icon.classList.remove('fa-xmark');
    navbarLinks.classList.remove('open');
});


// ---------------------------------- GET THE CURRENT PATH AND ADD UNDERLINE TO THE NAVIGATION LINKS --------------------------------------- //
const currentPath = window.location.pathname;

const navLinks = document.querySelectorAll('.navbar-links li a');

navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;

    if (linkPath === currentPath) {
        link.classList.add('underline');
    } else {
        link.classList.remove('underline');
    }
    if (currentPath === '/') {
        navLinks[0].classList.add('underline');
    }

});

// navLinks[0].classList.add('underline');

// ---------------------------------- SLIDER IN HERO SECTION --------------------------------------- //
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}


// Automatic Slideshow
setInterval(() => {
    nextSlide();
}, 7000);


// ---------------------------------- FAQ'S SECTION  --------------------------------------- //
document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
        const parent = item.parentNode;

        // Toggle active class
        parent.classList.toggle('active');

        // Close other open FAQs
        document.querySelectorAll('.faq-item').forEach(child => {
            if (child !== parent) {
                child.classList.remove('active');
            }
        });
    });
});
