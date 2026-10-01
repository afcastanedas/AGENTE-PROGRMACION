# Análisis — jecamartinez.com

**URL:** https://jecamartinez.com/

## Nota técnica antes del resumen
El fetch estándar solo devolvió el `<title>` porque el sitio renderiza todo su contenido con
JavaScript (no hay HTML estático). Tuve que renderizarlo con Chrome sin interfaz para ver el
DOM real. Ese DOM reveló algo relevante: **el sitio no usa ninguna etiqueta semántica de HTML5**
(ni `<header>`, ni `<nav>`, ni `<footer>`) — todo el contenido vive en 10 `<section>` genéricas
con clases ofuscadas, dentro de un único `<main>`. El XML de este análisis representa la
estructura de **contenido**, no etiquetas que realmente existan en el código.

## Contenido y enfoque
Portafolio de Jeca Martinez, creadora de contenido full-time para la agencia "We Are Social",
trabajando con marcas grandes de entretenimiento, lifestyle, belleza, retail, tech, mascotas,
viajes y temas humanos. Más de 10 años de experiencia, con formación en animación, ilustración,
video, fotografía y diseño gráfico.

## Público objetivo
Marcas y agencias que buscan contenido de tipo UGC/influencer para campañas en redes sociales,
en múltiples verticales (no un nicho único).

## Estructura
Página única con scroll: hero con tono desenfadado ("Welcome to the Whimsical World...") →
about (bio, software que usa: Adobe Creative Suite, Capcut, Canva) → portafolio de
colaboraciones con marcas, cada video con sus métricas de desempeño (vistas, likes) → portafolio
categorizado por tema (Travel, Local Experiences, Parties & Crafts, Pets, Fashion & Beauty) →
"content checklist" con sus valores (Authentic, Story-driven, Engaging, Whimsical) → CTA de
contacto ("Ready to collab?") con email y redes. Navegación simple de 3 enlaces: about me,
portfolio, contact.

## UX
Doble forma de evaluar el trabajo: por marca/resultado (métricas reales de views/likes) y por
categoría temática — útil para que una marca prospecto vea tanto el desempeño como el encaje
con su industria.

## UI
Estética "whimsical"/desenfadada, con emojis y tono conversacional. Paleta pastel: fondo blanco,
secciones en tono lavanda grisáceo (rgb 132,124,140) y crema cálido (rgb 238,236,222).
Tipografía no identificable: el sitio carga fuentes con nombres ofuscados por el builder.

## Plataforma
Confirmado **Canva Websites** (la función de sitios web de Canva) — evidencia directa en el
JavaScript: variables `window.__canva_website_bootstrap__` y `window.__canva_public_path__`,
y metadata de build con `"stack":"export_website"`. No es React/Vue genérico; usa el motor
propio de Canva. No se identificó una librería pública de animación (AOS, GSAP), aunque cada
sección tiene `data-scroll-ready="true"`, lo que sugiere animación de scroll propia del motor
de Canva. Es página única con scroll/anclas, sin evidencia de rutas múltiples tipo SPA.
