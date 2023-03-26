const productos = [
    { id: 1, nombre: "arroz", precio: 300 },
    { id: 2, nombre: "leche", precio: 200 },
    { id: 3, nombre: "yerba", precio: 500 },
    { id: 4, nombre: "queso", precio: 400 },
];
let carrito = [];
const DateTime = luxon.DateTime;
const Duration = luxon.Duration;
const Interval = luxon.Interval;

// const dt = DateTime.local(2022, 1, 25, 12, 10)
const dt = DateTime.fromObject(
    { day: 22, hour: 12, month: 2 },
    { zone: "America/Buenos_Aires", numberingSystem: "beng" }
);
// const dt =DateTime.fromISO("2017-05-15")
const now = DateTime.now();
const later = DateTime.local(2024, 1, 26);
const i = Interval.fromDateTimes(now, later);
console.log(i.length("days"), i.length("month"));

const temporizador = Duration.fromObject({ hours: 3, minutes: 15 });
// console.log( dt.day )
// console.log(dt.toLocaleString(DateTime.DATE_FULL))
// console.log(dt.toLocaleString(DateTime.TIME_SIMPLE))
// console.log(dt.setLocale('en').toLocaleString(DateTime.DATE_FULL))
// console.log(now.minus({ hours: 4 }).toLocaleString(DateTime.DATETIME_SHORT))
// console.log(temporizador.values)

function listarProductos() {
    for (const producto of productos) {
        let { nombre, precio, id } = producto;
        let cardProducto = document.createElement("div");
        cardProducto.innerHTML = `
            <h3>${nombre}</h3>
            <h3>$ ${precio}</h3>
            <button class="button" id=${id} >Agregar al carrito</button>
        `;
        cardProducto.className = "card";
        let lista = document.getElementById("listProductos");
        lista.append(cardProducto);
        let botonParaAgregar = document.getElementById(`${producto.id}`);
        botonParaAgregar.addEventListener("click", agregarAlCarrito);
    }
}

function agregarAlCarrito(e) {
    // Swal.fire({
    //     position: 'top-start',
    //     icon: 'success',
    //     title: 'Has agregado al carrito correctamente',
    //     showConfirmButton: false,
    //     timer: 1000
    // })

    // alert('Has agregado al carrito correctamente')
    let id = Number(e.target.getAttribute("id"));
    let productoAAgregar = productos.find((producto) => producto.id === id);
    let { nombre, precio } = productoAAgregar;
    Toastify({
        text: `${productoAAgregar.nombre} se ha agregado al carrito correctamente`,
        className: "toast",
        duration: 13000,
        destination: "https://www.coderhouse.com",
    }).showToast();
    existeEnCarrito(productoAAgregar)
        ? (() => {
            let productoEnCarrito = carrito.find(
                (producto) => producto.id === productoAAgregar.id
            );
            let indiceDelProducto = carrito.indexOf(productoEnCarrito);
            carrito[indiceDelProducto].cantidad += 1;
            let { cantidad } = carrito[indiceDelProducto];
            let productoAnterior = document.getElementById(
                `producto${productoAAgregar.id}`
            );
            productoAnterior.innerHTML = `
            <h3>${nombre}</h3>
            <h3>$ ${precio}</h3>
            <h3>Cantidad: ${cantidad}</h3>
              <h3>Total de ${nombre} : $ ${carrito[indiceDelProducto].cantidad * productoAAgregar.precio
                }</h3>
        `;
        })()
        : (() => {
            let productoConCantidad = { ...productoAAgregar, cantidad: 1 };
            let { nombre, precio } = productoConCantidad; // Agregado hoy
            carrito.push(productoConCantidad);
            let cardCarrito = document.createElement("div");
            cardCarrito.innerHTML = `
              <h3>${nombre}</h3>
              <h3>$ ${precio}</h3>
              <h3>Cantidad: 1</h3>
          `;
            cardCarrito.setAttribute("id", `producto${productoConCantidad.id}`);
            cardCarrito.className = "cardCarrito";
            let carritoContendor = document.getElementById("carrito");
            carritoContendor.append(cardCarrito);
        })();
}

function existeEnCarrito(productoAChequear) {
    // if(carrito.find((producto)=>producto.id === productoAChequear))return true
    // else return false
    return carrito.some((producto) => producto.id === productoAChequear.id);
    // for (producto of carrito){
    //     if(productoAChequear.id === producto.id){
    //         return true
    //     }
    // }
    // return false
}

function finalizarCompra() {
    let finalizar = document.getElementById("finalizar-compra");
    finalizar.addEventListener("click", mostrarCompra);
}
function mostrarCompra() {
    Swal.fire({
        title: "Está seguro de finalizar la compra?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, seguro",
        cancelButtonText: "No, quiero agregar algo más",
    }).then((result) => {
        if (result.isConfirmed) {
            let sumaTotal = 0;
            for (producto of carrito) {
                sumaTotal += producto.precio * producto.cantidad;
            }
            Swal.fire(`Su total de la compra es de $${sumaTotal}`);
        } else {
            Swal.fire({
                icon: "warning",
                title:
                    "No finalizo su compra, puede seguir agregando productos al carrito",
                showConfirmButton: false,
                timer: 1000,
            });
        }
    });
}
function vaciarCarrito() {
    let vaciar = document.getElementById("vaciar-carrito");
    vaciar.addEventListener("click", handleVaciarCarrito);
}
function handleVaciarCarrito() {
    Swal.fire({
        title: "Está seguro de vaciar el carrito?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, seguro",
        cancelButtonText: "No, no quiero",
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            let carritoContendor = document.getElementById("carrito");
            carritoContendor.innerHTML = `<h2>Carrito</h2>
            <h3>Su carrito esta vacio</h3>`;
            Swal.fire({
                title: "Se ha vaciado el carrito",
                icon: "success",
            });
        }
    });
}
listarProductos();
finalizarCompra();
vaciarCarrito();
