// GameLoader Module using IIFE (Immediately Invoked Function Expression)
const GameLoader = (function () {
  const container = document.querySelector('.game-container');
  let gameCount = 0;
  const MAX_GAMES = 50; // ✅ Change this value when you add more games

  // Create a game card element
  function createGameCard(index) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <h3>Game ${index}</h3>
      <p>Game description goes here.</p>
    `;
    return card;
  }

  // Load a specified number of game cards
  function loadGames(quantity = 10) {
    // Stop if we've reached the max number of games
    if (gameCount >= MAX_GAMES) return;

    const gamesToLoad = Math.min(quantity, MAX_GAMES - gameCount);

    for (let i = 0; i < gamesToLoad; i++) {
      gameCount++;
      container.appendChild(createGameCard(gameCount));
    }
  }

  // Check if the user is near the bottom of the page
  function isBottomOfPage() {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
  }

  // Scroll event
  function handleScroll() {
    if (isBottomOfPage()) {
      loadGames(10);
    }
  }

  // Initialize the scroll listener
  function init() {
    window.addEventListener('scroll', handleScroll);
    loadGames(15); // Initial load
  }

  // Public API
  return {
    init,
  };
})();

// Start the infinite scroll functionality
GameLoader.init();



// Button back to top
const BackToTopModule = (() => {
  const backToTop = document.getElementById("backToTop");

  const handleScroll = () => {
    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const init = () => {
    window.addEventListener("scroll", handleScroll);
    backToTop.addEventListener("click", scrollToTop);
  };

  return {
    init,
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  BackToTopModule.init();
});
