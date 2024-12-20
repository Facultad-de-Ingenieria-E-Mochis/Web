const menuBurguer = document.querySelector('.menu-burguer');
const menuContainer = document.querySelector('.menu-container');
const overlay = document.querySelector('.overlay');
const body = document.body; // Referencia al body para modificar el scroll
const btnclose = document.querySelector('.closebtn i');


document.addEventListener("DOMContentLoaded", () => {
  const contactLink = document.getElementById("contact-link");
  const modal = document.getElementById("contact-modal");
  const closeModal = document.querySelector(".close-btn");

  contactLink.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("modal-hide"); // Aseguramos que no tenga la clase de ocultar
    modal.classList.add("modal-show"); // Añadimos la clase de mostrar
  });

  closeModal.addEventListener("click", () => {
    modal.classList.remove("modal-show"); // Quitamos la clase de mostrar
    modal.classList.add("modal-hide"); // Añadimos la clase de ocultar
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("modal-show"); // Quitamos la clase de mostrar
      modal.classList.add("modal-hide"); // Añadimos la clase de ocultar
    }
  });
});



var chatbox = document.getElementById('fb-customer-chat');
chatbox.setAttribute('page_id', '502961932904858'); // Reemplaza con el ID de tu página de Facebook
chatbox.setAttribute('attribution', 'biz_inbox'); // Atribución para el buzón de negocios

// Inicialización del SDK de Facebook
window.fbAsyncInit = function () {
  FB.init({
    xfbml: true,
    version: 'v17.0', // Usa la versión más reciente de la API
  });
};

// Cargar el SDK de Facebook de forma asíncrona
(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://connect.facebook.net/es_ES/sdk/xfbml.customerchat.js';
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

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

const accessToken =
  'EAAPzNOrPXUEBO9xJiKo4KZC2yACJeqIZB3T5K7ik305wMPZAFIUYtDdxPIBafEbnwWIyLb9iryfCLMXwcqCgWRPSnLRk8fWcZBv1S8YwPfBxHJSZC320gTe22ZCeAZBiRP2JLLTJT4xhT29UZCZCEYZB2UZAfu59KIFdODX7ZARZB3PkoFpDZBGpFsJFGdDz6MrbHtV0M0';

// Realizamos la solicitud a la API de Facebook

// Realizamos la solicitud a la API de Facebook
fetch(
  `https://graph.facebook.com/v15.0/502961932904858/posts?fields=message,created_time,full_picture&access_token=${accessToken}`
)
  .then((response) => response.json())
  .then((data) => {
    const postsContainer = document.getElementById('posts-container');

    // Recorremos las publicaciones y las mostramos
    data.data.forEach((post) => {
      // Verificamos si la publicación tiene un mensaje o una imagen
      if (
        (post.message && post.message.trim() !== '') ||
        (post.full_picture && post.message.trim() !== '')
      ) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        // Crear y agregar el mensaje si existe
        if (post.message && post.message.trim() !== '') {
          const message = document.createElement('div');
          message.classList.add('message');
          message.textContent = post.message;
          postElement.appendChild(message);
        }

        // Crear y agregar la imagen si existe
        if (post.full_picture) {
          const image = document.createElement('img');
          image.src = post.full_picture;
          image.alt = 'Imagen de la publicación';
          image.style.maxWidth = '100%'; // Ajusta el tamaño de la imagen para que no desborde
          image.style.borderRadius = '8px'; // Opcional: agrega bordes redondeados
          postElement.appendChild(image);
        }

        // Crear y agregar la fecha de creación
        const createdTime = document.createElement('div');
        createdTime.classList.add('created_time');
        createdTime.textContent = `Publicado el: ${new Date(
          post.created_time
        ).toLocaleString()}`;
        postElement.appendChild(createdTime);

        postsContainer.appendChild(postElement);
      }
    });
  })
  .catch((error) =>
    console.error('Error al obtener las publicaciones:', error)
  );
