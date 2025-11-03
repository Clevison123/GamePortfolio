// GameLoader Module using IIFE (Immediately Invoked Function Expression)
const GameLoader = (function () {
  const container = document.querySelector('.game-container');
  let gameCount = 0;

  // Real game
  const games = [
    {
      title: "Quiz Rápido",
      description: "Teste seus conhecimentos!",
      link: "https://quiz-rapido-fe.netlify.app/",
      image: "../imgs_games/jogo_perguntas.png"

    },
    {
      title: "Ping Pong",
      description: "Classic ping pong game!",
      link: "https://pong-game-fe.netlify.app/",
      image: "../imgs_games/ping_pong.png"
    },
    
    {
      title: "Memory Game",
      description: "Match all the cards!",
      link: "https://memory-game-fe.netlify.app/",
      image: "../imgs_games/memory_game.png"
    },
    
    {
      title: "Sneak Game",
      description: "Move the snake, eat the food, and don’t hit the walls!",
      link: "https://snake-game-fe.netlify.app/",
      image: "../imgs_games/sneak_game.png"
    },
    {
      title: "Rock Paper Scissors",
      description: "Play Rock, Paper, Scissors against the computer!",
      link: "https://rock-paper-scissors-game-fe.netlify.app/",
      image: "../imgs_games/rock_paper_scissors.png"
    },
    // Add More games here
  ];

  // Max number of games is now based on your list
  const MAX_GAMES = games.length;

  // Create a game card element
  function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
    <div class="card-image-wrapper">
      <img src="${game.image}" alt="${game.title}" class="game-image">
      </div>
      <h3>${game.title}</h3>
      <p>${game.description}</p>
      <a href="${game.link}" class="button" target="_blank">Play</a>
    `;
    return card;
  }

  // Load a specified number of game cards
  function loadGames(quantity = 5) {
    const gamesToLoad = Math.min(quantity, MAX_GAMES - gameCount);
    for (let i = 0; i < gamesToLoad; i++) {
      container.appendChild(createGameCard(games[gameCount]));
      gameCount++;
    }
  }

  // Check if the user is near the bottom of the page
  function isBottomOfPage() {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
  }

  // Initialize the scroll listener
  function init() {
    window.addEventListener('scroll', () => {
      if (isBottomOfPage()) {
        loadGames(5);
      }
    });

    loadGames(5); // Load first few
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
