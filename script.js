const menuBurguer = document.querySelector('.menu-burguer');
const menuContainer = document.querySelector('.menu-container');
const overlay = document.querySelector('.overlay');
const body = document.body; // Referencia al body para modificar el scroll
const btnclose = document.querySelector('.closebtn i');

menuBurguer.addEventListener('click', () => {
  menuContainer.classList.toggle('active');
  overlay.classList.toggle('active');
  body.classList.toggle('no-scroll'); // Bloquear/desbloquear el scroll
});

overlay.addEventListener('click', () => {
  menuContainer.classList.remove('active');
  overlay.classList.remove('active');
  body.classList.remove('no-scroll'); // Habilitar el scroll nuevamente
});

btnclose.addEventListener('click', () => {
  menuContainer.classList.remove('active');
  overlay.classList.remove('active');
  body.classList.remove('no-scroll'); // Habilitar el scroll nuevamente
});

let currentIndex = 0;
const imagenes = document.querySelectorAll('.imagen');

function cambiarImagen(direccion) {
  currentIndex += direccion;

  if (currentIndex < 0) {
    currentIndex = imagenes.length - 1;
  } else if (currentIndex >= imagenes.length) {
    currentIndex = 0;
  }

  const carruselContenedor = document.querySelector('.carrusel-contenedor');
  const desplazamiento = -currentIndex * 100;
  carruselContenedor.style.transform = `translateX(${desplazamiento}%)`;
}
