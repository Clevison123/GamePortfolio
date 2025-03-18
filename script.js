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
