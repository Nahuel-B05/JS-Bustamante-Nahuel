// let envioFin = true
// let precioEnvio = 0;
// const envios = (km) => {
//         if (km === 1) {
//                 return (precioEnvio = 200, envioFin = false)
//         }
//         else if (km === 2) {
//                 return (precioEnvio = 300, envioFin = false)
//         }
//         else if (km === 3) {
//                 return (precioEnvio = 500, envioFin = false)
//         } else if (km === 4) {
//                 return (precioEnvio = 600, envioFin = false)
//         }
//         else {
//                 return alert('Error: seleccione del 1 al 4')
//         }
// }

// class cliente {
//         constructor(nombre, apellido, off) {
//                 this.nombre = prompt('Ingrese Su Nombre:');
//                 this.apellido = prompt('Ingrese su Apellido:');
//                 this.off = prompt('Ingrese SI o NO, Ud es cliente regular?, Tiene un 10% OFF, no aplicable en el ENVIO');
//         }
// }
// class Articulo {
//         constructor(articulo, precio) {
//                 this.articulo = prompt('Ingrese Nombre de articulo:');
//                 this.precio = parseInt(prompt('Ingrese su precio:'));
//         }
// }
// const arrayCliente = [];
// const arrayArticulo = [];
// function saludar() {
//         let clienteIngresado = new cliente();
//         arrayCliente.push(clienteIngresado)
//         return (alert(`Bienvenido! ${saludo.nombre} ${saludo.apellido}, por favor elegi tus productos a continuacion.`), comprar(), console.log(`Muchas Gracias por tu Compra! ${saludo.nombre} ${saludo.apellido}`))
// }

// let compra = true
// const comprar = () => {
//         while (compra) {
//                 let articuloIngresado = new Articulo();
//                 arrayArticulo.push(articuloIngresado);
//                 let finalizarCompra = parseInt(prompt('Ingrese 1 para Seguir Comprando, 2 para Finalizar y elegir Costo de Envio.'))
//                 if (finalizarCompra === 2) {
//                         compra = false;
//                 }
//         } return costoEnvio()
// }
// const costoEnvio = () => {
//         while (envioFin) {
//                 let km = envios(parseInt(prompt('Elija la siguiente distancia: 1) 1 a 10km, 2) 11km a 22km, 3) 23km a 50km, 4) +50km')))
//                 console.log(`El costo de envio es de: $${precioEnvio}`)
//         } return mostrarProductos(precioEnvio)
// }

// function mostrarProductos(envio) {
//         let total = 0;
//         let descuento = 0;
//         for (articulo of arrayArticulo) {
//                 total = total + articulo.precio;
//                 console.log(`Ud a seleccionado los siguientes productos: ${articulo.articulo} $ ${articulo.precio}`);
//         }
//         for (discount of arrayCliente) {
//                 if (discount.off === 'si' || 'Si' || 'SI' || 'sI') {
//                         descuento = total * 0.10;

//                 } else {
//                         descuento = 0;

//                 }
//         }
//         return (alert(`El Total de su Compra es de: $${total + envio - descuento} con Envio Incluido`), console.log(`El total de su Compra es de: $${total+envio-descuento}`));

// }
// // saludar()

const productos = [
        { id: 1, nombre: 'Boku No Hero A.', precio: 1000, vol: 33, img: 'https://infoliteraria.com/wp-content/uploads/2022/01/myhero_academia.jpg.webp' },
        { id: 2, nombre: 'One Piece', precio: 1000, vol: 100, img: 'https://images.squarespace-cdn.com/content/v1/571abd61e3214001fb3b9966/1b0f0c7b-7b0c-412a-8de3-f131c1e07f94/One+Piece+100.jpg' },
        { id: 3, nombre: 'Naruto', precio: 1000, vol: 71, img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61VMDNFOUAL._AC_UF1000,1000_QL80_.jpg' },
        { id: 4, nombre: 'Tokyo Ghoul', precio: 1000, vol:11, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUu4qepXj53PcYVQQNHw2jcqxx6C6J4g7y5b-6atjrkNE_0F7eIJr8IIZnX3jrBZrlUOY&usqp=CAU' },
        { id: 5, nombre: 'Slam Dunk', precio: 1000, vol:24, img:'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71vc7vW+pJL.jpg' },
        { id: 6, nombre: 'Dragon Ball S.', precio: 1000, vol:15, img:'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/690909.jpg' },
        { id: 7, nombre: 'Demon Slayer', precio: 1000, vol:10, img:'https://dwgkfo5b3odmw.cloudfront.net/manga/social/share-19646-DemonSlayer_GN10_Web_jpg' },
        { id: 8, nombre: 'shingeky no k.', precio: 1000, vol:32 , img:'https://www.tierragamer.com/wp-content/uploads/2020/11/SNK-a-color.png'},
        { id: 9, nombre: 'berserk', precio:1000, vol:6, img:'http://d3ugyf2ht6aenh.cloudfront.net/stores/001/749/463/products/82018bcc-4cbe-0efc-37d8-19042ec4a1201-92935c79c850c9593d16513381450979-640-0.jpg' },
        { id: 10, nombre: 'h x H', precio:1000, vol:7, img:'https://i.pinimg.com/originals/d6/57/d9/d657d9f8cc0240a952f2a3982075ea84.jpg' }
]
carrito = [];

function crearProductos() {
        for (const producto of productos) {
                let {id, nombre , precio , vol ,img} = producto
                let cardManga = document.createElement('div');
                cardManga.innerHTML = `
                <img src="${img}"alt="Manga">
                <h2>${nombre}</h2>
                <h3>$ ${precio}</h3>
                <a href:"#" id=${id}>Add To Cart</a>
                <div class="numero-manga">
                <h3>#${vol}</h3>
                </div>
                `
                let contenedor = document.getElementById('productos')
                cardManga.className='cardManga'
                contenedor.append(cardManga)
                botonClick(id,carritoAdd)
        }
}

function botonClick (id,funcion){
        let botonAdd = document.getElementById(id)
        botonAdd.addEventListener('click', funcion)
        
}
function carritoAdd(e){
        let botonId = Number(e.target.getAttribute('id'))
        let addProducto = productos.find((el)=>el.id === botonId)
        let {nombre,vol,precio, img} = addProducto
        
        
        
        
        pushear (addProducto,nombre,vol,precio,img)
}
function pushear (array,nombre,vol,precio,img){
        carrito.push(array)
        render(nombre,vol,precio,img)

}
function render(nombre,vol,precio,img){
        let cardCarrito = document.createElement('div')
        cardCarrito.innerHTML=`  
        <img src="${img}"alt="Manga">
        <h2>${nombre}</h2>
        <h3>Vol: ${vol}</h3>
        <h3>Precio: $ ${precio}</h3>
        <h3>Cantidad: </h3>
        `
        let contenedor = document.getElementById('contenedorCarro')
        cardCarrito.className='cardCarrito'
        contenedor.append(cardCarrito)
}
crearProductos()