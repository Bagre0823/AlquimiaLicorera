// ===============================================================
// FORMULARIOS GENÉRICOS (Formspree)
// ===============================================================
// Utilidades genéricas de envío de formularios por fetch.
// Las usan el formulario de Contacto y el de Newsletter (acá abajo),
// y también el formulario de Pedido, que se inicializa en carrito.js.
// ===============================================================

// Pinta un mensaje de éxito o error dentro del contenedor indicado
function mostrarMensaje(contenedorMsg, tipo, texto, duracion = 4000) {

    const clase = tipo === "exito" ? "alert-success" : "alert-danger";
    const icono = tipo === "exito" ? "✅" : "❌";

    contenedorMsg.innerHTML = `
        <div class="alert ${clase} fs-5 text-center shadow">
            ${icono} <strong>${texto}</strong>
        </div>`;

    contenedorMsg.scrollIntoView({ behavior: "smooth", block: "center" });

    // Si hay timeout pendiente de un mensaje anterior, lo cancela
    if (contenedorMsg._timeoutId) {
        clearTimeout(contenedorMsg._timeoutId);
    }

    // Guardamos el id del nuevo timeout en el propio elemento
    contenedorMsg._timeoutId = setTimeout(() => {
        contenedorMsg.innerHTML = "";
        contenedorMsg._timeoutId = null;
    }, duracion);
}

// Función genérica: utilizada por cualquier form, hace el fetch y muestra el resultado.
// Según la devolución dispara un alert-success o alert-error (true, false).
// La usan tanto el form de contacto (acá abajo) como el de pedido (en carrito.js).
async function enviarFormulario(form, contenedorMsg, mensajeExito) {

    contenedorMsg.innerHTML = `<div class="text-muted">Enviando...</div>`;

    let respuesta;

    try {
        respuesta = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { "Accept": "application/json" }
        });
    } catch {
        respuesta = null; 
    }

    if (respuesta && respuesta.ok) {
        mostrarMensaje(contenedorMsg, "exito", mensajeExito);
        form.reset();
        return true;
    }

    mostrarMensaje(contenedorMsg, "error", "Hubo un problema al enviar. Intentá de nuevo.");
    return false;
}

// ===============================
// INICIALIZACIÓN DOM
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    // --- Formulario de Contacto ---
    const formContacto = document.getElementById("formContacto");
    const formMsg = document.getElementById("formMsg");

    formContacto.addEventListener("submit", async (e) => {
        e.preventDefault();
        await enviarFormulario(formContacto, formMsg, "¡Mensaje enviado con éxito! Te contactaremos pronto.");
    });

    // --- Formulario de Newsletter (footer) ---
    const formNewsletter = document.getElementById("formNewsletter");
    const formMsgNewsletter = document.getElementById("formMsgNewsletter");

    formNewsletter.addEventListener("submit", async (e) => {
        e.preventDefault();
        await enviarFormulario(formNewsletter, formMsgNewsletter, "¡Listo, te suscribiste a la newsletter!");
    });

});
