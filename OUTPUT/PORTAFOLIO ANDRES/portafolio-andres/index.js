// Marca que hay JS activo: sin esto, las animaciones .reveal no ocultan nada (la página se ve igual)
document.documentElement.classList.add('js');

// Helpers
const pad = (i) => String(i + 1).padStart(2, '0');
// Los textos que empiezan con "[" son placeholders de info.js
const isPlaceholder = (value) => typeof value === 'string' && value.trim().startsWith('[');

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// --- Renderiza toda la información de perfil (info.js) en sus contenedores ---
function renderInfo(data) {
  const [first, ...rest] = data.name.split(' ');
  const last = rest.join(' ');

  document.getElementById('site-initials').textContent = data.name.split(' ').map((w) => w[0]).join('').slice(0, 2);
  document.getElementById('name-first').textContent = first;
  document.getElementById('name-last').textContent = last;
  document.getElementById('about-first').textContent = first;
  document.getElementById('about-last').textContent = last;

  document.getElementById('hero-subtitle').textContent = data.hero.subtitle;
  document.getElementById('hero-title').textContent = data.hero.title;
  document.getElementById('hero-location').textContent = data.hero.location || '';
  document.getElementById('hero-disciplines').textContent = data.hero.disciplines || '';

  document.getElementById('about-tagline').textContent = data.about.tagline;

  const toolTags = document.getElementById('tool-tags');
  toolTags.replaceChildren();
  data.about.tools.forEach((tool, index) => {
    const row = el('div', 'tool-tag');
    row.append(el('span', '', tool), el('span', '', pad(index)));
    toolTags.appendChild(row);
  });

  const processGrid = document.getElementById('process-grid');
  processGrid.replaceChildren();
  data.process.forEach((step, index) => {
    const stepEl = el('div', 'process-step reveal');
    // Numeración "// 01, // 02..." generada acá — no hace falta escribirla en info.js
    stepEl.append(
      el('span', 'process-number', '// ' + pad(index)),
      el('span', 'process-label', step.label),
      el('p', '', step.description)
    );
    processGrid.appendChild(stepEl);
  });

  const experienceList = document.getElementById('experience-list');
  experienceList.replaceChildren();
  data.experience.forEach((job) => {
    const item = el('div', 'experience-item reveal');

    const period = el('span', 'experience-period');
    period.append(el('span', 'accent-dot'), document.createTextNode(job.period));

    const role = el('div', 'experience-role');
    role.append(el('h3', '', job.company), el('span', '', job.role));

    item.append(period, role, el('p', '', job.description));
    experienceList.appendChild(item);
  });

  const testimonialsList = document.getElementById('testimonials-list');
  testimonialsList.replaceChildren();
  data.testimonials.forEach((testimonial) => {
    const item = el('blockquote', 'testimonial reveal');
    const body = el('div', 'testimonial-body');
    body.append(
      el('p', 'testimonial-quote', '“' + testimonial.quote + '”'),
      el('cite', '', testimonial.author + ' — ' + testimonial.role)
    );
    item.append(el('span', 'eyebrow', 'Testimonial'), body);
    testimonialsList.appendChild(item);
  });

  const clientsGrid = document.getElementById('clients-grid');
  clientsGrid.replaceChildren();
  data.clients.forEach((client) => clientsGrid.appendChild(el('div', 'client-name', client)));

  document.getElementById('contact-text').textContent = data.contact.text;
  document.getElementById('contact-cta').href = 'mailto:' + data.contact.email;
  document.getElementById('contact-email').textContent = isPlaceholder(data.contact.email) ? 'Email pendiente' : data.contact.email;

  // Redes: en el footer y en el menú lateral
  const footerSocials = document.getElementById('footer-socials');
  const navSocials = document.getElementById('nav-socials');
  footerSocials.replaceChildren();
  navSocials.replaceChildren();
  data.socials.forEach((social) => {
    const href = social.url || '#';
    const a = el('a', '', social.name + ' ↗');
    a.href = href;
    footerSocials.appendChild(a);
    const b = el('a', '', social.name);
    b.href = href;
    navSocials.appendChild(b);
  });

  document.getElementById('footer-copy').textContent = '© ' + new Date().getFullYear() + ' ' + data.name;
}

renderInfo(info);

// --- Galería de proyectos (proyectos.js) ---
const gallery = document.getElementById('galeria-proyectos');

// Crea <img> o <video> según project.type. Si todavía no hay archivo (src vacío),
// muestra un bloque rayado en vez de una imagen/video roto.
function createProjectMedia(project) {
  if (!project.src) {
    return el('div', 'project-media placeholder', project.type === 'video' ? 'Video pendiente' : 'Imagen pendiente');
  }

  if (project.type === 'video') {
    const video = el('video', 'project-media');
    video.src = project.src;
    if (project.poster) video.poster = project.poster;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    return video;
  }

  const img = el('img', 'project-media');
  img.src = project.src;
  img.alt = project.title;
  return img;
}

function createProjectCard(project, index) {
  const card = el('article', 'project-card reveal');

  const frame = el('div', 'project-frame');
  const tag = el('span', 'project-tag');
  tag.append(el('span', 'accent-dot'), document.createTextNode(project.category));
  frame.append(createProjectMedia(project), tag);

  const info = el('div', 'project-info');
  info.append(el('h3', 'project-title', project.title), el('span', 'project-num', pad(index)));

  // El video se reproduce al pasar el mouse por la card, como vista previa
  card.addEventListener('mouseenter', () => {
    const video = card.querySelector('video');
    if (video) video.play().catch(() => {});
  });
  card.addEventListener('mouseleave', () => {
    const video = card.querySelector('video');
    if (video) video.pause();
  });

  card.addEventListener('click', () => openProject(project));

  card.append(frame, info);
  return card;
}

// Recibe el array, limpia el contenedor y lo reconstruye (lo usan los filtros)
let proyectosVisibles = [];

function renderizarGaleria(listaProyectos) {
  proyectosVisibles = listaProyectos;
  gallery.replaceChildren();
  listaProyectos.forEach((project, index) => gallery.appendChild(createProjectCard(project, index)));
  observeReveals();
}

// --- Filtro de categorías en Work ---
const workFilters = document.getElementById('work-filters');

function renderWorkFilters(listaProyectos) {
  const categories = ['All', ...new Set(listaProyectos.map((project) => project.category))];

  workFilters.replaceChildren();
  categories.forEach((category) => {
    const count = category === 'All'
      ? listaProyectos.length
      : listaProyectos.filter((project) => project.category === category).length;

    const button = el('button', 'filter-btn' + (category === 'All' ? ' active' : ''), category + ' ');
    button.type = 'button';
    button.appendChild(el('sup', '', String(count)));

    button.addEventListener('click', () => {
      workFilters.querySelectorAll('.filter-btn').forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      const filtered = category === 'All'
        ? listaProyectos
        : listaProyectos.filter((project) => project.category === category);
      renderizarGaleria(filtered);
    });

    workFilters.appendChild(button);
  });
}

// --- Menú lateral (slide-out) ---
const NAV_LINKS = [
  ['Work', '#work'], ['Process', '#process'], ['Experience', '#experience'],
  ['Clients', '#clients'], ['About', '#about'], ['Contact', '#contact']
];

const mainNav = document.getElementById('main-nav');
NAV_LINKS.forEach(([label, href], index) => {
  const link = el('a');
  link.href = href;
  link.append(el('span', 'nav-num', pad(index)), el('span', 'nav-label', label));
  mainNav.appendChild(link);
});

const navPanel = document.getElementById('nav-panel');

function openNav() {
  document.body.classList.add('nav-open');
  navPanel.setAttribute('aria-hidden', 'false');
}

function closeNav() {
  document.body.classList.remove('nav-open');
  navPanel.setAttribute('aria-hidden', 'true');
}

document.getElementById('nav-toggle').addEventListener('click', openNav);
document.getElementById('nav-close').addEventListener('click', closeNav);
document.getElementById('nav-overlay').addEventListener('click', closeNav);
// Cerrar el menú al elegir un enlace
mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (document.body.classList.contains('project-open')) closeProject();
  else closeNav();
});

// --- Animación de entrada al hacer scroll ---
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

function observeReveals() {
  document.querySelectorAll('.reveal:not(.is-visible)').forEach((node, index) => {
    // Pequeño escalonado entre elementos vecinos
    node.style.transitionDelay = (index % 4) * 0.07 + 's';
    revealObserver.observe(node);
  });
}

// --- Detalle de proyecto (se abre al hacer click en una card) ---
const modal = document.getElementById('project-modal');
const modalScroll = document.getElementById('pm-scroll');
let proyectoActual = 0;

function createDetailMedia(project) {
  if (!project.src) return createProjectMedia(project);
  if (project.type === 'video') {
    const video = el('video', 'project-media');
    video.src = project.src;
    if (project.poster) video.poster = project.poster;
    video.controls = true;
    video.playsInline = true;
    return video;
  }
  const img = el('img', 'project-media');
  img.src = project.src;
  img.alt = project.title;
  return img;
}

function renderProject(index) {
  const lista = proyectosVisibles.length ? proyectosVisibles : projects;
  proyectoActual = (index + lista.length) % lista.length;
  const project = lista[proyectoActual];
  const siguiente = lista[(proyectoActual + 1) % lista.length];

  document.getElementById('pm-counter').textContent = 'Project ' + pad(proyectoActual) + ' / ' + String(lista.length).padStart(2, '0');

  const category = document.getElementById('pm-category');
  category.replaceChildren(el('span', 'accent-dot'), document.createTextNode(project.category));
  document.getElementById('pm-title').textContent = project.title;

  document.getElementById('pm-media').replaceChildren(createDetailMedia(project));

  const meta = document.getElementById('pm-meta');
  meta.replaceChildren();
  [
    ['Client', project.client],
    ['Year', project.year],
    ['Category', project.category],
    ['Role', project.role],
    ['Tools', (project.tools || []).join(' · ')]
  ].forEach(([label, value]) => {
    if (!value) return;
    const row = el('div', 'pm-meta-row');
    row.append(el('dt', '', label), el('dd', '', value));
    meta.appendChild(row);
  });

  const description = document.getElementById('pm-description');
  description.replaceChildren();
  (project.description || []).forEach((paragraph) => description.appendChild(el('p', '', paragraph)));

  // Galería extra: solo se muestra si el proyecto tiene imágenes en project.gallery
  const galleryEl = document.getElementById('pm-gallery');
  galleryEl.replaceChildren();
  const extras = project.gallery || [];
  galleryEl.hidden = extras.length === 0;
  extras.forEach((src) => {
    const img = el('img', 'pm-gallery-item');
    img.src = src;
    img.alt = project.title;
    img.loading = 'lazy';
    galleryEl.appendChild(img);
  });

  document.getElementById('pm-next-title').textContent = siguiente.title;
  modalScroll.scrollTop = 0;
}

function openProject(project) {
  const lista = proyectosVisibles.length ? proyectosVisibles : projects;
  renderProject(Math.max(0, lista.indexOf(project)));
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('project-open');
}

function closeProject() {
  document.body.classList.remove('project-open');
  modal.setAttribute('aria-hidden', 'true');
  // Pausa el video si quedó reproduciendo
  const video = modal.querySelector('video');
  if (video) video.pause();
}

document.getElementById('pm-close').addEventListener('click', closeProject);
document.getElementById('pm-prev').addEventListener('click', () => renderProject(proyectoActual - 1));
document.getElementById('pm-next').addEventListener('click', () => renderProject(proyectoActual + 1));
document.getElementById('pm-next-project').addEventListener('click', () => renderProject(proyectoActual + 1));
document.addEventListener('keydown', (event) => {
  if (!document.body.classList.contains('project-open')) return;
  if (event.key === 'ArrowRight') renderProject(proyectoActual + 1);
  if (event.key === 'ArrowLeft') renderProject(proyectoActual - 1);
});

renderWorkFilters(projects);
renderizarGaleria(projects);
