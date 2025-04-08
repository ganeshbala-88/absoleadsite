document.addEventListener('DOMContentLoaded', function() {
  const chooseSection = document.querySelector('.industry');
  const containers = document.querySelectorAll('.industry_container');
  const container = containers[0]; // Assuming you have only one container to paginate
  const cards = document.querySelectorAll('.industry_card'); // You might need this later for calculations
  let numVisible = window.innerWidth < 768 ? 1 : 2;
  let scrollAmount = window.innerWidth < 768 ? window.innerWidth : window.innerWidth / 2;
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
      if (!container) return; // Exit if container is not found
      prevButton.disabled = container.scrollLeft <= 0 || isScrolling;
      nextButton.disabled = container.scrollLeft >= container.scrollWidth - container.clientWidth - 1 || isScrolling;
  }

  function scrollLeft() {
      if (!container || isScrolling) return;
      isScrolling = true;
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      setTimeout(() => {
          isScrolling = false;
          updateButtonVisibility();
      }, 300);
  }

  function scrollRight() {
      if (!container || isScrolling) return;
      isScrolling = true;
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
      numVisible = window.innerWidth < 768 ? 1 : 2;
      scrollAmount = window.innerWidth < 768 ? window.innerWidth : window.innerWidth / 2;
      updateButtonVisibility();
  }

  window.addEventListener('resize', handleResize);

  updateButtonVisibility();
});

const sidebarToggle = document.querySelector('.sidebar-toggle');
const navMenu = document.querySelector('.nav__menu');
const navClose = document.getElementById('nav-close');

sidebarToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active'); // Toggle the active class
});

navClose.addEventListener('click', () => {
    navMenu.classList.remove('active'); // Close the menu
});