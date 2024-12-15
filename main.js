
// Inicializamos las variables
let email = " ";
let confirmEmail = " ";
let nombre = " ";
let apellido = " ";
let cantidadTotal = 0;
let precioTotal = 0;
let seguirComprando = true;

// Array de productos disponibles
const productosDisponibles = [
    { nombre: "vestidos", precio: 20000 },
    { nombre: "pantalones", precio: 40000 },
    { nombre: "zapatos", precio: 60000 },
    { nombre: "carteras", precio: 20000 }
];

// Clase constructora Producto
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }

    calcularPrecio(cantidad) {
        return this.precio * cantidad;
    }
}

alert("¡Bienvenido a Flor de cerezo! Necesitaremos unos datos antes de continuar:");

email = prompt("Ingrese su Email: ");
confirmEmail = prompt("Confirme su Email: ");
if (email === confirmEmail) {
    alert("El Email ingresado es: " + email);
} else {
    alert("Los Emails no coinciden. Intente de nuevo.");
    email = prompt("Ingrese su Email: ");
    confirmEmail = prompt("Confirme su Email: ");
}

nombre = prompt("Ingrese su nombre: ");
apellido = prompt("Ingrese su apellido: ");
alert("Gracias por registrarse en nuestra página, " + nombre + " " + apellido);

// Función para calcular el precio total, usando una función de orden superior
function calcularPrecioTotal(productos, fn) {
    return productos.reduce(fn, 0);  
}

do {
    let productoElegido = prompt("Elija un producto: vestidos, pantalones, zapatos, carteras").toLowerCase();
    let cantidad = parseInt(prompt("¿Cuántos productos desea comprar?"));


    const producto = productosDisponibles.find(p => p.nombre === productoElegido);
    
    if (producto) {
        const nuevoProducto = new Producto(producto.nombre, producto.precio);
        let totalProducto = nuevoProducto.calcularPrecio(cantidad);


        precioTotal += totalProducto;
        cantidadTotal += cantidad;
    } else {
        alert("Producto no encontrado o fuera de catálogo.");
    }

    seguirComprando = confirm("¿Desea seguir comprando?");
} while (seguirComprando);

// Si el cliente comprá más de 30mil en productos, ofrece al cliente envío gratis
const productosCaros = productosDisponibles.filter(p => p.precio > 30000);

alert("Productos con precio superior a 30.000, ¡¡tienes envío gratis!! ");

//Mensaje final de compra
alert("La cantidad de productos es: " + cantidadTotal + " y el precio total es: " + precioTotal);
alert("Gracias por comprar en Flor de cerezo");


