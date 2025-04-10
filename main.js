document.addEventListener('DOMContentLoaded', function() {
    const chooseSection = document.querySelector('.industry');
    const container = document.querySelector('.industry_container'); // Select the container directly
    const cards = document.querySelectorAll('.industry_card');
    let numVisible = window.innerWidth < 820 ? 1 : 1;
    let isScrolling = false;

    const prevButton = document.createElement('button');
    const nextButton = document.createElement('button');
    prevButton.classList.add('pagination-button');
    nextButton.classList.add('pagination-button');
    prevButton.textContent = '‹';
    nextButton.textContent = '›';

    const paginationButtons = document.createElement('div');
    paginationButtons.classList.add('pagination-buttons');
    paginationButtons.appendChild(prevButton);
    paginationButtons.appendChild(nextButton);
    chooseSection.appendChild(paginationButtons);

    function updateButtonVisibility() {
        if (!container) return;
        prevButton.disabled = container.scrollLeft <= 0 || isScrolling;
        nextButton.disabled = container.scrollLeft >= container.scrollWidth - container.clientWidth - 1 || isScrolling;
    }

    function calculateScrollAmount() {
        if (!container || cards.length === 0) return 0;
        const firstCardWidth = cards[0].offsetWidth+20;
        const cardMarginRight = parseInt(window.getComputedStyle(cards[0]).marginRight) || 0;
        return numVisible === 1 ? firstCardWidth + cardMarginRight : (firstCardWidth + cardMarginRight) * numVisible;
    }

    function scrollLeft() {
        if (!container || isScrolling) return;
        isScrolling = true;
        const scrollAmount = calculateScrollAmount();
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        setTimeout(() => {
            isScrolling = false;
            updateButtonVisibility();
        }, 300);
    }

    function scrollRight() {
        if (!container || isScrolling) return;
        isScrolling = true;
        const scrollAmount = calculateScrollAmount();
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        setTimeout(() => {
            isScrolling = false;
            updateButtonVisibility();
        }, 300);
    }

    if (container) {
        container.addEventListener('scroll', () => {
            updateButtonVisibility();
        });
    }

    prevButton.addEventListener('click', scrollLeft);
    nextButton.addEventListener('click', scrollRight);

    function handleResize() {
        numVisible = window.innerWidth < 768 ? 1 : 1;
        updateButtonVisibility();
    }

    window.addEventListener('resize', handleResize);

    updateButtonVisibility(); // Initial call
});
const sidebar = document.querySelector('.sidebar');
const toggle = document.querySelector('.toggle');
const content = document.querySelector('.content');

function toggleMenu() {
    sidebar.classList.toggle('active');
    toggle.classList.toggle('active');
    content.classList.toggle('sidebar-open');
}

document.addEventListener('click', function(event) {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickInsideToggle = toggle.contains(event.target);
    const isSidebarActive = sidebar.classList.contains('active');

    if (isSidebarActive && !isClickInsideSidebar && !isClickInsideToggle) {
        toggleMenu(); // Close the sidebar if clicked outside
    }
});