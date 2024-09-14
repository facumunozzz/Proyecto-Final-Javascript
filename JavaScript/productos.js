let principal = document.getElementsByTagName("header")[0];

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
        link: "./Pages/carrito",
        nombre: "Carrito",
        icono: "fas fa-shopping-cart"
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




const cardsProductos = document.getElementById("cards");

const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const agregarAlCarrito = (producto) => {
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    Swal.fire({
        position: "top-center",
        icon: "success",
        title: "El producto ha sido añadido al carrito!",
        showConfirmButton: false,
        timer: 2000
      });
};

const mostrarProdJson = async (filtroTipo = "") => {
    const respuesta = await fetch("/productos.json");
    const datos = await respuesta.json();

    cardsProductos.innerHTML = "";

    const productosFiltrados = datos.filter(item => {
        if (filtroTipo === "") return true;
        return item.categoria.nombre === filtroTipo;    
    });

    productosFiltrados.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("col-sm-12", "col-md-6", "col-lg-4", "mb-4");

        card.innerHTML = `
            <div class="card">
                <img class="card-img-top" src="${item.imagen}" alt="${item.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${item.nombre}</h5>
                    <p class="card-text">Club: ${item.club}</p>
                    <p class="card-text">Precio: $${item.precio}</p>
                    <a href="#" class="btn btn-success comprar-btn" data-id="${item.id}">Comprar</a>
                </div>
            </div>
        `;

        cardsProductos.appendChild(card);
    });

    document.querySelectorAll('.comprar-btn').forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            const idProducto = e.target.getAttribute('data-id');
            const productoSeleccionado = productosFiltrados.find(item => item.id == idProducto);
            agregarAlCarrito(productoSeleccionado);
        });
    });
}

mostrarProdJson();

document.getElementById("filtrarCamisetas").addEventListener("click", () => {
    mostrarProdJson("Camisetas");
});

document.getElementById("filtrarCamperones").addEventListener("click", () => {
    mostrarProdJson("Camperones");
});

document.getElementById("mostrarTodos").addEventListener("click", () => {
    mostrarProdJson();
});


