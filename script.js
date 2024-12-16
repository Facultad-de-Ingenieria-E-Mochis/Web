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

const accessToken =
  'EAAPzNOrPXUEBOZCvpg8MfUs1TIpVkqg00TZAht3GGK3RZBYQQGRubXy7RgB9pBvPWDFMqG2LLsVw3KunIZCA16IsYJjjNRCKkaTkrd85mWCIfqZCH3OVQRSxFEMm9MJshKO7KAhQ47P2VD3A0EAjsFWB6vxqXFGmW5UNZBBIHZAz1xAmQoMatQkZAqFmiqAKjDPo';

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
