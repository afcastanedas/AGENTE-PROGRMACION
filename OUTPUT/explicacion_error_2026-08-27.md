# Explicación de error — 2026-08-27

**Tipo:** Logic error (condición de loop invertida)

**Código con error:**
```js
for(let i=0 ; i > 10 ; i++){
  console.log (i+1)
}
```

**Causa:** la condición `i > 10` es falsa desde la primera evaluación (`0 > 10`), así que el `for` termina sin ejecutar el bloque ni una vez. No hay mensaje de error porque el código es sintácticamente válido; el problema es de lógica.

**Corrección:**
```js
for(let i=0 ; i < 10 ; i++){
  console.log(i+1)
}
```

**Concepto clave:** en un `for`, la condición se evalúa antes de cada vuelta y el loop continúa mientras sea `true`. Hay que definir la condición según la dirección en la que se mueve la variable de control.
