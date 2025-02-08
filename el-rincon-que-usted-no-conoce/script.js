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
        nombre: "Gafas para niños",
        imagen: "images/gf.jpg",
        precio: "$800.00"
    },
    {
        nombre: "Gafas para niños-2",
        imagen: "images/gO.jpg",
        precio: "$1200.00"
    },

];
// Variables para el contador
let cantidad = 1;
let productoSeleccionado = null;

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
        tarjetaProducto.addEventListener('click', () => mostrarModal(producto));
        contenedorProductos.appendChild(tarjetaProducto);
    });
}

// Mostrar el modal con el producto
function mostrarModal(producto) {
    const modal = document.getElementById('modal-producto');
    const modalImagen = document.getElementById('modal-imagen');
    const modalNombre = document.getElementById('modal-nombre');
    const modalPrecio = document.getElementById('modal-precio');

    modalImagen.src = producto.imagen;
    modalNombre.textContent = producto.nombre;
    modalPrecio.textContent = producto.precio;

    // Reiniciar el contador
    cantidad = 1;
    document.getElementById('cantidad').textContent = cantidad;

    // Guardar el producto seleccionado
    productoSeleccionado = producto;

    modal.style.display = 'flex';
}

// Manejar el contador
document.getElementById('btn-sumar').addEventListener('click', () => {
    cantidad++;
    document.getElementById('cantidad').textContent = cantidad;
});

document.getElementById('btn-restar').addEventListener('click', () => {
    if (cantidad > 1) {
        cantidad--;
        document.getElementById('cantidad').textContent = cantidad;
    }
});

// Añadir al carrito
document.getElementById('btn-agregar-carrito').addEventListener('click', () => {
    if (productoSeleccionado) {
        productoSeleccionado.cantidad = cantidad; // Agregar la cantidad al producto
        agregarAlCarrito(productoSeleccionado);
        const modal = document.getElementById('modal-producto');
        modal.style.display = 'none';
    }
});

// Cerrar el modal
document.querySelector('.cerrar-modal').addEventListener('click', () => {
    const modal = document.getElementById('modal-producto');
    modal.style.display = 'none';
});

// Carrito de compras
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(producto) {
    // Verificar si el producto ya está en el carrito
    const productoEnCarrito = carrito.find(p => p.nombre === producto.nombre);

    if (productoEnCarrito) {
        // Si ya está, aumentar la cantidad
        productoEnCarrito.cantidad += producto.cantidad;
    } else {
        // Si no está, agregarlo al carrito
        carrito.push(producto);
    }

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
            ${producto.nombre} - ${producto.precio} x ${producto.cantidad}
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        listaCarrito.appendChild(li);
        total += parseFloat(producto.precio.replace('$', '')) * producto.cantidad;
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
