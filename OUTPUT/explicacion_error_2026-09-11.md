# Explicación de error — 2026-09-11

**Tipo:** SyntaxError (dos casos, mismo archivo)

**Código con error (Objetos 1.js):**
```js
let heroe= {
    nombre: 'Racho Makuin',
    edad: 38,
    activo: true,
    poderes: ['Velocidad', 'Inteligencia', 'bondad'],
    descripción: "velocidad soy veloz, 1 ganador 42 perdedores yo desayuno perdedores"
    imagen: "https://noticias.coches.com/wp-content/uploads/2020/08/coches.com_quien-es-rayo-mcqueen-cars-10.jpeg"
};
heroe.
```

**Causa:**
- Línea 6→7: falta la coma después de `descripción: "..."`. En un objeto literal cada propiedad debe separarse de la siguiente con `,`; sin ella el parser no puede interpretar `imagen: ...` como una nueva propiedad y falla.
- Línea 9: `heroe.` queda incompleto — el `.` de acceso a propiedad siempre debe ir seguido de un nombre (ej. `heroe.nombre`). Sin eso, el parser espera más código y el archivo termina ahí.

**Corrección:**
```js
let heroe = {
    nombre: 'Racho Makuin',
    edad: 38,
    activo: true,
    poderes: ['Velocidad', 'Inteligencia', 'bondad'],
    descripción: "velocidad soy veloz, 1 ganador 42 perdedores yo desayuno perdedores",
    imagen: "https://noticias.coches.com/wp-content/uploads/2020/08/coches.com_quien-es-rayo-mcqueen-cars-10.jpeg"
};
heroe.nombre;
```

**Concepto clave:** en un objeto literal, la coma no es estilo — es el separador que marca dónde termina una propiedad y empieza la siguiente. Y el `.` de acceso a propiedad no es opcional: sin un nombre después, la expresión queda inválida y el parser no puede terminar de leer el archivo.
