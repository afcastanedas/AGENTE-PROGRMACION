// Toda la información de perfil del portafolio (texto, no proyectos — esos viven en proyectos.js).
// index.js lee este objeto y rellena la página en cada sección.
let info = {
  name: 'Andrés Castañeda',

  hero: {
    title: 'Audiovisual content. Edited, graded, composited.',
    subtitle: 'Digital Creator — editing, 3D/CGI & VFX',
    location: 'Bogotá, Colombia',
    disciplines: 'Videography · 3D/CGI · VFX · Post-production · Compositing'
  },

  about: {
    tagline: 'Digital Creator turning ideas into dynamic, rhythm-driven audiovisual experiences.',
    tools: ['DaVinci Resolve', 'Blender', 'After Effects', 'Photoshop', 'Figma']
  },

  process: [
    { label: 'Concepting', description: 'Turning an idea into a clear visual direction before touching any footage.' },
    { label: 'Editing', description: 'Cutting for rhythm — pacing the story so it stays dynamic and engaging.' },
    { label: 'Color Grading', description: 'Shaping mood and consistency across every shot.' },
    { label: '3D Modeling', description: 'Building assets and environments in Blender for CGI integration.' },
    { label: 'VFX', description: 'Blending real footage with effects that feel native to the shot.' },
    { label: 'Compositing', description: 'Bringing every layer together into one coherent final piece.' }
  ],

  // PLACEHOLDER: ninguno de estos clientes es real. Reemplaza cada uno cuando tengas clientes reales.
  clients: [
    '[Client 1]', '[Client 2]', '[Client 3]', '[Client 4]',
    '[Client 5]', '[Client 6]', '[Client 7]', '[Client 8]'
  ],

  // PLACEHOLDER: testimonio de ejemplo, no es una cita real de nadie.
  testimonials: [
    {
      quote: "Andrés elevated the visual quality and impact of our brand's advertising.",
      author: 'Ricardo Vanegas',
      role: 'Sales Director of XTRM SYSTEMS'
    }
  ],

  // PLACEHOLDER: ningún premio es real todavía.
  awards: [
    { title: '[Nombre del reconocimiento — reemplazar]', year: '[Año]' }
  ],

  // PLACEHOLDER: experiencia de ejemplo, reemplaza con tus roles reales.
  experience: [
    {
      role: 'Graphic Designer & Filmmaker',
      company: 'XTRM SYSTEMS',
      period: '2026 – Actual',
      description: 'I am responsible for creating audiovisual content for advertising and social media.'
    }
  ],

  contact: {
    text: "I am currently looking to continue growing in the field of social media content creation and to develop projects in collaboration with other creators, agencies, and brands.",
    // TODO: reemplazar con tu email real
    email: '[tu-email]'
  },

  // TODO: reemplazar con tus redes reales (deja url: '' si todavía no la tienes)
  socials: [
    { name: 'Instagram', url: '' },
    { name: 'LinkedIn', url: '' },
    { name: 'Vimeo/YouTube', url: '' }
  ]
};
