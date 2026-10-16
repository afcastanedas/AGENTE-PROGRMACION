# SUPABASE 1

Sandbox para aprender y experimentar con Supabase directo en el navegador (sin build, usando el CDN).

## Setup

1. Abre `supabaseClient.js` y reemplaza `SUPABASE_URL` y `SUPABASE_ANON_KEY` con los datos de tu proyecto (Project Settings → API en el panel de Supabase).
2. Abre `index.html` en el navegador (puedes usar la extensión "Live Server" de VS Code, o simplemente abrir el archivo).
3. Abre la consola del navegador (F12) para ver el resultado de la conexión.

## Estructura

- `index.html` — carga el CDN de Supabase y los scripts del proyecto.
- `supabaseClient.js` — configura las credenciales y crea el cliente `db`.
- `app.js` — prueba la conexión usando el cliente `db`.
