// Array de productos estáticos 
const productos = [
    {
        nombre: "Camiseta Negra",
        imagen: "https://imgs.search.brave.com/kifQ34lUOuAagG3fPh-rv4vnDT2y1s4c_YMdcPL9bwY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWNs/aWVyLmNvbS9jZG4v/c2hvcC9maWxlcy8x/OV83MGU4YzQ3Mi1k/MzYwLTRhMTItYmM3/Ni0wOTRmZTM3MTI0/NWMuanBnP3Y9MTY4/NzU0NDg0NSZ3aWR0/aD0xNDQ1",
        precio: "$15.00"
    },
    {
        nombre: "Jeans Clásicos",
        imagen: "https://imgs.search.brave.com/uQSWmkySV9pac7r680skfowl_36jYvhmkQnfOG-EzOs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9kY2Ru/Lm1pdGllbmRhbnVi/ZS5jb20vc3RvcmVz/Lzg2OC8wMjQvcHJv/ZHVjdHMvaW1nLTIw/MjEwNTE4LXdhMDAz/NjEtYzEwODU1MmE4/ZjZlYjZlM2MzMTcw/MTc4ODgxMDI5NDct/MjQwLTAuanBn",
        precio: "$30.00"
    },
    {
        nombre: "Vestido Floral",
        imagen: "https://imgs.search.brave.com/Q6r3YqJr_VQBe1dP23jHZH0MqJOK949-_hxHhbqS8m4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5obS5jb20vYXNz/ZXRzL2htLzc5LzZi/Lzc5NmI4YjBmYzlh/Mjk1YTI4OTA0NjJh/NGFjNDYxNGZiOWVj/YTkxZDkuanBnP2lt/d2lkdGg9MTUzNg",
        precio: "$25.00"
    },
    {
        nombre: "Chaqueta de Cuero",
        imagen: "https://imgs.search.brave.com/YrHr_EDItYVqKRxMXQrnSgttOyRKfLjsitd1sEpbcE0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9sYWNo/YXF1ZXRlcmlhLmNv/bS9jZG4vc2hvcC9m/aWxlcy9MQ0hMMDFC/TEFDSzMuanBnP3Y9/MTcxMzI5NDcxOSZ3/aWR0aD01MzM",
        precio: "$50.00"
    }
];

// Función para cargar los productos en la página
function cargarProductos() {
    const contenedorProductos = document.querySelector('.productos');

    contenedorProductos.innerHTML = ''; // Limpiar el contenedor

    productos.forEach((producto) => {
        const tarjetaProducto = document.createElement('div');
        tarjetaProducto.classList.add('producto');
        tarjetaProducto.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p class="precio">${producto.precio}</p>
        `;
        tarjetaProducto.addEventListener('click', () => agregarAlCarrito(producto));
        contenedorProductos.appendChild(tarjetaProducto);
    });
}

// Carrito de compras
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(producto) {
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');

    listaCarrito.innerHTML = ''; // Limpiar la lista
    let total = 0;

    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${producto.nombre} - ${producto.precio}
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        listaCarrito.appendChild(li);
        total += parseFloat(producto.precio.replace('$', ''));
    });

    totalCarrito.textContent = `$${total.toFixed(2)}`;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

document.getElementById('vaciar-carrito').addEventListener('click', () => {
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
});

// Mostrar/ocultar el carrito
document.getElementById('btn-carrito').addEventListener('click', () => {
    const carrito = document.getElementById('carrito');
    carrito.classList.toggle('visible');
});

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    actualizarCarrito();
});
