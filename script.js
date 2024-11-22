const carruselWrapper = document.querySelector('.carrusel-wrapper');
const items = document.querySelectorAll('.carrusel-item');
const indicators = document.querySelectorAll('.indicators i');
const totalItems = items.length;

let currentIndex = 0;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;
let autoSlideTimer;

// Verificar si la pantalla es menor a 768px
function isMobile() {
    return window.innerWidth < 768;
}

// Función para mover el carrusel
function setPosition() {
    carruselWrapper.style.transform = `translateX(${-currentIndex * 100}%)`; // Desplaza el carrusel
}

// Función para actualizar indicadores
function updateIndicators() {
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('fa-solid', index === currentIndex); // Activar icono relleno
        indicator.classList.toggle('fa-regular', index !== currentIndex); // Icono no relleno
        indicator.classList.toggle('active', index === currentIndex); // Activar clase activa
    });
}

// Función para manejar el final del arrastre
function endDrag() {
    if (!isMobile()) return; // No ejecutar en pantallas grandes
    isDragging = false;
    const moveThreshold = 50; // Desplazamiento necesario para cambiar de slide
    const movedBy = currentTranslate - prevTranslate;

    // Determina si mover hacia adelante o atrás
    if (movedBy < -moveThreshold) {
        currentIndex = (currentIndex + 1) % totalItems; // Circular al avanzar
    } else if (movedBy > moveThreshold) {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems; // Circular al retroceder
    }

    // Ajustar posición y actualizar estado
    setPosition();
    updateIndicators();
    prevTranslate = -currentIndex * window.innerWidth;
}

// Manejo del arrastre
function dragMove(e) {
    if (isDragging && isMobile()) { // Solo habilitar en pantallas pequeñas
        const currentX = e.type === 'touchmove' ? e.touches[0].pageX : e.pageX;
        const movedBy = currentX - startX;
        currentTranslate = prevTranslate + movedBy;
        carruselWrapper.style.transform = `translateX(${currentTranslate}px)`; // Posición en tiempo real
    }
}

// Iniciar arrastre
carruselWrapper.addEventListener('mousedown', (e) => {
    if (!isMobile()) return; // No ejecutar en pantallas grandes
    isDragging = true;
    startX = e.pageX;
    carruselWrapper.style.cursor = 'grabbing';
    resetAutoSlideTimer(); // Reiniciar el contador de auto-slide al interactuar
});
carruselWrapper.addEventListener('touchstart', (e) => {
    if (!isMobile()) return; // No ejecutar en pantallas grandes
    isDragging = true;
    startX = e.touches[0].pageX;
    resetAutoSlideTimer(); // Reiniciar el contador de auto-slide al interactuar
});

// Finalizar arrastre
carruselWrapper.addEventListener('mouseup', endDrag);
carruselWrapper.addEventListener('touchend', endDrag);
carruselWrapper.addEventListener('mouseleave', () => {
    if (!isMobile()) return; // No ejecutar en pantallas grandes
    isDragging = false;
    setPosition();
});
carruselWrapper.addEventListener('mousemove', dragMove);
carruselWrapper.addEventListener('touchmove', dragMove);

// Función para iniciar el auto-deslizado cada 20 segundos
function startAutoSlide() {
    if (!isMobile()) return; // Solo funciona en pantallas pequeñas
    autoSlideTimer = setInterval(() => {
        if (!isDragging) {
            currentIndex = (currentIndex + 1) % totalItems; // Avanzar al siguiente slide
            setPosition();
            updateIndicators();
        }
    }, 5000); // 5000 milisegundos = 5 segundos
}

// Función para reiniciar el contador del auto-deslizado
function resetAutoSlideTimer() {
    clearInterval(autoSlideTimer); // Detener el temporizador actual
    startAutoSlide(); // Volver a iniciar el temporizador
}

// Iniciar el temporizador de auto-slide al cargar la página
if (isMobile()) {
    startAutoSlide();
}
