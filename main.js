// Inicializamos las variables

let email = " ";
let confirmEmail = " ";
let nombre = " ";
let apellido = " ";
let producto = " ";
let cantidad = 0;
let cantidadTotal = 0;
let precio = 0;
let precioTotal = 0;
let seguirComprando = true;

alert("¡Bienvenido a Flor de cerezo! necesitaremos unos datos antes de continuar:");


email = prompt("Ingreso su Email: ");
confirmEmail = prompt("confirme su Email: ");
    if (email == confirmEmail) {
        alert("El Email ingresado es"+" "+email);
    }else{
        alert("Los Email no coinciden")
        email = prompt("Ingreso su Email: ");
        confirmEmail = prompt("confirme su Email: ");
    }
nombre = prompt("Ingrese su nombre: ");
apellido = prompt("Ingrese su apellido: ");
    alert("Gracias por registrase en nuestra página"+ " "+nombre+" "+apellido);

do {
    producto = prompt("Que producto desea comprar?\n vestidos\n pantalones\n zapatos\n carteras").toLowerCase();
    cantidad = parseInt(prompt("Cuantos desea llevar?"));

while (cantidad <= 0){
    alert("Cantidad inválidad");
    cantidad = parseInt(prompt("Cuantos desea llevar?"));
};
switch(producto){
    case "vestidos":
        precio = 20000;
        break;
    case "pantalones":
        precio = 40000;
        break;
    case "zapatos":
        precio = 60000;
        break;
    case "carteras":
        precio = 20000;
        break;
    default:
        alert("Producto fuera de catálogo")
};
precioTotal += precio * cantidad;
cantidadTotal += cantidad;

seguirComprando = confirm("Desea seguir comprando?");
}while (seguirComprando);

alert("La cantidad de productos es: "+cantidadTotal+" y el precio total es: "+precioTotal);
alert("Gracias por comprar en Flor de cerezo");

