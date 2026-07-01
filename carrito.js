// ===============================================================
// CARRITO DE COMPRAS
// ===============================================================
// Todo lo que utiliza el carrito: usando localStorage, 
// el renderizado en el html, cambios de cantidad, total y el envío del pedido 
// utilizando Formspree.
// Utiliza productos.js: Contiene el array "productos" (donde busca los
// datos al agregar un ítem) y la función "enviarFormulario" (envío
// genérico de formularios). 
// ===============================================================

// ===============================
// ESTADO (LOCAL STORAGE)
// ===============================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ===============================
// CONTENEDORES DEL DOM
// ===============================
const totalDOM = document.getElementById("total");

// ===============================
// AGREGAR AL CARRITO
// ===============================
function agregarAlCarrito(id) {

    const producto = productos.find(p => p.id == id); // array definido en productos.js
    const existe = carrito.find(p => p.id == id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
}

// ===============================
// MOSTRAR CARRITO (En un tabla)
// ===============================
function mostrarCarrito() {

    const tbody = document.getElementById("carrito-body");
    tbody.innerHTML = "";

    carrito.forEach(produ => {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td class="producto-col">
                <img src="${produ.imagen}" alt="${produ.nombre}">
                ${produ.nombre}
            </td>

            <td>$${produ.precio.toFixed(2)}</td>

            <td>
                <button data-id="${produ.id}" data-accion="restar">-</button>
                ${produ.cantidad}
                <button data-id="${produ.id}" data-accion="sumar">+</button>
            </td>

            <td>$${(produ.precio * produ.cantidad).toFixed(2)}</td>
        `;

        tbody.appendChild(fila);
    });

    actualizarTotal();
}

// ===============================
// FUNCIONES DEL CARRITO
// ===============================
function cambiarCantidad(id, cambio) {

    const prod = carrito.find(p => p.id === id);

    prod.cantidad += cambio;

    if (prod.cantidad <= 0) {
        carrito = carrito.filter(p => p.id !== id);
    }

    guardarCarrito();
}

// Nota: no está conectada a ningún botón en el HTML actual (el carrito
// solo tiene + / -). 
function eliminarProducto(id) {
    carrito = carrito.filter(prod => prod.id !== id);
    guardarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
}

function actualizarTotal() {

    const total = carrito.reduce((acumulaTotal, prod) => {
        return acumulaTotal + (prod.precio * prod.cantidad);
    }, 0);

    totalDOM.textContent = total.toFixed(2);
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// ===============================
// TEXTO DEL PEDIDO (para el mail de Formspree)
// ===============================
function armarTextoPedido() {

    if (carrito.length === 0) {
        return "El carrito está vacío.";
    }

    let texto = "";
    let total = 0;

    carrito.forEach(p => {
        let sub = p.precio * p.cantidad;
        total += sub;
        texto += `${p.nombre} x${p.cantidad} = $${sub.toFixed(2)}\n`;
    });

    texto += `\nTotal: $${total.toFixed(2)}`;

    return texto;
}

// ===============================
// INICIALIZACIÓN DOM
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    const btnVaciar = document.getElementById("vaciar-carrito");
    btnVaciar.addEventListener("click", vaciarCarrito);

    // Delegación de eventos: un solo listener para todos los botones +/-
    // de la tabla, sin importar cuántas filas se generen dinámicamente
    const carritoBody = document.getElementById("carrito-body");
    carritoBody.addEventListener("click", (e) => {
        const boton = e.target.closest("button[data-accion]");
        if (!boton) return;

        const cambio = boton.dataset.accion === "sumar" ? 1 : -1;
        cambiarCantidad(boton.dataset.id, cambio);
    });

    mostrarCarrito();

    // --- Formulario de Pedido (envía el detalle del carrito) ---
    const formPedido = document.getElementById("formPedido");
    const formMsgPedido = document.getElementById("formMsgPedido");

    formPedido.addEventListener("submit", async (e) => {
        e.preventDefault();

        // completamos el campo oculto con el detalle del carrito
        formPedido.querySelector('input[name="pedido"]').value = armarTextoPedido();

        const exito = await enviarFormulario(formPedido, formMsgPedido, "¡Pedido enviado con éxito! Te contactaremos pronto."); // definida en productos.js

        if (exito) {
            vaciarCarrito();
        }
    });

});
