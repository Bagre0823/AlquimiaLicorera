# ALQUIMIA LICORERA

Landing page para un emprendimiento familiar de licores artesanales. 
El objetivo fue crear un sitio simple, atractivo y responsive para presentar los productos y la identidad de la marca.

# ¿Qué permite esta web?


- Mostrar los productos de forma organizada mediante tarjetas visuales.
- Mejorar la presencia digital del emprendimiento.
- Brindar una experiencia de usuario adaptable a distintos dispositivos (responsive).
- Acceder, mediante un código QR en el pie de página, a un formulario de encuesta de satisfacción.


# Instrucciones para visualizar el proyecto:

Es un proyecto 100% front-end (HTML, CSS y JS estáticos), no requiere instalación ni servidor backend.

Opción 1 - Abrir directamente

1.  Clonar o descargar el repositorio.
2.  Verificar que la carpeta img/ (logo, banners, productos, QR) esté junto a index.html.
3.  Abrir index.html con el navegador.

El envío de formularios vía fetch puede comportarse distinto con file://. Para una experiencia más fiel a producción, usá la Opción 2.

Opción 2 — Servidor local

1.  Abrir la carpeta en VS Code.
2.  Instalar la extensión Live Server.
3.  Clic derecho sobre index.html → "Open with Live Server".
4.  Se abre en http://127.0.0.1:5500.


# Requisitos: 

Navegador moderno + conexión a internet (Para los conenidos de Bootstrap, Font Awesome y Google Fonts, y envío de formularios vía Formspree).


# Desarrollo:

- Estructura en HTML semántico, organizada en secciones: encabezado, introducción, productos, recursos y pie de página.
- Bootstrap para el diseño responsive, Google Fonts para tipografía y Font Awesome para íconos.
- CSS externo con reset básico y estilos generales para textos y contenedores.
- Flexbox para alineación y distribución prolija de los elementos.
- Tarjetas reutilizables (imagen, título, descripción y botón) para los productos.
- Código QR en el pie de página que redirige a un formulario de encuesta de satisfacción.
- Diseño responsive con media queries, ajustando tamaños y visibilidad de elementos en pantallas chicas.


# Tecnologías UtilizadasS:
-  HTML5 - estructura semántica del sitio (index.html).
-  CSS3 - estilos propios, variables CSS, Flexbox y diseño responsive (styles.css).
-  JavaScript - separado en dos archivos:
	-  productos.js: catálogo de productos y renderizado de tarjetas.
	-  carrito.js: lógica del carrito (agregar, modificar cantidad, eliminar, vaciar, total) con localStorage.
	-  formularios.js: envío de formularios de contacto y pedido.
- Bootstrap 5.3.3 - grillas, navbar responsive y utilidades.
- Font Awesome 6.5.0 - iconografía.
- Google Fonts - tipografía Montserrat.
- Formspree - envío de formularios (contacto, pedido y encuesta de satisfacción vía QR).


# Aprendizaje y Proceso:

Desarrollo iterativo, con pruebas y ajustes constantes, apoyándose en documentación online, ejemplos prácticos y la utilización de herramientas de inteligencia artificial.

Uno de los desafíos concretos fue mantener sincronizados la cantidad de cada producto y el total general del carrito: 
cada vez que se modifica localStorage, hay que volver a recorrer el carrito y recalcular el total, evitando que quede desactualizado en pantalla 
(por ejemplo, al reabrir el carrito o recargar la página).


# Conclusión:

El proyecto permitió afianzar conocimientos en maquetado web, diseño responsive y herramientas modernas de desarrollo, además de reforzar la importancia de la iteración y la mejora continua.
