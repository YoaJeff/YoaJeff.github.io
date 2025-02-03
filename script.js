document.getElementById('solicitudForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fecha = document.getElementById('fecha').value;
    const horarioInicio = document.getElementById('horarioInicio').value;
    const horarioFin = document.getElementById('horarioFin').value;
    const pago = document.getElementById('pago').value;
    const descripcion = document.getElementById('descripcion').value;

    // Aquí puedes agregar la lógica para enviar los datos a un servidor o realizar otras acciones
    console.log('Fecha:', fecha);
    console.log('Horario:', horarioInicio + ' - ' + horarioFin);
    console.log('Pago:', pago);
    console.log('Descripción:', descripcion);

    alert('Solicitud enviada con éxito');
});
