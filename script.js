// Função para deslocamento suave até o destino ao clicar nos links
function smoothScroll(event) {
  event.preventDefault();
  const targetElement = this.getAttribute('href').substr(1);
  const target = document.getElementById(targetElement);
  const contentOffset = 50; 

  if (target) {
    const targetOffset = target.offsetTop - contentOffset;
    window.scrollTo({
      top: targetOffset,
      behavior: "smooth"
    })
  }
}

// Adicionar o evento de clique aos links da barra de rolagem
const navLinks = document.querySelectorAll('.navList a');
for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener('click', scrollToTarget);
}

// Eventos para abri e fechar minha navList
// Desing Pattern
const menuModule = (function() {
  // Variáveis privadas
  let menuIcon = document.getElementById('hamburger');
  let sideBar = document.getElementById('sidebar');
  let closeButton = document.getElementById('closeButton');
  let navList = document.querySelector('#sidebar a');

  // Função para alternar a sidebar e esconder/mostrar o hamburger
  function toggleSidebar() {
    sideBar.classList.toggle('show');
    menuIcon.classList.toggle('hidden') // Esconde o hamburger quando o sidebar abre
  }
  
  function closeSidebar() {
    sideBar.classList.remove('show')
    menuIcon.classList.remove('hidden') // Mostra o hamburger quando o sidebar fecha
  }

  // Função para fechar o sidebar quando um link for clicado
  function closeNavList() {
    closeSidebar();
  }

  // Função para fechar o sidebar ao clicar fora dele
  function closeSidebarOutside(event) {
    if (!sideBar.contains(event.target) && !menuIcon.contains(event.target)) {
      closeSidebar();
    }
  }

  // Expondo a interface pública (métodos)
  return {
    init: function() {
      menuIcon.addEventListener('click', toggleSidebar);
      closeButton.addEventListener('click', closeSidebar);
      window.addEventListener('click', closeSidebarOutside);

      // Adiciona evento aos links dentro do sidebar
      navLinks.forEach((link) => {
        link.addEventListener('click', closeNavList);
      });
    },
  };
})();

// Inicializando o módulo
menuModule.init();
