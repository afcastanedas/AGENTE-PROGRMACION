# Análisis — exportarts.studio

**URL:** https://www.exportarts.studio/

## Contenido y enfoque
Sitio (en alemán) de Exportarts Studio, agencia de producción de video especializada en
contenido "vertical-first" (formato vertical, pensado para redes). Posiciona su trabajo como
superior al estándar convencional, con foco en estrategia, ejecución multiplataforma y
resultados medibles.

## Público objetivo
Empresas B2B/B2C medianas y grandes (energía solar, construcción, retail, automoción, entre
otras) con presupuesto para producción premium y que buscan diferenciarse visualmente.

## Estructura
Home de una sola página, larga: hero ("Vertical first") → carrusel de logos de clientes
(Lichtwunder, Schüco, Wicker, Gelb Solar) → sección "about" con videógrafo (Jonas Müller) →
descripción de servicios → carrusel de 7 especializaciones (Post Production, Video Ads,
Scripting, etc.) → seis bloques de formato de contenido, cada uno con su propia métrica de
desempeño (Branding Content, High Quality Edits, UGC Content, Testimonials, Long Form Content,
Drone Shots) → segundo carrusel de 8 servicios detallados → banner cinemático → CTA final
("Mach's besser...") → sección de contacto personal (Tim Selzer) con formulario y teléfono.
Navegación con enlaces ancla a cada bloque de servicio (#branding, #edits, #ugc, etc.) y botón
de CTA ("Anfragen").

## UX
Cada formato de contenido se respalda con una métrica concreta (seguidores, engagement, shares,
watchtime), dando prueba social cuantificada servicio por servicio, en vez de un solo bloque
genérico de testimonios. El cierre combina CTA de formulario y contacto telefónico directo.

## UI
Estética cinematográfica y minimalista, con fotografía profesional como elemento dominante,
paleta neutra con acentos. No se pudo confirmar la tipografía específica desde el HTML.

## Plataforma
Confirmado **Prismic** (CMS headless), por URLs de assets bajo `exportarts-studio.cdn.prismic.io`
con parámetros de procesamiento de imagen (`rect`, `w`, `h`, `auto=format,compress`). No se
detectaron librerías de frontend o animación específicas. La navegación es de página única con
anclas internas; no hay evidencia de comportamiento SPA ni de librerías de transición como
Barba.js.

## Nota
El footer no incluye redes sociales ni email visible — solo enlace telefónico y páginas legales
(Impressum, Datenschutz), lo cual limita las vías de contacto o seguimiento fuera del formulario.
