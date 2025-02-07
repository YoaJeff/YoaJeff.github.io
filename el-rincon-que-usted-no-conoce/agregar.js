// Clave de acceso
const CLAVE_ACCESO = "LuszDy";

// Verificar la clave de acceso
function verificarClave() {
    const claveIngresada = document.getElementById('clave').value;
    const mensajeError = document.getElementById('mensaje-error');

    if (claveIngresada === CLAVE_ACCESO) {
        // Mostrar el contenido de la página
        document.getElementById('auth-form').style.display = 'none';
        document.getElementById('contenido-pagina').style.display = 'block';
        // Guardar la autenticación en localStorage
        localStorage.setItem('autenticado', 'true');
    } else {
        // Mostrar mensaje de error
        mensajeError.textContent = 'Clave incorrecta. Inténtalo de nuevo.';
    }
}

// Verificar si el usuario ya está autenticado
function verificarAutenticacion() {
    const autenticado = localStorage.getItem('autenticado');

    if (autenticado === 'true') {
        // Mostrar el contenido de la página
        document.getElementById('auth-form').style.display = 'none';
        document.getElementById('contenido-pagina').style.display = 'block';
    } else {
        // Mostrar el formulario de autenticación
        document.getElementById('auth-form').style.display = 'block';
        document.getElementById('contenido-pagina').style.display = 'none';
    }
}

// Cargar producto a editar (si existe)
const productoEditar = JSON.parse(localStorage.getItem('productoEditar'));

if (productoEditar) {
    document.getElementById('id').value = productoEditar.id;
    document.getElementById('nombre').value = productoEditar.nombre;
    document.getElementById('imagen').value = productoEditar.imagen;
    document.getElementById('precio').value = productoEditar.precio;
    document.getElementById('btn-accion').textContent = 'Guardar Cambios';
}

// Función para agregar/editar un producto
document.getElementById('formularioProducto').addEventListener('submit', function(event) {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre').value;
    const imagen = document.getElementById('imagen').value;
    const precio = document.getElementById('precio').value;

    const nuevoProducto = {
        nombre: nombre,
        imagen: imagen,
        precio: precio
    };

    const productos = JSON.parse(localStorage.getItem('productos')) || [];

    if (id) {
        // Editar producto existente
        productos[id] = nuevoProducto;
    } else {
        // Agregar nuevo producto
        productos.push(nuevoProducto);
    }

    localStorage.setItem('productos', JSON.stringify(productos));
    localStorage.removeItem('productoEditar'); // Limpiar el producto a editar
    window.location.href = 'index.html';
});

// Cargar lista de productos existentes
function cargarListaProductos() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const listaProductos = document.getElementById('lista-productos');

    listaProductos.innerHTML = ''; // Limpiar la lista

    productos.forEach((producto, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${producto.nombre} - ${producto.precio}
            <button onclick="editarProducto(${index})">Editar</button>
            <button onclick="eliminarProducto(${index})">Eliminar</button>
        `;
        listaProductos.appendChild(li);
    });
}

// Editar un producto
function editarProducto(index) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const producto = productos[index];
    producto.id = index; // Agregar el índice como ID
    localStorage.setItem('productoEditar', JSON.stringify(producto));
    window.location.href = 'agregar.html';
}

// Eliminar un producto
function eliminarProducto(index) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    productos.splice(index, 1);
    localStorage.setItem('productos', JSON.stringify(productos));
    cargarListaProductos();
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    verificarAutenticacion();
    cargarListaProductos();
});
