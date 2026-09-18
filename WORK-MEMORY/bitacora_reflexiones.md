# Bitácora de reflexiones — Agente de Talleres

Una entrada breve por sesión de clase: qué se aprendió o qué costó más, escrita al cierre de cada
sesión. **No es la bitácora del curso** (esa la lleva el profesor, en `bitacora_sesiones_curso.csv`,
fuera de esta carpeta) — esta es la reflexión personal del estudiante sobre su propio proceso.

## 2026-08-20

Hoy entendí la diferencia entre declarar una variable con `let` y usarla sin declararla — el
`ReferenceError` dejó de sentirse aleatorio en cuanto vi que siempre es la misma causa: un nombre
que nunca definí.

## 2026-08-22

Me costó organizar las referencias visuales por tema en vez de por sitio de origen. Al principio
quería agruparlas por dónde las encontré, pero agruparlas por lo que inspiran (color, tipografía,
layout) tiene más sentido para el proyecto.

## 2026-09-03

Clase de interacción CSS/JS (grid + `addEventListener`). Todavía no tengo mucha experiencia en esto —
sesión de práctica agregando botones y listeners de click sobre el ejercicio de Grid de la semana 03.

## 2026-09-04

Practiqué el manejo de media queries — tanto en CSS (`@media`) como en JS (`matchMedia`) para
ocultar/mostrar una caja del grid según el ancho de pantalla. Afiancé un poco estos conocimientos.

## 2026-09-10

No logré entender del todo la temática de la clase.

## 2026-09-11

Me desenvolví mejor en esta sesión y pude experimentar con más confianza.

## 2026-09-15

Exploración de estilos para la entrega de las cartas de ciclistas (`Trabajo_cartas_Javascript`):

- **Glassmorphism con blur**: primer estilo probado — fondo oscuro con gradiente radial, cartas
  translúcidas con `backdrop-filter: blur()`. Se veía bien pero el blur generaba una capa opaca que
  cubría toda la vista (bug real: `.hidden` con clase perdía contra `#modal-overlay` por
  especificidad de ID vs clase — el modal nunca se ocultaba del todo). Se quitó el blur y se subió
  la opacidad de los fondos para compensar.
- **Fondo claro vs. oscuro**: probé cambiar el fondo general a un gradiente claro; al final se
  volvió al fondo oscuro original porque combinaba mejor con las cartas y el botón de modo oscuro.
- **Imágenes cuadradas**: cambié `height` fija por `aspect-ratio: 1/1` en `.card-img` para que todas
  las fotos se recorten igual sin importar su proporción original.
- **Efecto tilt 3D + brillo holográfico**: agregué un listener de `mousemove` que calcula la
  posición del cursor sobre la carta y la inclina con `rotateX`/`rotateY`, más una capa `.card-shine`
  con gradiente radial que sigue al mouse (`mix-blend-mode: overlay`) para simular el brillo tipo
  carta holográfica.
- **Animación de apertura del modal**: la carta seleccionada ahora entra con `perspective` +
  `rotateY` + `scale` (`@keyframes zoomIn3d`) en vez de aparecer de golpe.

Lo que me costó: entender por qué el modal no se ocultaba (especificidad CSS de ID vs. clase) —
tuve que forzar `.hidden` con `!important` para que ganara.

## 2026-09-16

Cierre de la entrega de cartas de ciclistas. Ajustes finales: reduje el array a 8 objetos (dentro
del rango de 8-10 pedido), agregué la propiedad booleana `veterano`, y migré las imágenes de rutas
locales (`images/...`) a URLs de Imgur para que el proyecto funcione igual si se exporta a CodePen
u otra plataforma externa — las rutas locales no existen fuera de mi máquina.

Lo que aprendí: el método de mantener el HTML muy liviano (casi vacío, solo contenedores) y que
toda la construcción real pase por JavaScript — el HTML es solo el "molde" donde se inyecta el
contenido generado dinámicamente.

## 2026-09-18

Aprendí a usar un flujo de trabajo CRUD con éxito.
