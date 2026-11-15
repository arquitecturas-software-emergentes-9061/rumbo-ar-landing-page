# Rumbo-AR: landing page

Sitio web estático que presenta Rumbo-AR, una solución de navegación indoor para clínicas. Explica el producto, muestra los planes y responde preguntas frecuentes, en español e inglés.

La landing es independiente de `rumbo-api/` y `rumbo-web-application/`: no usa su código ni llama a sus servicios.

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

El formulario de `index.html` cubre la solicitud de demostración y la incorporación de una clínica. **Todavía no está conectado a ningún servicio:** no envía ni guarda datos, y al pulsar el botón con datos válidos muestra un aviso que lo indica.

Campos que recibirá el servicio externo:

| `name` | Contenido | Obligatorio |
|---|---|---|
| `request_type` | `demo` u `onboarding` | Sí |
| `contact_name` | Nombre del representante | Sí |
| `contact_email` | Correo institucional | Sí |
| `contact_role` | Cargo | Sí |
| `organization_name` | Nombre de la clínica | Sí |
| `site_count` | `1`, `2-3` o `4+` | Sí |
| `message` | Mensaje comercial | No |
| `privacy_accepted` | `on` si se acepta la política de privacidad | Sí |

Los valores de `request_type` y `site_count` no cambian con el idioma.

## Comportamiento sin JavaScript

La página funciona como mejora progresiva. Si JavaScript está desactivado o `main.js` no se ejecuta:

- El contenido queda visible, sin animaciones.
- La navegación se muestra abierta y funciona con enlaces normales.
- Las respuestas de las preguntas frecuentes aparecen desplegadas.
- El formulario muestra permanentemente el aviso de que el envío no está disponible.

Si `i18n.js` no carga, la página sigue en español y se oculta el botón de idioma. Si una imagen del teléfono o del equipo no carga, se muestra un estado alternativo.

## Publicación

Publica el contenido de `src/public/`. Todavía no hay un servicio de hosting elegido ni configurado.

## Pendientes conocidos

- El formulario de solicitud no envía datos: falta conectarlo a un servicio externo.
- La casilla de privacidad remite a una política que todavía no existe.
- «Login» lleva a la sección de contacto, porque falta la URL real del panel.
- Los videos del producto y del equipo están comentados en el HTML, con identificadores de ejemplo.
- Los precios y las afirmaciones comerciales necesitan confirmación o evidencia del equipo.

El detalle está en [docs/user-stories.md](docs/user-stories.md).
