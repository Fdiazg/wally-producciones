const clickx = document.querySelector('.drop-menu');
const nav = document.querySelector('#main-nav');

clickx.addEventListener('click', function(event) {
  event.stopPropagation();
  clickx.classList.toggle('open-menu');
  nav.classList.toggle('menu-toggle');
  nav.classList.toggle('main-nav__open');
});

//Cerrar el menú cerrando fuera del menú

document.addEventListener('click', () => {

  if (clickx.classList.contains('open-menu')) {
    clickx.classList.toggle('open-menu');
    nav.classList.toggle('menu-toggle');
    nav.classList.toggle('main-nav__open');
  }
});
