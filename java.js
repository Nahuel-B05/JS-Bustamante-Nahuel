
const productos = [
        { id: 1, nombre: 'Boku No Hero A.', precio: 1000, vol: 33, img: 'https://infoliteraria.com/wp-content/uploads/2022/01/myhero_academia.jpg.webp' },
        { id: 2, nombre: 'One Piece', precio: 1000, vol: 100, img: 'https://images.squarespace-cdn.com/content/v1/571abd61e3214001fb3b9966/1b0f0c7b-7b0c-412a-8de3-f131c1e07f94/One+Piece+100.jpg' },
        { id: 3, nombre: 'Naruto', precio: 1000, vol: 71, img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61VMDNFOUAL._AC_UF1000,1000_QL80_.jpg' },
        { id: 4, nombre: 'Tokyo Ghoul', precio: 1000, vol: 11, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUu4qepXj53PcYVQQNHw2jcqxx6C6J4g7y5b-6atjrkNE_0F7eIJr8IIZnX3jrBZrlUOY&usqp=CAU' },
        { id: 5, nombre: 'Slam Dunk', precio: 1000, vol: 24, img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71vc7vW+pJL.jpg' },
        { id: 6, nombre: 'Dragon Ball S.', precio: 1000, vol: 15, img: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/690909.jpg' },
        { id: 7, nombre: 'Demon Slayer', precio: 1000, vol: 10, img: 'https://dwgkfo5b3odmw.cloudfront.net/manga/social/share-19646-DemonSlayer_GN10_Web_jpg' },
        { id: 8, nombre: 'shingeky no k.', precio: 1000, vol: 32, img: 'https://www.tierragamer.com/wp-content/uploads/2020/11/SNK-a-color.png' },
        { id: 9, nombre: 'berserk', precio: 1000, vol: 6, img: 'http://d3ugyf2ht6aenh.cloudfront.net/stores/001/749/463/products/82018bcc-4cbe-0efc-37d8-19042ec4a1201-92935c79c850c9593d16513381450979-640-0.jpg' },
        { id: 10, nombre: 'h x H', precio: 1000, vol: 7, img: 'https://i.pinimg.com/originals/d6/57/d9/d657d9f8cc0240a952f2a3982075ea84.jpg' }
]
let carrito = [];
let stringReducido = 0;
let strinMenos =0;
let carroFull= 0;
let carroL = []
function crearProductos() {
        for (const producto of productos) {
                let { id, nombre, precio, vol, img } = producto
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
                cardManga.className = 'cardManga'
                contenedor.append(cardManga)
                botonClick(id, carritoAdd)
        }
}

function botonClick(id, funcion) {
        let botonAdd = document.getElementById(id)
        botonAdd.addEventListener('click', funcion)

}
function carritoAdd(e) {
        let botonId = Number(e.target.getAttribute('id'))
        let addProducto = productos.find((el) => el.id === botonId)
        let { id } = addProducto
        let enCarrito = carrito.some((el) => el.id === id)
        preguntaEnCarrito(enCarrito,id,addProducto)
}

function sumarIndiceBoton(e) {
        let botonID = e.target.getAttribute('id')
        eliminoS(botonID,'mas')
        let prodCarrito = carrito.find((el) => el.id === stringReducido)//busco el prod en el carrito, comparando con la cadena reducida del boton +
        let indiceManga = carrito.indexOf(prodCarrito)  //identifico su indice
        let cantidad = carrito[indiceManga].cantidad += 1 //le sumo 1 a cantidad
        renderExistente(cantidad, stringReducido)
        

}
function restarIndiceBoton(e) {
        let botonID = e.target.getAttribute('id')
        eliminoS(botonID,'menos')
        let prodCarrito = carrito.find((el) => el.id === stringReducido)//busco el prod en el carrito, comparando con la cadena reducida del boton +
        let indiceManga = carrito.indexOf(prodCarrito)  //identifico su indice
        if (carrito[indiceManga].cantidad === 1){
                let borrar = document.getElementById(`card${stringReducido}`)
                alert('Desea borrar el item?')
                carrito.splice(indiceManga,1)
                borrar.remove();
                localS()
        }else{
                let cantidad = carrito[indiceManga].cantidad -= 1
                renderExistente(cantidad, stringReducido)
        }
        }



function pushear(arrayPrincipal, arraySecundario) {
        arrayPrincipal.push(arraySecundario)
        localS()
}

function render(nombre, vol, id, precio, img, cantidad) {
        let cardCarrito = document.createElement('div')
        cardCarrito.setAttribute('id', `card${id}`)
        cardCarrito.innerHTML = `  
        <img src="${img}"alt="Manga">
        <h2>${nombre}</h2>
        <h3>Vol: ${vol}</h3>
        <h3>Precio: $ ${precio}</h3>
        <h3 id="manga-${id}">Cantidad: ${cantidad}</h3>
        <button class=boton id=mas${id}>+</button>
        <button class=boton id=menos${id}>-</button>
        `
        let contenedor = document.getElementById('contenedorCarro')
        cardCarrito.className =`cardCarrito`
        contenedor.append(cardCarrito)
        clickMas(`mas${id}`,`${id}`)
        clickMenos(`menos${id}`,`${id}`)
}
function renderExistente(numCantidad, mangaID) {
        let direccion = document.getElementById(`manga-${mangaID}`)
        direccion.innerText = `Cantidad: ${numCantidad}`
        // localS()
}
function clickMenos(elID,numero){
        let menos = document.getElementById(elID)
        menos.addEventListener('click',restarIndiceBoton)
        Number(numero)
        return strinMenos = numero
}
function clickMas(elID){
        let mas = document.getElementById(elID)
        mas.addEventListener('click',sumarIndiceBoton)
} 
function eliminoS(botonID, cadena){
        let a = botonID;
        let b = cadena
        let c = Number(a.substring(b.length)) //elimino el mas del ID del boton
        return stringReducido = c
}
function preguntaEnCarrito(enCarrito,id,addProducto){
        if (enCarrito) {
                let prodCarrito = carrito.find((el) => el.id === id)//busco el prod en el carrito
                let indiceManga = carrito.indexOf(prodCarrito)  //identifico su indice
                let cantidad = carrito[indiceManga].cantidad += 1
                renderExistente(cantidad, id)
                        }
        else {
                let addProdCantidad = { ...addProducto, cantidad: 1 }
                let { nombre, vol, id, precio, img, cantidad } = addProdCantidad
                pushear(carrito, addProdCantidad)
                render(nombre, vol, id, precio, img, cantidad)
        }}

function localS(){
                const enJSON = JSON.stringify(carrito)
                localStorage.setItem('carrito',enJSON)
                // let carritoLocalS = localStorage.getItem('carrito')
                // carritoLocalS = JSON.parse(carritoLocalS)
        }
//Boton para testear estados
// function boton(){
//         let elboton = document.getElementById('botonaso')
//         elboton.addEventListener('click',hagoClick)
//         }
// function hagoClick(){
//         console.log(carroL)
//         if (carrito.length == 0){
//                 let carritoLocalS = localStorage.getItem('carrito')
//                 carritoLocalS = JSON.parse(carritoLocalS)
//                 for(datos of carritoLocalS){
//                         let {nombre, id, img, vol,precio,cantidad}=datos
//                         console.log(nombre,id,img,vol,precio,cantidad)
//                         render(nombre,id, img, vol,precio,cantidad)
//                 }
//         }else if (carrito.length===0){
                
//         }
// }
crearProductos()
// boton()