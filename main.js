//Inicializacion de variables
let productos = [
    { nombre: 'vestidos', precio: 20000, cantidad: 1 },
    { nombre: 'pantalones', precio: 40000, cantidad: 1 },
    { nombre: 'zapatos', precio: 60000, cantidad: 1 },
    { nombre: 'carteras', precio: 20000, cantidad: 1 }
];


const tablaCarrito = document.getElementById('tablaCarrito');
const totalCarrito = document.getElementById('total');
const btnProcederPago = document.getElementById('btnProcederPago');
const productosCarrito = document.getElementById('productosCarrito');


function renderizarCarrito() {
    productosCarrito.innerHTML = ''; 
    productos.forEach((producto, index) => {
        const tr = document.createElement('tr');
        tr.dataset.producto = producto.nombre;
        tr.innerHTML = `
            <td>${producto.nombre}</td>
            <td class="precio">${producto.precio}</td>
            <td><input type="number" class="form-control cantidad" value="${producto.cantidad}" min="1" data-index="${index}"></td>
            <td class="total">$${producto.precio * producto.cantidad}</td>
            <td><button class="btn btn-danger btn-sm" data-index="${index}">Eliminar</button></td>
        `;
        productosCarrito.appendChild(tr);
    });
    actualizarTotal();
}


function actualizarTotal() {
    let totalCompra = productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
    totalCarrito.textContent = `$${totalCompra.toFixed(2)}`;
}


function eliminarProducto(index) {
    productos.splice(index, 1); 
    renderizarCarrito();
}


tablaCarrito.addEventListener('input', function(event) {
    if (event.target.classList.contains('cantidad')) {
        const index = event.target.dataset.index;
        const cantidad = parseInt(event.target.value);
        productos[index].cantidad = cantidad;
        renderizarCarrito();
    }
});


tablaCarrito.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-danger')) {
        const index = event.target.dataset.index;
        eliminarProducto(index);
    }
});


btnProcederPago.addEventListener('click', function() {
    actualizarTotal();

    
    Swal.fire({
        title: 'Ingrese su Email',
        input: 'email',
        inputLabel: 'Tu correo electrónico',
        inputPlaceholder: 'email@example.com',
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        showLoaderOnConfirm: true,
        preConfirm: (email) => {
            if (!email) {
                Swal.showValidationMessage('Por favor ingrese un correo electrónico.');
            } else {
                return email;
            }
        },
    }).then((result) => {
        if (result.isConfirmed) {
            let email = result.value;
            
            
            Swal.fire({
                title: 'Confirme su Email',
                input: 'email',
                inputLabel: 'Confirmar correo electrónico',
                inputPlaceholder: 'email@example.com',
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                showLoaderOnConfirm: true,
                preConfirm: (confirmEmail) => {
                    if (email !== confirmEmail) {
                        Swal.showValidationMessage('Los correos electrónicos no coinciden.');
                    } else {
                        return confirmEmail;
                    }
                },
            }).then((confirmResult) => {
                if (confirmResult.isConfirmed) {
                    let confirmEmail = confirmResult.value;

                    
                    Swal.fire({
                        title: 'Ingrese su Nombre y Apellido',
                        html: `
                            <input type="text" id="nombre" class="swal2-input" placeholder="Nombre">
                            <input type="text" id="apellido" class="swal2-input" placeholder="Apellido">
                        `,
                        focusConfirm: false,
                        preConfirm: () => {
                            const nombre = document.getElementById('nombre').value;
                            const apellido = document.getElementById('apellido').value;
                            if (!nombre || !apellido) {
                                Swal.showValidationMessage('Por favor ingrese su nombre y apellido');
                            } else {
                                return { nombre, apellido };
                            }
                        }
                    }).then((nameResult) => {
                        if (nameResult.isConfirmed) {
                            const { nombre, apellido } = nameResult.value;

                            
                            Swal.fire({
                                title: 'Resumen de tu compra',
                                html: `
                                    <p>Email: ${email}</p>
                                    <p>Nombre: ${nombre} ${apellido}</p>
                                    <p>Total de la compra: ${totalCarrito.textContent}</p>
                                `,
                                icon: 'success',
                                confirmButtonText: '¡Gracias por tu compra!',
                            });
                        }
                    });
                }
            });
        }
    });
});


fetch('productos.json')
    .then(response => response.json())
    .then(data => {
        productos = data; 
        renderizarCarrito();
    })
    .catch(error => console.error('Error al cargar los productos:', error));
