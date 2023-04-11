
// const productos = [
//         { id: 1, nombre: 'Boku No Hero A.', precio: 1000, vol: 33, img: 'https://infoliteraria.com/wp-content/uploads/2022/01/myhero_academia.jpg.webp' },
//         { id: 2, nombre: 'One Piece', precio: 1000, vol: 100, img: 'https://images.squarespace-cdn.com/content/v1/571abd61e3214001fb3b9966/1b0f0c7b-7b0c-412a-8de3-f131c1e07f94/One+Piece+100.jpg' },
//         { id: 3, nombre: 'Naruto', precio: 1000, vol: 71, img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61VMDNFOUAL._AC_UF1000,1000_QL80_.jpg' },
//         { id: 4, nombre: 'Tokyo Ghoul', precio: 1000, vol: 11, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUu4qepXj53PcYVQQNHw2jcqxx6C6J4g7y5b-6atjrkNE_0F7eIJr8IIZnX3jrBZrlUOY&usqp=CAU' },
//         { id: 5, nombre: 'Slam Dunk', precio: 1000, vol: 24, img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71vc7vW+pJL.jpg' },
//         { id: 6, nombre: 'Dragon Ball S.', precio: 1000, vol: 15, img: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/690909.jpg' },
//         { id: 7, nombre: 'Demon Slayer', precio: 1000, vol: 10, img: 'https://dwgkfo5b3odmw.cloudfront.net/manga/social/share-19646-DemonSlayer_GN10_Web_jpg' },
//         { id: 8, nombre: 'shingeky no k.', precio: 1000, vol: 32, img: 'https://www.tierragamer.com/wp-content/uploads/2020/11/SNK-a-color.png' },
//         { id: 9, nombre: 'berserk', precio: 1000, vol: 6, img: 'http://d3ugyf2ht6aenh.cloudfront.net/stores/001/749/463/products/82018bcc-4cbe-0efc-37d8-19042ec4a1201-92935c79c850c9593d16513381450979-640-0.jpg' },
//         { id: 10, nombre: 'h x H', precio: 1000, vol: 7, img: 'https://i.pinimg.com/originals/d6/57/d9/d657d9f8cc0240a952f2a3982075ea84.jpg' }
// ]

// function crearProductos() {
//         for (const producto of productos) {
//                 let { id, nombre, precio, vol, img } = producto
//                 let cardManga = document.createElement('div');
//                 cardManga.innerHTML = `
//                 <img src="${img}"alt="Manga">
//                 <h2>${nombre}</h2>
//                 <h3>$ ${precio}</h3>
//                 <a href:"#" id=${id}>Add To Cart</a>
//                 <div class="numero-manga">
//                 <h3>#${vol}</h3>
//                 </div>
//                 `
//                 let contenedor = document.getElementById('productos')
//                 cardManga.className = 'cardManga'
//                 contenedor.append(cardManga)
//                 botonClick(id, carritoAdd)
//         }
// }


const contenedor = document.getElementById('productos')
fetch('./data.json')
        .then((res) => res.json())
        .then((data) => {
                data.forEach((producto) => {
                        let { nombre, id, vol, precio, img } = producto
                        productos.push(producto)
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
                })
        })
// .catch((err) => console.error(`No se cargo correctamente los datos`));
let productos = []
let carrito = [];
let stringReducido = 0;
let strinMenos = 0;


function botonClick(id, funcion) {
        let botonAdd = document.getElementById(id)
        botonAdd.addEventListener('click', funcion)

}
function carritoAdd(e) {
        let botonId = Number(e.target.getAttribute('id'))
        let addProducto = productos.find((el) => el.id === botonId)
        let { id, nombre, vol } = addProducto
        let enCarrito = carrito.some((el) => el.id === id)
        preguntaEnCarrito(enCarrito, id, addProducto)
        Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Agrego ${nombre} ${vol} a su Carrito`,
                showConfirmButton: false,
                timer: 700
        })
}

function sumarIndiceBoton(e) {
        let botonID = e.target.getAttribute('id')
        eliminoS(botonID, 'mas')
        let prodCarrito = carrito.find((el) => el.id === stringReducido)//busco el prod en el carrito, comparando con la cadena reducida del boton +
        let indiceManga = carrito.indexOf(prodCarrito)  //identifico su indice
        let cantidad = carrito[indiceManga].cantidad += 1 //le sumo 1 a cantidad
        renderExistente(cantidad, stringReducido)


}
function restarIndiceBoton(e) {
        let botonID = e.target.getAttribute('id')
        eliminoS(botonID, 'menos')
        let prodCarrito = carrito.find((el) => el.id === stringReducido)//busco el prod en el carrito, comparando con la cadena reducida del boton +
        let indiceManga = carrito.indexOf(prodCarrito)  //identifico su indice
        if (carrito[indiceManga].cantidad === 1) {
                const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                                confirmButton: 'btn btn-success',
                                cancelButton: 'btn btn-danger'
                        },
                        buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                        title: 'Estas seguro de borrar del carrito?',
                        text: "vas a perder este producto",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Si, Deseo Eliminarlo',
                        cancelButtonText: 'No, cancelar!',
                        reverseButtons: true
                }).then((result) => {
                        if (result.isConfirmed) {
                                swalWithBootstrapButtons.fire(
                                        'Eliminado!',
                                        'Tu articulo ha sido Eliminado',
                                        'warning'
                                )
                                let borrar = document.getElementById(`card${stringReducido}`)
                                carrito.splice(indiceManga, 1)
                                borrar.remove();
                                localS()
                                borrarboton()
                        } else if (
                                /* Read more about handling dismissals below */
                                result.dismiss === Swal.DismissReason.cancel
                        ) {
                                swalWithBootstrapButtons.fire(
                                        'Cancelado',
                                        'Su Articulo sigue en el Carrito',
                                        'success'
                                )
                        }
                })
        } else {
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
        <h3>${nombre}</h3>
        <h4>Vol: ${vol}</h4>
        <h4>Precio: $ ${precio}</h4>
        <h4 id="manga-${id}">Cantidad: ${cantidad}</h4>
        <button class=boton id=mas${id}>+</button>
        <button class=boton id=menos${id}>-</button>
        `
        let contenedor = document.getElementById('contenedorCarro')
        cardCarrito.className = `cardCarrito`
        contenedor.append(cardCarrito)
        clickMas(`mas${id}`, `${id}`)
        clickMenos(`menos${id}`, `${id}`)
        renderBotonVaciar()
        renderBotonFinalizar()
}
function renderExistente(numCantidad, mangaID) {
        let direccion = document.getElementById(`manga-${mangaID}`)
        direccion.innerText = `Cantidad: ${numCantidad}`
        localS()
}
function clickMenos(elID, numero) {
        let menos = document.getElementById(elID)
        menos.addEventListener('click', restarIndiceBoton)
        Number(numero)
        return strinMenos = numero
}
function clickMas(elID) {
        let mas = document.getElementById(elID)
        mas.addEventListener('click', sumarIndiceBoton)
}
function eliminoS(botonID, cadena) {
        let a = botonID;
        let b = cadena
        let c = Number(a.substring(b.length)) //elimino el mas del ID del boton
        return stringReducido = c
}
function preguntaEnCarrito(enCarrito, id, addProducto) {
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
        }
}

function localS() {
        const enJSON = JSON.stringify(carrito)
        localStorage.setItem('carrito', enJSON)
        // let carritoLocalS = localStorage.getItem('carrito')
        // carritoLocalS = JSON.parse(carritoLocalS)
}
function renderBotonVaciar() {
        if (document.getElementById('vaciarCarro')) {
                botonClick('vaciarCarro', vaciarCarro)
        } else {
                let divBoton = document.createElement('button')
                divBoton.setAttribute('id', 'vaciarCarro')
                divBoton.innerText = 'Vaciar Carrito'
                let botonVaciar = document.getElementById('contenedor-vaciar')
                divBoton.className = 'boton-vaciar'
                botonVaciar.append(divBoton)
                botonClick('vaciarCarro', vaciarCarro)
        }
}
function renderBotonFinalizar() {
        if (!document.getElementById('Fin')) {
                let divBoton = document.createElement('button')
                divBoton.setAttribute('id', 'Fin')
                divBoton.innerText = 'Finalizar Compra'
                let botonF = document.getElementById('contenedor-vaciar')
                divBoton.className = 'boton-vaciar'
                botonF.append(divBoton)
        }
}
function vaciarCarro() {
        const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
                title: 'Estas seguro de vaciar el Carrito?',
                text: "Vas a perder las compras guardadas",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si, Vaciar el Carrito',
                cancelButtonText: 'No, Deseo Seguir Comprando!',
                reverseButtons: true
        }).then((result) => {
                if (result.isConfirmed) {
                        swalWithBootstrapButtons.fire(
                                'Eliminado!',
                                'Se ha Vaciado el Carrito',
                                'error'
                        )
                        carrito = []
                        localStorage.clear()
                        let boxes = document.querySelectorAll('.cardCarrito');
                        boxes.forEach(box => {
                                box.remove();
                        });
                        let boton = document.getElementById('vaciarCarro');
                        let botonf = document.getElementById('Fin')
                        boton.remove()
                        botonf.remove()
                } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                ) {
                        swalWithBootstrapButtons.fire(
                                'Cancelado',
                                'Puede seguir comprando :)',
                                'success'
                        )
                }
        })

}

if (localStorage.getItem('carrito')) {
        let carroLocS = localStorage.getItem('carrito')
        carroLocS = JSON.parse(carroLocS)
        carrito = carroLocS
        for (manga of carrito) {
                let { nombre, vol, id, precio, img, cantidad } = manga
                render(nombre, vol, id, precio, img, cantidad)
        }
}
function borrarboton() {
        if (carrito == 0) {
                document.getElementById('vaciarCarro').remove()
        }
}
// crearProductos()