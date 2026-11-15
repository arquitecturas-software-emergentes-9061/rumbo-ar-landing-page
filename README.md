# Rumbo-AR: landing page

Sitio web estático que presenta Rumbo-AR, una solución de navegación indoor para clínicas. Explica el producto, muestra los planes y responde preguntas frecuentes, en español e inglés.

La landing no usa código de `rumbo-api/` ni de `rumbo-web-application/`. Su única llamada es el envío del formulario a `POST /api/v1/onboarding-requests` de `rumbo-api` (PR-4).

## Estructura

```text
prueba-landing/
├── README.md
├── docs/
│   └── user-stories.md          Historias implementadas y pendientes
└── src/
    └── public/                  Carpeta a publicar
        ├── index.html           Página única
        └── assets/
            ├── images/          demo-screen.png (hoy sin uso), phone-hero.png
            │   └── team/        Fotos de los integrantes del equipo
            ├── scripts/
            │   ├── config.js    URL de rumbo-api y del video del producto (se cambia al publicar)
            │   ├── i18n.js      Diccionario ES/EN y cambio de idioma
            │   └── main.js      Menú, animaciones e interacciones
            └── styles/
                └── styles.css   Estilos y reglas responsive
```

## Tecnologías

- HTML, CSS y JavaScript, sin frameworks, dependencias ni compilación.
- Fuente Inter, cargada desde Google Fonts: requiere conexión a internet. Sin conexión, el navegador usa una fuente alternativa.

## Ejecución local

No hace falta instalar dependencias del proyecto. Elige una opción:

### Live Server (VS Code)

1. Instala la extensión Live Server.
2. Haz clic derecho en `src/public/index.html` y elige **Open with Live Server**.

La dirección depende de la carpeta abierta en VS Code:

| Carpeta abierta | Dirección |
|---|---|
| `prueba-landing/` | `http://127.0.0.1:5500/src/public/index.html` |
| `rumbo-AR/` | `http://127.0.0.1:5500/prueba-landing/src/public/index.html` |

El puerto puede variar si el 5500 está ocupado.

### Python

Desde la carpeta `prueba-landing/`:

```bash
python -m http.server 5500 --directory src/public
```

Después abre `http://localhost:5500`.

## Formulario de solicitud

El formulario de `index.html` cubre la solicitud de demostración y la incorporación de una clínica. Con datos válidos, `main.js` envía la solicitud en JSON a `POST {apiBaseUrl}/api/v1/onboarding-requests`; `apiBaseUrl` está en `assets/scripts/config.js`. Mientras envía, el botón queda deshabilitado. Si la API responde 201, aparece la confirmación con el código de la solicitud y el formulario se limpia. Si falla, sin red o con un error, se muestra un aviso y los datos siguen en el formulario. La API debe tener el origen de la landing en `CORS_ALLOWED_ORIGINS`.

Campos del formulario y su campo en la API:

| `name` | Contenido | Obligatorio | En la API |
|---|---|---|---|
| `request_type` | `demo` u `onboarding` | Sí | `type`: `DEMO` u `ONBOARDING` |
| `contact_name` | Nombre del representante | Sí | `fullName` |
| `contact_email` | Correo institucional | Sí | `email` |
| `contact_role` | Cargo | Sí | `role` |
| `organization_name` | Nombre de la clínica | Sí | `clinicName` |
| `site_count` | `1`, `2-3` o `4+` | Sí | `sitesRange`: `ONE`, `TWO_TO_THREE` o `FOUR_OR_MORE` |
| `message` | Mensaje comercial | No | `message` (`null` si está vacío) |
| `privacy_accepted` | `on` si se acepta la política de privacidad | Sí | `privacyConsent` |

Los valores de `request_type` y `site_count` no cambian con el idioma.

## Comportamiento sin JavaScript

La página funciona como mejora progresiva. Si JavaScript está desactivado o `main.js` no se ejecuta:

- El contenido queda visible, sin animaciones.
- La navegación se muestra abierta y funciona con enlaces normales.
- Las respuestas de las preguntas frecuentes aparecen desplegadas.
- El formulario muestra permanentemente el aviso de que el envío no está disponible, porque sin JavaScript no se puede enviar.

Si `i18n.js` no carga, la página sigue en español y se oculta el botón de idioma. Si una imagen del teléfono o del equipo no carga, se muestra un estado alternativo.

## Publicación

Publica el contenido de `src/public/`. Publicada, la página envía las solicitudes a `https://rumbo-api-demo.onrender.com`; servida desde `localhost`, a `http://localhost:8080`. Las dos URLs están en `assets/scripts/config.js`, que también guarda `productVideoUrl` para cuando exista el video. Está publicada en Vercel: https://rumbo-ar.vercel.app/

## Pendientes conocidos

- La casilla de privacidad remite a una política que todavía no existe.
- «Login» lleva a la sección de contacto, porque falta la URL real del panel.
- El video del producto se muestra «en preparación» hasta que `productVideoUrl` tenga una URL. El del equipo sigue comentado en el HTML.
- Los precios y las afirmaciones comerciales necesitan confirmación o evidencia del equipo.

El detalle está en [docs/user-stories.md](docs/user-stories.md).
