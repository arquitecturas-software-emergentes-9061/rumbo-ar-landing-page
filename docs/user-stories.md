# Historias de usuario de la landing

Este documento describe lo que hace la landing, no las funciones de la aplicación Rumbo-AR. El prefijo `LP-` evita confusiones con los identificadores `US-xx` de la API.

## Resumen

| ID | Historia | Estado |
|---|---|---|
| LP-01 | Entender la propuesta de valor | Implementada |
| LP-02 | Navegar por las secciones | Implementada |
| LP-03 | Cambiar de idioma | Implementada |
| LP-04 | Conocer el producto y el equipo | Implementada |
| LP-05 | Comparar los planes | Implementada |
| LP-06 | Consultar preguntas frecuentes | Implementada |
| LP-07 | Solicitar una demo | Implementada |
| LP-08 | Acceder al panel administrativo | Pendiente |
| LP-09 | Ver los videos | Parcial |

## Implementadas

### LP-01: Entender la propuesta de valor

Como visitante, quiero entender en la primera pantalla qué ofrece Rumbo-AR, para decidir si me interesa.

- La sección inicial muestra el título, la descripción, los botones de acción y la imagen del teléfono.

### LP-02: Navegar por las secciones

Como visitante, quiero moverme por las secciones desde cualquier dispositivo, para encontrar rápido lo que busco.

- La barra de navegación enlaza con las secciones y resalta la actual al desplazarse.
- En pantallas de hasta 1.320 px, un menú hamburguesa contiene los enlaces, el idioma, «Login» y «Get Started».
- El menú se cierra al elegir un enlace, al pulsar Escape o al volver al ancho de escritorio.
- Sin JavaScript, los enlaces quedan siempre visibles y el contenido no se oculta.

### LP-03: Cambiar de idioma

Como visitante, quiero alternar entre español e inglés, para leer el contenido en el idioma que prefiero.

- El botón de idioma traduce los textos, los placeholders, los textos alternativos de las imágenes, los atributos `title` y `aria-label` y el título de la pestaña, y actualiza el atributo `lang` de la página.
- **Limitación:** el idioma no se recuerda; al recargar, la página vuelve al español.

### LP-04: Conocer el producto y el equipo

Como visitante, quiero conocer los beneficios, el funcionamiento, la tecnología y el equipo, para evaluar la solución.

- Estas secciones son informativas y aparecen con animaciones al desplazarse.
- La sección de equipo muestra la foto, el nombre y el área de cada uno de los 5 integrantes.
- **Limitación:** el interruptor de accesibilidad y el selector de niveles solo cambian de aspecto; no controlan ninguna función real.

### LP-05: Comparar los planes

Como responsable de una clínica, quiero comparar los planes, para saber cuál se adapta a mi organización.

- La sección de planes muestra los precios y las características de cada uno.
- **Por confirmar:** el equipo debe validar los precios publicados.

### LP-06: Consultar preguntas frecuentes

Como visitante, quiero leer las preguntas frecuentes, para resolver mis dudas sin contactar a nadie.

- Cada pregunta se abre al hacer clic y cierra la que estuviera abierta.

## Pendientes

### LP-07: Solicitar una demo

Como responsable de una clínica, quiero enviar una solicitud de demo, para que el equipo me contacte.

- **Estado actual:** un único formulario permite elegir entre solicitar una demostración e iniciar la incorporación. Envía la solicitud a `rumbo-api` (`POST /api/v1/onboarding-requests`, PR-4), que la guarda con el consentimiento. Muestra la confirmación con el código de la solicitud, o un aviso si falla, sin perder los datos.
- **Falta:** que la API en Render acepte el origen de la landing (`CORS_ALLOWED_ORIGINS`) y publicar la política de privacidad.

### LP-08: Acceder al panel administrativo

Como cliente, quiero entrar al panel desde «Login», para gestionar mi clínica.

- **Estado actual:** «Login» lleva a la sección de contacto (`#contacto`).
- **Falta:** la URL pública del panel, que será un enlace externo sin integración técnica.

### LP-09: Ver los videos

Como visitante, quiero ver los videos del producto y del equipo, para entender mejor la solución.

- **Estado actual:** la sección del producto dice que el video está en preparación y ofrece pedir una demo en vivo. Cuando `productVideoUrl` de `config.js` tenga la URL, aparece el botón de reproducir (PR-14). El video del equipo sigue comentado con `TU_VIDEO_EQUIPO`.
- **Falta:** los videos reales y sus enlaces.

## Contenido sin validar

Este documento no valida las afirmaciones comerciales ni los testimonios que aparecen en la landing. Antes de publicarlos, necesitan evidencia del equipo.
