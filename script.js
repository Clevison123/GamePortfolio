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


// Home slides module
const sliderModule = (function () {
  // Selects all <picture> elements inside .slides
  const slides = document.querySelectorAll('.slides picture');  
  let currentSlide = 0; // Stores the index of the current slide
  let autoSlideInterval; // Stores the interval for automatic sliding

  /**
   * Displays the slide corresponding to the given index.
   * Hides all other slides by toggling the 'active' class.
   * @param {number} slideIndex - The index of the slide to display.
   */
  function showSlides(slideIndex) {
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === slideIndex);
    });
  }

  /**
   * Moves to the next slide in the sequence.
   * If the last slide is reached, it loops back to the first slide.
   */
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlides(currentSlide);
  }

  /**
   * Moves to the previous slide in the sequence.
   * If the first slide is reached, it loops back to the last slide.
   */
  function previousSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlides(currentSlide);
  }

  /**
   * Starts the automatic slide transition.
   * Clears any existing interval to avoid multiple instances.
   */
  function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000); // Changes slide every 5 seconds
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
   * - Starts automatic sliding
   */
  function init() {
    showSlides(currentSlide);
    attachEvents();
    startAutoSlide();
  }

  // Exposes the init function to be called externally
  return { init };
})();

// Initialize the slider on page load
sliderModule.init();


// Games Carousel module
const GameCarrousel = (function () {
  let currentIndex = 0; // Stores the index of the current game slide
  const gameGallery = document.querySelector('.game-gallery'); // Selects the game gallery container
  const games = document.querySelectorAll('.game'); // Selects all game elements
  const prevButton = document.getElementById('prev'); // Selects the previous button
  const nextButton = document.getElementById('next'); // Selects the next button

  /**
   * Updates the carousel position based on the current index.
   * Moves the gallery horizontally using CSS transform.
   */
  function updateCarrousel() {
    const offset = -currentIndex * 100; // Calculates the new position
    gameGallery.style.transform = `translateX(${offset}%)`; // Moves the gallery
  }

  /**
   * Moves to the next game slide in the carousel.
   * Loops back to the first slide if the last one is reached.
   */
  function nextSlideBtn() {
    currentIndex = (currentIndex + 1) % games.length;
    updateCarrousel();
  }

  /**
   * Moves to the previous game slide in the carousel.
   * Loops back to the last slide if the first one is reached.
   */
  function prevSlideBtn() {
    currentIndex = (currentIndex - 1 + games.length) % games.length;
    updateCarrousel();
  }

  /**
   * Initializes the carousel:
   * - Attaches event listeners to navigation buttons.
   */
  function init() {
    prevButton.addEventListener('click', prevSlideBtn);
    nextButton.addEventListener('click', nextSlideBtn);
  }

  // Exposes the init function to be called externally
  return { init };
})();

// Initialize the carousel when the page loads
document.addEventListener('DOMContentLoaded', GameCarrousel.init);


// Footer
const BackToTopModule = (() => {
  const backToTop = document.getElementById("backToTop");

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 300) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  };

  // Function to scroll smoothly to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Event listeners
  const init = () => {
    window.addEventListener("scroll", handleScroll);
    backToTop.addEventListener("click", scrollToTop);
  };

  return {
    init,
  };
})();

// Initialize the BackToTopModule
document.addEventListener("DOMContentLoaded", BackToTopModule.init);
