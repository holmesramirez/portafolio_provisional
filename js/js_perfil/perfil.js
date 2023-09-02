const enlacesNav = document.querySelectorAll('nav a:not(.enlace)');
const secciones = document.querySelectorAll('article');
const sectOculto = document.querySelector('.sect__oculto');
const menuLinks = document.querySelectorAll('.ul .li a');

alert('Selecciona en el menú de navegación la opción que desees');

enlacesNav.forEach(enlace => {
    enlace.addEventListener('click', (event) => {
        event.preventDefault();
        const target = enlace.getAttribute('data-target');
        mostrarSeccion(target);
    });
});

function mostrarSeccion(target) {
    secciones.forEach(seccion => {
        if (seccion.id === target) {
            seccion.classList.remove('oculto');
        } else {
            seccion.classList.add('oculto');
        }
    });
}

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        sectOculto.style.backgroundImage = "none";
        sectOculto.style.background = "linear-gradient(70deg, #fefefe, #ffffff)";
    });
});