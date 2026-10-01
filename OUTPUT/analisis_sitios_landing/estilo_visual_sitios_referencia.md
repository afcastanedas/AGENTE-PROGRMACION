# Estilo visual — síntesis de los 6 sitios de referencia

Basado en los análisis individuales de [mattdavella.com](resumenes/mattdavella.md),
[artemartemartem.com](resumenes/artemartemartem.md), [amyosburn.com](resumenes/amyosburn.md),
[justinjaeger.com](resumenes/justinjaeger.md), [jecamartinez.com](resumenes/jecamartinez.md) y
[exportarts.studio](resumenes/exportarts.md). No es un sitio nuevo analizado, es un cruce de
patrones entre los que ya están en `matriz_comparativa.csv`.

## Patrones que se repiten

**1. La fotografía/video manda, el texto acompaña**
En 5 de los 6 sitios (todos menos jecamartinez, que es más ilustrativo/emoji), el elemento
visual dominante es fotografía o video de alta resolución, no bloques de texto. Amy Osburn y
Artem Shcherbakov llevan esto al extremo: casi no hay copy, el trabajo "habla por sí solo".

**2. Paletas neutras, pocos acentos de color**
Blanco/gris/crema como base en mattdavella, amyosburn, justinjaeger y exportarts. El color se
reserva para un acento puntual (CTAs, status). Las excepciones son los dos sitios más oscuros o
pasteles: artemartemartem (fondo oscuro, dramatismo) y jecamartinez (pastel/whimsical, tono
desenfadado). Ningún sitio usa paletas saturadas o múltiples colores compitiendo entre sí.

**3. Espacio en blanco generoso**
Mencionado explícitamente en mattdavella y amyosburn; se nota también en justinjaeger y
exportarts por la cantidad de aire entre secciones. El minimalismo no es solo de color, es de
composición: pocas cosas por pantalla, jerarquía clara.

**4. Prueba social con números, no solo testimonios**
Tendencia fuerte en los sitios de creadores de contenido (justinjaeger: "Organic Views" con
gráficos; jecamartinez: vistas/likes por video; exportarts: followers/engagement/shares/watchtime
por formato). mattdavella usa logos de medios + testimonios citados, un enfoque más editorial
que numérico. Ninguno se queda solo con "nos encantó trabajar con ellos" sin respaldo.

**5. Navegación mínima, casi nunca un menú tradicional largo**
Patrones observados: fija simple de 2-3 enlaces (artemartemartem, jecamartinez), hamburguesa
(mattdavella en mobile, justinjaeger), overlay-fullscreen por categoría (amyosburn,
exportarts). Ninguno usa un mega-menu clásico de e-commerce. La navegación se trata como un
detalle secundario frente al contenido visual.

**6. Una sola página larga, no un sitio de muchas páginas**
Los 6 sitios resuelven casi todo en el home con scroll y anclas internas. Donde hubo evidencia
de transición de página, siempre fue recarga estándar — ninguno usa una librería de transición
tipo Barba.js o un comportamiento SPA confirmado.

## Lo que varía según el objetivo del sitio
- **Landing de conversión** (mattdavella): más estructura "funnel" — credibilidad, conexión
  emocional, autoridad, producto.
- **Portafolio puro** (artemartemartem, amyosburn): casi sin fricción de venta, la galería es el
  argumento.
- **Portafolio + métricas de rendimiento** (justinjaeger, jecamartinez): mezcla estética personal
  con datos duros de resultado.
- **Landing B2B de agencia** (exportarts): la más larga y estructurada de las 6 (15 secciones),
  porque necesita justificar una decisión de compra más grande (contratar producción de video).

## Perfil profesional (Digital Creator)

Digital Creation student at El Bosque University and a Digital Creator specializing in
audiovisual content, editing, post-production, 3D/CGI, and VFX.

I combine tools such as DaVinci Resolve, Blender, and After Effects to create dynamic,
impactful audiovisual pieces, handling various stages of the process—from production and
editing to color grading, 3D modeling, visual effects, and compositing.

My greatest strength lies in my intuition for understanding the rhythm of an audiovisual piece
and transforming an idea into a dynamic, engaging visual experience.

I am currently looking to continue growing in the field of social media content creation and to
develop projects in collaboration with other creators, agencies, and brands.

## Qué NO se puede afirmar con los datos actuales
La matriz tiene `tipografia_principal`, `libreria_animacion` y `libreria_frontend` sin
identificar en casi todos los casos — el análisis automatizado (fetch de HTML) no alcanza para
confirmar fuentes exactas ni librerías de animación sin inspeccionar el CSS/JS cargado en un
navegador real. Si se necesita esa precisión, hay que abrir cada sitio con DevTools y revisarlo
a mano.
