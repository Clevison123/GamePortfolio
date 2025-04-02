// Events to open and close my navList
// Design Pattern
const menuModule = (function() {
  // Private variables
  let menuIcon = document.getElementById('hamburger');
  let sideBar = document.getElementById('sidebar');
  let closeButton = document.getElementById('closeButton');
  let navList = document.querySelectorAll('#sidebar a');

  // Function to toggle the sidebar and hide/show the hamburger menu
  function toggleSidebar() {
    sideBar.classList.toggle('show');
    menuIcon.classList.toggle('hidden') // Hides the hamburger when the sidebar opens
  }
  
  function closeSidebar() {
    sideBar.classList.remove('show');
    menuIcon.classList.remove('hidden'); // Shows the hamburger when the sidebar closes
  }

  // Function to close the sidebar when a link is clicked
  function closeNavList() {
    closeSidebar();
  }

  // Function to close the sidebar when clicking outside of it
  function closeSidebarOutside(event) {
    if (!sideBar.contains(event.target) && !menuIcon.contains(event.target)) {
      closeSidebar();
    }
  }

  // Exposing the public interface (methods)
  return {
    init: function() {
      menuIcon.addEventListener('click', toggleSidebar);
      closeButton.addEventListener('click', closeSidebar);
      window.addEventListener('click', closeSidebarOutside);

      // Adds event to the links inside the sidebar
      navList.forEach((link) => {
        link.addEventListener('click', closeNavList);
      });
    },
  };
})();

// Initializing the menuModule
menuModule.init();


// Home Slides
// Design Pattern: Self-Executing Module (IIFE)
const sliderModule = (function () {
  // Select all slide images for both desktop and mobile
  const desktopSlides = document.querySelectorAll('.slide-desktop');
  const mobileSlides = document.querySelectorAll('.slide-mobile');
  let currentSlide = 0; // Index of the current slide

  /**
   * Displays the slide corresponding to the given index.
   * Hides all other slides.
   * @param {number} slideIndex - The index of the slide to display.
   */
  function showSlides(slideIndex) {
    [desktopSlides, mobileSlides].forEach((slides) => {
      slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === slideIndex);
      });
    });
  }

  /**
   * Moves to the next slide in the sequence.
   * Loops back to the first slide after the last one.
   */
  function nextSlide() {
    currentSlide = (currentSlide + 1) % desktopSlides.length;
    showSlides(currentSlide);
  }

  /**
   * Moves to the previous slide in the sequence.
   * Loops back to the last slide if on the first one.
   */
  function previousSlide() {
    currentSlide = (currentSlide - 1 + desktopSlides.length) % desktopSlides.length;
    showSlides(currentSlide);
  }

  /**
   * Automatically advances slides every 5 seconds.
   */
  function startAutoSlide() {
    setInterval(nextSlide, 5000);
  }

  /**
   * Attaches event listeners to navigation buttons.
   * Listens for clicks on "next" and "previous" buttons.
   */
  function attachEvents() {
    document.querySelector('.next-btn')?.addEventListener('click', nextSlide);
    document.querySelector('.prev-btn')?.addEventListener('click', previousSlide);
  }

  /**
   * Initializes the slider:
   * - Displays the first slide
   * - Attaches event listeners
   * - Starts auto-sliding
   */
  function init() {
    showSlides(currentSlide);
    attachEvents();
    startAutoSlide();
  }

  // Exposes the init function to be called externally
  return { init };
})();

// Initialize the slider
sliderModule.init();


// Games Carrousel
const GameCarrousel = (function () {
  let currentIndex = 0;
  const gameGallery = document.querySelector('.game-gallery');
  const games = document.querySelectorAll('.game');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');

  function updateCarrousel() {
    const offset = -currentIndex * 100;
    gameGallery.style.transform = `translateX(${offset}%)`;
  }

  function nextSlideBtn() {
    currentIndex = (currentIndex + 1) % games.length;
    updateCarrousel();
  }

  function prevSlideBtn() {
    currentIndex = (currentIndex - 1 + games.length) % games.length;
    updateCarrousel();
  }

  function init() {
    prevButton.addEventListener('click', prevSlideBtn);
    nextButton.addEventListener('click', nextSlideBtn);
  }

  return { init };
})();

// Initialize the carrousel
document.addEventListener('DOMContentLoaded', GameCarrousel.init);