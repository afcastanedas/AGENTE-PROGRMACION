# Análisis — designbybrandin.com

**URL:** https://designbybrandin.com/

## Contenido y enfoque
Portafolio de Brandin Hall, director creativo especializado en branding, diseño web e
integración de IA en flujos de trabajo creativos. Posiciona sus servicios (consultoría de
marca, diseño digital, desarrollo web) con un enfoque narrativo centrado en encontrar el "por
qué" de cada marca, en contraste explícito con "el ruido genérico de la IA".

## Público objetivo
Founders y equipos de liderazgo de startups tech y empresas en crecimiento que buscan
reposicionamiento de marca — posicionamiento premium, no un servicio de diseño genérico.

## Estructura
Home larga de una sola página, con 8 bloques: hero (nombre, ubicación, 15+ años de experiencia)
→ portafolio filtrable por categoría (All, Branding, Graphic Design, Web Design; 6 proyectos
destacados) → "My Expertise" con 5 áreas numeradas (AI, Creative Leadership, Branding, Web
Design & Development, Digital Creative) → "My Experience" con 3 roles laborales y logros
cuantificados → cita/testimonio destacado → "Clients" con 85+ marcas agrupadas en 8 industrias
y estadísticas (85+ marcas, 18+ sectores, 500+ deployments) → premios y reconocimientos (Clutch,
Hamilton Spectator) → about narrativo de la trayectoria del autor. Navegación tipo hamburguesa
con panel lateral (`#slide-out-widget-area`), enlaces: Work, Expertise, Experience, Clients,
Awards, About, Connect.

## UX
Construye autoridad en capas: cifras de clientes/industrias, premios externos, testimonios y
experiencia laboral con logros concretos — varias formas de prueba social combinadas, no solo
una. El filtro de portafolio por categoría ayuda a un cliente a ver solo el tipo de trabajo
relevante para su industria.

## UI
Estética dark-first (fondo oscuro, acentos claros), minimalista, con fuerte jerarquía
tipográfica. El logo tiene versiones dark/light. No se pudo confirmar la tipografía exacta.

## Plataforma
Confirmado **WordPress**, por URLs de medios bajo `designbybrandin.com/wp-content/uploads/` y
estructura de posts tipo `/portfolio/armada/`. No se identificaron librerías de frontend ni de
animación con certeza (sin evidencia de React, Vue, GSAP o AOS). Se detectó una clase
`ajax-content-wrap`, que sugiere algún tipo de carga de contenido vía AJAX, pero no hay
evidencia suficiente para confirmar si implica transiciones de página reales — se deja como no
identificado en vez de afirmarlo.

## Nota
Según el análisis automatizado, las imágenes del portafolio aparecen como placeholders SVG sin
cargar — si esto se confirma visualmente, sería un problema real para un sitio cuyo argumento
principal es mostrar trabajo visual.
