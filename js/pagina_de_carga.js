document.addEventListener("DOMContentLoaded", function () {
    const loaderWrapper = document.querySelector(".loader-wrapper");
    const content = document.querySelector(".content");

    setTimeout(function () {
        loaderWrapper.style.display = "none"; // Oculta la página de carga
        content.style.display = "block"; // Muestra el contenido principal
    }, 2000); // 3000 milisegundos = 2 segundos
})
