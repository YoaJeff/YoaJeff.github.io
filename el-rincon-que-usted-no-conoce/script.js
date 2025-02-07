// Cargar productos desde el localStorage
function cargarProductos() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const contenedorProductos = document.querySelector('.productos');

    contenedorProductos.innerHTML = ''; // Limpiar el contenedor

    productos.forEach((producto, index) => {
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