// ===============================================================
// PRODUCTOS
// ===============================================================
// Este archivo se encarga únicamente del catálogo de productos
// y su renderizado en el DOM.
//
// Depende de carrito.js: la función "agregarAlCarrito" usada en el
// addEventListener de abajo está definida ahí. 
// ===============================================================

// ===============================
// ARRAY - CATÁLOGO DE PRODUCTOS
// ===============================
const productos = [
    { id: 1, nombre: "Naranja", descripcion: "Vibrante...", precio: 200.99, imagen: "img/LicorNaranja2.png" },
    { id: 2, nombre: "Limón", descripcion: "Refrescante...", precio: 250.99, imagen: "img/LicorLimon1.png" },
    { id: 3, nombre: "Manzana", descripcion: "Suave...", precio: 300.99, imagen: "img/LicorManzana.png" },
    { id: 4, nombre: "Pomelo", descripcion: "Intenso...", precio: 310.99, imagen: "img/LicorPomelo.png" },
    { id: 5, nombre: "Durazno", descripcion: "Dulce...", precio: 320.99, imagen: "img/LicorDurazno.png" },
    { id: 6, nombre: "Mandarina", descripcion: "Aromático...", precio: 350.99, imagen: "img/LicorMandarina.png" }
];

// ===============================
// CONTENEDOR DEL DOM
// ===============================
const contenedorProductos = document.getElementById("productos-grid");

// ====================================
// MOSTRAR PRODUCTOS - RECORRE EL ARRAY
// ====================================
function mostrarProductos() {
    contenedorProductos.innerHTML = "";

    productos.forEach(produ => {
        const card = document.createElement("div");
        card.classList.add("producto");

        card.innerHTML = `
            <img src="${produ.imagen}" alt="${produ.nombre}">
            <h3>${produ.nombre}</h3>
            <p>${produ.descripcion}</p>
            <h4>$${produ.precio.toFixed(2)}</h4>
            <button class="btnCarrito" data-id="${produ.id}">
                Agregar
            </button>
        `;

        contenedorProductos.appendChild(card);
    });
}

// ===============================
// EVENTOS DEL CATÁLOGO
// ===============================
contenedorProductos.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnCarrito")) {
        agregarAlCarrito(e.target.dataset.id); // definida en carrito.js
    }
});

// ===============================
// INICIALIZACIÓN DOM
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos();
});
