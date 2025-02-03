// Array con la información de las páginas web
const paginas = [
    {
        titulo: "EL RINCÓN QUE USTED NO CONOCE",
        imagen: "el-rincon-que-usted-no-conoce/portada.jpg",
        descripcion: "Página web de la tienda física de ropa situada en 'Independencia #115-b / Juan Bruno Zayas y Alemán. Santa Clara",
        enlace: "el-rincon-que-usted-no-conoce/index.html"
    },
    // Agrega más páginas aquí
    /*
    {
        titulo: "Página Web 2",
        imagen: "ruta/a/imagen2.jpg",
        descripcion: "Descripción de la página web 2.",
        enlace: "ruta/a/pagina2.html"
    },
    */
];

// Función para generar el catálogo
function generarCatalogo() {
    const catalogo = document.querySelector('.catalogo');

    paginas.forEach(pagina => {
        const item = document.createElement('div');
        item.classList.add('catalogo-item');
        item.innerHTML = `
            <img src="${pagina.imagen}" alt="${pagina.titulo}">
            <h3>${pagina.titulo}</h3>
            <p>${pagina.descripcion}</p>
        `;
        item.addEventListener('click', () => {
            window.location.href = pagina.enlace;
        });
        catalogo.appendChild(item);
    });
}

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', generarCatalogo);