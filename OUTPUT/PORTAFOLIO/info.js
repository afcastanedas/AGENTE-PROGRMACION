// Toda la información de perfil del portafolio (texto, no proyectos — esos viven en proyectos.js).
// index.js lee este objeto y rellena la página en cada sección.
let info = {
  name: 'Andrés Castañeda',

  hero: {
    title: 'Audiovisual content. Edited, graded, composited.',
    subtitle: 'Digital Creator — editing, 3D/CGI & VFX'
  },

  about: {
    tagline: 'Digital Creator turning ideas into dynamic, rhythm-driven audiovisual experiences.',
    tools: ['DaVinci Resolve', 'Blender', 'After Effects']
  },

  process: [
    { label: 'Concepting', description: 'Turning an idea into a clear visual direction before touching any footage.' },
    { label: 'Editing', description: 'Cutting for rhythm — pacing the story so it stays dynamic and engaging.' },
    { label: 'Color Grading', description: 'Shaping mood and consistency across every shot.' },
    { label: '3D Modeling', description: 'Building assets and environments in Blender for CGI integration.' },
    { label: 'VFX', description: 'Blending real footage with effects that feel native to the shot.' },
    { label: 'Compositing', description: 'Bringing every layer together into one coherent final piece.' }
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
