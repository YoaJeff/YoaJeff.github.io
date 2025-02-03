document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita que el formulario se envíe

    // Simula el envío del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    // Muestra un mensaje de confirmación
    document.getElementById('mensajeConfirmacion').textContent = `Gracias, ${nombre}. Tu mensaje ha sido enviado.`;

    // Limpia el formulario
    document.getElementById('contactForm').reset();
});