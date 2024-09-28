// Attach filter event listeners
const filterButtons = document.querySelectorAll('.filter-btn');
const resourceCards = document.querySelectorAll('.resource-card');

filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const category = this.getAttribute('data-category');

        resourceCards.forEach(card => {
            card.style.display = (category === 'all' || card.getAttribute('data-category') === category) ? 'block' : 'none';
        });
    });
});


// Show more / show less functionality
const cards = document.querySelectorAll('.resource-card');
const showMoreBtn = document.querySelector('.show-more-btn');
const showLessBtn = document.querySelector('.show-less-btn');
const cardsToShow = 8;
let cardsShown = cardsToShow;

cards.forEach((card, index) => {
    card.style.display = index < cardsToShow ? 'block' : 'none';
});

if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
        cards.forEach((card, index) => {
            if (index >= cardsShown && index < cardsShown + cardsToShow) {
                card.style.display = 'block';
            }
        });

        if (cardsShown >= cards.length) {
            showMoreBtn.style.display = 'none';
            showLessBtn.style.display = 'block';
        }

        cardsShown += cardsToShow;
    });
}
if (showLessBtn) {
    showLessBtn.addEventListener('click', () => {
        cards.forEach((card, index) => {
            card.style.display = index < cardsToShow ? 'block' : 'none';
        });

        cardsShown = cardsToShow;
        showLessBtn.style.display = 'none';
        showMoreBtn.style.display = 'block';
    });
}

