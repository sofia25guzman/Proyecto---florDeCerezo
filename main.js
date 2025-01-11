
const tablaCarrito = document.getElementById('tablaCarrito');
const totalCarrito = document.getElementById('total');
const btnProcederPago = document.getElementById('btnProcederPago');

function actualizarTotal() {
    let totalCompra = 0;

    const filas = tablaCarrito.getElementsByTagName('tr');

    for (let fila of filas) {
        const cantidadInput = fila.querySelector('.cantidad');
        const precioElemento = fila.querySelector('.precio');
        

        if (!cantidadInput || !precioElemento) {
            continue; 
        }

        const cantidad = parseInt(cantidadInput.value);
        const precio = parseInt(precioElemento.textContent);
        
        if (isNaN(cantidad) || isNaN(precio)) {
            continue; 
        }

        // Calcular el total del producto (cantidad * precio)
        const totalProducto = cantidad * precio;
        
        const totalElemento = fila.querySelector('.total');
        if (totalElemento) {
            totalElemento.textContent = `$${totalProducto}`;
        }

        totalCompra += totalProducto;
    }
    

    totalCarrito.textContent = `$${totalCompra.toFixed(2)}`;
}

function eliminarProducto(event) {
    if (event.target.classList.contains('btn-danger')) {
        const fila = event.target.closest('tr');
        fila.remove();
        actualizarTotal();
    }
}

// Evento de cambio de cantidad
tablaCarrito.addEventListener('input', function(event) {
    if (event.target.classList.contains('cantidad')) {
        actualizarTotal();
    }
});

// Evento para eliminar productos
tablaCarrito.addEventListener('click', eliminarProducto);

// Evento para proceder al pago
btnProcederPago.addEventListener('click', function() {

    actualizarTotal();

    let email = prompt("Ingrese su Email: ");
    if (email === null) return; 

    let confirmEmail = prompt("Confirme su Email: ");
    if (confirmEmail === null) return; 
    
    if (email !== confirmEmail) {
        alert("Los correos electrónicos no coinciden.");
        return;
    }

    let nombre = prompt("Ingrese su nombre: ");
    if (nombre === null) return; 

    let apellido = prompt("Ingrese su apellido: ");
    if (apellido === null) return;
    
    // Mostrar los datos del cliente en el DOM
    const datosCliente = document.createElement('div');
    datosCliente.innerHTML = `
        <h4>Resumen de tu compra</h4>
        <p>Email: ${email}</p>
        <p>Nombre: ${nombre} ${apellido}</p>
        <p>Total de la compra: ${totalCarrito.textContent}</p>
    `;
    document.body.appendChild(datosCliente);

    alert("¡Gracias por tu compra!");
});



