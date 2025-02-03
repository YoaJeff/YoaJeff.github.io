document.getElementById('solicitudForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Captura de datos del formulario
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
    const horarioInicio = document.getElementById('horarioInicio').value;
    const horarioFin = document.getElementById('horarioFin').value;
    const pago = document.getElementById('pago').value;
    const descripcion = document.getElementById('descripcion').value;

    // Validación básica de fechas
    if (fechaInicio > fechaFin) {
        alert('La fecha de inicio no puede ser posterior a la fecha de finalización.');
        return;
    }

    // Mostrar datos en la consola
    console.log('Fecha de Inicio:', fechaInicio);
    console.log('Fecha de Finalización:', fechaFin);
    console.log('Horario:', horarioInicio + ' - ' + horarioFin);
    console.log('Pago:', pago);
    console.log('Descripción:', descripcion);

    // Mensaje de confirmación
    alert('Solicitud enviada con éxito');
});
