let envioFin = true
let precioEnvio = 0;
const envios = (km) => {
        if (km === 1) {
                return (precioEnvio = 200, envioFin = false)
        }
        else if (km === 2) {
                return (precioEnvio = 300, envioFin = false)
        }
        else if (km === 3) {
                return (precioEnvio = 500, envioFin = false)
        } else if (km === 4) {
                return (precioEnvio = 600, envioFin = false)
        }
        else {
                return alert('Error: seleccione del 1 al 4')
        }
}

class cliente {
        constructor(nombre, apellido, off) {
                this.nombre = prompt('Ingrese Su Nombre:');
                this.apellido = prompt('Ingrese su Apellido:');
                this.off = prompt('Ingrese SI o NO, Ud es cliente regular?, Tiene un 10% OFF, no aplicable en el ENVIO');
        }
}
class Articulo {
        constructor(articulo, precio) {
                this.articulo = prompt('Ingrese Nombre de articulo:');
                this.precio = parseInt(prompt('Ingrese su precio:'));
        }
}
const arrayCliente = [];
const arrayArticulo = [];
function saludar() {
        let clienteIngresado = new cliente();
        arrayCliente.push(clienteIngresado)
        for (saludo of arrayCliente) {
        }
        return (alert(`Bienvenido! ${saludo.nombre} ${saludo.apellido}, por favor elegi tus productos a continuacion.`), comprar(), console.log(`Muchas Gracias por tu Compra! ${saludo.nombre} ${saludo.apellido}`))
}

let compra = true
const comprar = () => {
        while (compra) {
                let articuloIngresado = new Articulo();
                arrayArticulo.push(articuloIngresado);
                let finalizarCompra = parseInt(prompt('Ingrese 1 para Seguir Comprando, 2 para Finalizar y elegir Costo de Envio.'))
                if (finalizarCompra === 2) {
                        compra = false;
                }
        } return costoEnvio()
}
const costoEnvio = () => {
        while (envioFin) {
                let km = envios(parseInt(prompt('Elija la siguiente distancia: 1) 1 a 10km, 2) 11km a 22km, 3) 23km a 50km, 4) +50km')))
                console.log(`El costo de envio es de: $${precioEnvio}`)
        } return mostrarProductos(precioEnvio)
}

function mostrarProductos(envio) {
        let total = 0;
        let descuento = 0;
        for (articulo of arrayArticulo) {
                total = total + articulo.precio;
                console.log(`Ud a seleccionado los siguientes productos: ${articulo.articulo} $ ${articulo.precio}`);
        }
        for (discount of arrayCliente) {
                if (discount.off === 'si' || 'Si' || 'SI' || 'sI') {
                        descuento = total * 0.10;
                        
                } else {
                        descuento = 0;
                        
                }
        }
        return (alert(`El Total de su Compra es de: $${total + envio - descuento} con Envio Incluido`), console.log(`El total de su Compra es de: $${total+envio-descuento}`));

}
saludar()