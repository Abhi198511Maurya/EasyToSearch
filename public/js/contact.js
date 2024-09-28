const contactForm = document.getElementById('contact-form');
const formResponse = document.getElementById('form-response');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '' || email === '' || subject === '' || message === '') {
        formResponse.textContent = 'Please fill in all fields.';
        formResponse.style.color = 'red';
        return;
    }

    // Simulate form submission
    setTimeout(() => {
        formResponse.textContent = 'Thank you for your message! We will get back to you soon.';
        formResponse.style.color = 'green';
        contactForm.reset();
    }, 1000);
});