// Array de productos estáticos
const productos = [
    {
        nombre: "Pellizcos de flor para el pelo",
        imagen: "https://i.pinimg.com/736x/bd/ef/f8/bdeff8fdb093c44a3dd1e114a2aa19af.jpg",
        precio: "$400.00"
    },
    {
        nombre: "Monederos modelo 1",
        imagen: "images/monedero.jpg",
        precio: "$2500.00"
    },
    {
        nombre: "Monederos modelo 2",
        imagen: "images/monederos 2.jpg",
        precio: "$2500.00"
    },
    {
        nombre: "Perfumes modelo 1",
        imagen: "images/perfumes largos.jpg",
        precio: "$800.00"
    },
    {
        nombre: "Perfumes modelo 2",
        imagen: "images/perfumes.jpg",
        precio: "$1800.00"
    },
    {
        nombre: "Lip gloss",
        imagen: "images/lip-gloss.jpg",
        precio: "$400.00"
    },
    {
        nombre: "Eyeliner",
        imagen: "images/eye liner.jpg",
        precio: "$400.00"
    },
    {
        nombre: "Toallitas sanitarias (intimas)",
        imagen: "images/ts .jpg",
        precio: "$400.00"
    },
    {
        nombre: "Gafas para niñas",
        imagen: "images/gf.jpg",
        precio: "$800.00"
    },
    {
        nombre: "Gafas para niñas-2",
        imagen: "images/gO.jpg",
        precio: "$1200.00"
    },

];
// Carrito de compras
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para cargar los productos en la página
function cargarProductos() {
    const contenedorProductos = document.querySelector('.productos');

    contenedorProductos.innerHTML = ''; // Limpiar el contenedor

    productos.forEach((producto, index) => {
        const tarjetaProducto = document.createElement('div');
        tarjetaProducto.classList.add('producto');
        tarjetaProducto.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p class="precio">${producto.precio}</p>
            <div class="contador-producto">
                <button onclick="restarCantidad(${index})">-</button>
                <span id="cantidad-${index}">0</span>
                <button onclick="sumarCantidad(${index})">+</button>
            </div>
            <div class="cantidad-carrito" id="cantidad-carrito-${index}" style="display: none;">0</div>
        `;
        contenedorProductos.appendChild(tarjetaProducto);
    });

    actualizarContadores();
}

// Sumar cantidad de un producto
function sumarCantidad(index) {
    const producto = productos[index];
    const productoEnCarrito = carrito.find(p => p.nombre === producto.nombre);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadores();
    actualizarCarrito();
}

// Restar cantidad de un producto
function restarCantidad(index) {
    const producto = productos[index];
    const productoEnCarrito = carrito.find(p => p.nombre === producto.nombre);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad--;
        if (productoEnCarrito.cantidad === 0) {
            carrito = carrito.filter(p => p.nombre !== producto.nombre);
        }
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadores();
    actualizarCarrito();
}

// Actualizar los contadores de cantidad en los productos
function actualizarContadores() {
    productos.forEach((producto, index) => {
        const productoEnCarrito = carrito.find(p => p.nombre === producto.nombre);
        const cantidadElement = document.getElementById(`cantidad-${index}`);
        const cantidadCarritoElement = document.getElementById(`cantidad-carrito-${index}`);

        if (productoEnCarrito) {
            cantidadElement.textContent = productoEnCarrito.cantidad;
            cantidadCarritoElement.textContent = productoEnCarrito.cantidad;
            cantidadCarritoElement.style.display = 'flex';
        } else {
            cantidadElement.textContent = 0;
            cantidadCarritoElement.style.display = 'none';
        }
    });
}

// Actualizar el carrito
function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');

    listaCarrito.innerHTML = ''; // Limpiar la lista
    let total = 0;

    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${producto.nombre} - ${producto.precio} x ${producto.cantidad}
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        listaCarrito.appendChild(li);
        total += parseFloat(producto.precio.replace('$', '')) * producto.cantidad;
    });

    totalCarrito.textContent = `$${total.toFixed(2)}`;
}

// Eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadores();
    actualizarCarrito();
}

// Vaciar el carrito
document.getElementById('vaciar-carrito').addEventListener('click', () => {
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadores();
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
