let principal = document.getElementsByTagName("nav")[0];

let titulo = document.createElement("h1");
titulo.innerHTML = "PROYECTO FINAL JAVASCRIPT"
principal.append(titulo);


const cuerpo = document.body;
const header = document.querySelector('#header');
const navegacion = document.createElement('div');
const nav = document.createElement('nav');
const ul = document.createElement('ul');

const enlaces = [
    {
        link: "./../index",
        nombre: "Home",
        icono: "fas fa-home" 
    }
]

header.appendChild(navegacion);
navegacion.appendChild(nav);
nav.appendChild(ul);
navegacion.className = "navbar";

for (const link of enlaces) {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${link.link}.html"><i class="${link.icono}"></i>${link.nombre}</a>`;
    ul.appendChild(li);
}



const carrito = JSON.parse(localStorage.getItem('carrito')) || [];


const contenedorCarrito = document.createElement('div');
contenedorCarrito.classList.add('container', 'mt-4');
document.body.appendChild(contenedorCarrito);

const tituloCarrito = document.createElement('h2');
tituloCarrito.innerHTML = "Productos en el carrito";
contenedorCarrito.appendChild(tituloCarrito);

if (carrito.length === 0) {
    const mensajeVacio = document.createElement('p');
    mensajeVacio.innerHTML = "El carrito está vacío.";
    contenedorCarrito.appendChild(mensajeVacio);
} else {
    const row = document.createElement('div');
    row.classList.add('row');

    carrito.forEach(producto => {
        if (producto && producto.imagen) {
            const card = document.createElement('div');
            card.classList.add('col-sm-12', 'col-md-6', 'col-lg-4', 'mb-4');

            card.innerHTML = `
                <div class="card shadow h-100">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Club: ${producto.club}</p>
                        <p class="card-text">Precio: $${producto.precio}</p>
                        <p class="card-text">Cantidad: ${producto.cantidad || 1}</p>
                    </div>
                </div>
            `;

            row.appendChild(card);
        } else {
            console.warn('Producto no válido o faltan propiedades:', producto);
        }
    });

    contenedorCarrito.appendChild(row);
    
    const botonCompra = document.createElement('button');
    botonCompra.innerHTML = "Confirmar Compra";
    botonCompra.classList.add('btn', 'btn-success', 'mt-4');
    contenedorCarrito.appendChild(botonCompra);

    botonCompra.addEventListener('click', () => {
        Swal.fire({
            title: "Confirmar compra",
            text: "¿Desea confirmar la compra?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, confirmar",
            cancelButtonText: "No, cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "¡Gracias por su compra!",
                    showConfirmButton: false,
                    timer: 2000
                });
                localStorage.removeItem('carrito'); 
                setTimeout(() => {
                    location.reload(); 
                }, 2000);
            }
        });
    });
}

const botonBorrarCarrito = document.createElement('button');
botonBorrarCarrito.innerHTML = "Borrar Carrito";
botonBorrarCarrito.classList.add('btn', 'btn-danger', 'mt-4');
document.body.appendChild(botonBorrarCarrito);


botonBorrarCarrito.addEventListener('click', () => {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¡Esto eliminará todos los productos del carrito!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, borrar",
        cancelButtonText: "No, cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('carrito'); 
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Carrito borrado",
                showConfirmButton: false,
                timer: 2000
            });
            setTimeout(() => {
                location.reload(); 
            }, 2000);
        }
    });
});