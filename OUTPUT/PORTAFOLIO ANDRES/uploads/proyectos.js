// PLACEHOLDER: estos proyectos no son reales. Reemplaza cada objeto con tus proyectos reales.
//
// Esquema de cada proyecto:
//   id        — número único
//   title     — nombre del proyecto
//   category  — 'Editing' | 'VFX' | '3D/CGI' | 'Color' (o la que uses)
//   type      — 'image' | 'video'
//   src       — ruta al archivo final. Pon tus archivos reales en la carpeta "media/" junto a
//               este proyectos.js, y referencia la ruta relativa, ej: 'PORTAFOLIO/media/proyecto1.mp4'
//   poster    — (solo para type: 'video') imagen de portada que se ve antes de reproducir.
//               Si la dejas vacía, el navegador usa el primer frame del video.
//   --- Detalle (se ve al hacer click en la card) ---
//   client      — cliente o "Personal project"
//   year        — año
//   role        — qué hiciste tú en el proyecto
//   tools       — lista de programas usados
//   description — 1-3 párrafos (array de strings)
//   gallery     — imágenes extra (array de rutas). Si está vacío se muestran 2 placeholders.
//   Los textos entre [corchetes] son placeholders: reemplázalos con la info real.
let projects = [
  { id: 5, title: 'ADVERTISING RENDERS FOR XTRM SYSTEMS', category: '3D/CGI', type: 'image', src: 'PORTAFOLIO/media/renders-xtrmsystems.png', poster: '',
    client: 'XTRM SYSTEMS', year: '[Año]', role: '3D modeling, texturing, lighting, render & key visual design',
    tools: ['Blender', 'Photoshop'],
    description: [
      "Advertising renders for XTRM T6, XTRM SYSTEMS' anti-puncture tire sealant built for trucks, trailers, 4x4s and heavy machinery.",
      "The product was modeled and placed in a dark, wet asphalt scene surrounded by tires, scattered nails and low-lying smoke, so the setting itself shows the problem the product solves. The final key visual pairs the render with the campaign line \"Protección extrema para trabajos extremos\" and the available sizes: 5, 10 and 15 kg."
    ],
    gallery: [] },
  { id: 2, title: 'OFF THE TRACK- 3D ANIMATION PROJECT', category: '3D/CGI', type: 'image', src: 'PORTAFOLIO/media/off-the-track.png', poster: '',
    client: '[Cliente]', year: '[Año]', role: '3D modeling, livery design, environment, lighting & animation',
    tools: ['Blender'],
    description: [
      "Off the Track is a 3D animation project set in the world of racing, built around Chris Gearson, the #22 Fiber Fuel truck, and his team hauler.",
      "The scene takes place in the pit area of a speedway. Grandstands, catch fences and Piston Cup liveries were built to place the characters inside a believable race-day environment, from vehicle and character modeling through lighting and animation."
    ],
    gallery: [] },
  { id: 3, title: 'Juan Pablo Montoya Cars version FAN ART', category: '3D/CGI', type: 'image', src: 'PORTAFOLIO/media/cars-3d-fan-art.png', poster: '',
    client: 'Personal project', year: '[Año]', role: '3D modeling, livery design, lighting & render',
    tools: ['Blender'],
    description: [
      "A fan-art tribute to Colombian driver Juan Pablo Montoya, reimagined in the style of the Cars universe.",
      "The single-seater was modeled and liveried in the yellow, blue and red of the Colombian flag, with his name across the rear wing. It is shown from behind in a dark studio setup, with low-key lighting that picks out the bodywork and the wide rear tires."
    ],
    gallery: [] },
  { id: 4, title: 'Renders and key visual designs for Ofero ft. XTRM SYSTEMS', category: '3D/CGI', type: 'image', src: 'PORTAFOLIO/media/ofero-xtrm-systems.png', poster: '',
    client: 'Ofero ft. XTRM SYSTEMS', year: '[Año]', role: '3D modeling, packaging render & key visual design',
    tools: ['Blender', 'Photoshop'],
    description: [
      "Product renders and key visual for XTRM T3, a preventive tire sealant presented by Ofero together with XTRM SYSTEMS.",
      "The pouch packaging was modeled and rendered in front of a large tire and drifting smoke on a dark background. Around it, the layout organizes the product's main benefits (punctures up to 4 mm, ammonia-free, non-toxic, for tires with or without inner tubes) under the headline \"Protección total contra pinchazos\"."
    ],
    gallery: [] }
];
