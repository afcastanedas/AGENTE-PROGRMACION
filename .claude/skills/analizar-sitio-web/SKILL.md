---
name: analizar-sitio-web
description: Analiza un sitio web de referencia (por URL o abierto en el browser panel) y produce tres entregables — resumen .md, estructura semántica .xml y una fila para la matriz comparativa. Use when the user gives a reference site URL, has a site open in the browser panel, or asks to analyze/comparar sitios de referencia para un proyecto.
---

Cuando se active esta skill:

1. Si el estudiante no dio una URL ni tiene un sitio abierto en el browser panel, pídesela —
   no analices un sitio inventado ni asumas cuál es.
2. Visita/observa el sitio y recopila lo necesario para los tres entregables, **que siempre se
   producen juntos y claramente marcados** (nunca solo uno o dos):

   **a) Resumen (`.md`, menos de 300 palabras)**
   Cubre: contenido del sitio, enfoque, público objetivo, estructura, UX y UI.
   Guárdalo en `OUTPUT/analisis_sitios_landing/resumenes/[nombre-del-sitio].md`.

   **b) Estructura semántica (`.xml`)**
   Usa únicamente etiquetas semánticas de HTML5 que correspondan a lo que el sitio realmente
   tiene — no inventes nombres de etiqueta ni agregues secciones que no existan. Esquema:
   ```xml
   <sitio nombre="..." url="...">
     <header>
       <logo>...</logo>
       <nav tipo="fija | hamburguesa | mega-menu | overlay-fullscreen">
         <enlace>...</enlace>
       </nav>
     </header>
     <main>
       <section tipo="hero">...</section>
       <section tipo="...">...</section>
     </main>
     <footer>
       <redes>...</redes>
       <contacto>...</contacto>
     </footer>
   </sitio>
   ```
   Guárdalo en `OUTPUT/analisis_sitios_landing/xml/[nombre-del-sitio].xml`.

   **c) Fila para la matriz comparativa**
   Exactamente estos 14 campos, en este orden, separados por ` ; `:
   ```
   url ; tipo_de_sitio ; cms_o_builder ; libreria_animacion ; libreria_frontend ; patron_navegacion ; num_secciones_home ; transicion_entre_paginas ; tipografia_principal ; estilo_visual ; fortaleza_ux ; oportunidad_mejora ; nombre_archivo_md ; nombre_archivo_xml
   ```
   Si algún dato no se puede determinar con certeza (ej. el CMS/builder, o la librería de
   animación), escribe `No identificado` en ese campo en vez de adivinar.
   Agrega esta fila a `OUTPUT/analisis_sitios_landing/matriz_comparativa.csv` — **sin borrar las
   filas anteriores**. Si el archivo no existe todavía, créalo primero con la línea de
   encabezado (los mismos 14 nombres de campo, separados por ` ; `).

3. Usa el mismo `[nombre-del-sitio]` (slug corto, en minúsculas, sin espacios) para el `.md`,
   el `.xml` y las columnas `nombre_archivo_md`/`nombre_archivo_xml` de la fila — deben
   coincidir entre sí para poder cruzar los tres entregables después.
4. Al terminar, muestra al estudiante un resumen breve de los tres archivos/filas generados
   (rutas y, si aplica, qué campos quedaron en "No identificado").
