// --- Renderiza toda la información de perfil (info.js) en sus contenedores ---
function renderInfo(data) {
  document.getElementById('site-name').textContent = data.name;

  document.getElementById('hero-title').textContent = data.hero.title;
  document.getElementById('hero-subtitle').textContent = data.hero.subtitle;

  document.getElementById('about-tagline').textContent = data.about.tagline;

  const toolTags = document.getElementById('tool-tags');
  toolTags.replaceChildren();
  data.about.tools.forEach((tool) => {
    const tag = document.createElement('span');
    tag.className = 'tool-tag';
    tag.textContent = tool;
    toolTags.appendChild(tag);
  });

  const processGrid = document.getElementById('process-grid');
  processGrid.replaceChildren();
  data.process.forEach((step, index) => {
    const stepEl = document.createElement('div');
    stepEl.className = 'process-step';

    const number = document.createElement('span');
    number.className = 'process-number';
    // Numeración tipo "01, 02, 03...", generada acá — no hace falta escribirla a mano en info.js
    number.textContent = String(index + 1).padStart(2, '0');

    const label = document.createElement('span');
    label.className = 'process-label';
    label.textContent = step.label;

    const description = document.createElement('p');
    description.textContent = step.description;

    stepEl.append(number, label, description);
    processGrid.appendChild(stepEl);
  });

  const experienceList = document.getElementById('experience-list');
  experienceList.replaceChildren();
  data.experience.forEach((job) => {
    const item = document.createElement('div');
    item.className = 'experience-item';

    const role = document.createElement('h3');
    role.textContent = job.role + ' — ' + job.company;

    const period = document.createElement('span');
    period.className = 'experience-period';
    period.textContent = job.period;

    const description = document.createElement('p');
    description.textContent = job.description;

    item.append(role, period, description);
    experienceList.appendChild(item);
  });

  const testimonialsList = document.getElementById('testimonials-list');
  testimonialsList.replaceChildren();
  data.testimonials.forEach((testimonial) => {
    const item = document.createElement('blockquote');
    item.className = 'testimonial';

    const quote = document.createElement('p');
    quote.className = 'testimonial-quote';
    quote.textContent = '“' + testimonial.quote + '”';

    const author = document.createElement('cite');
    author.textContent = testimonial.author + ' — ' + testimonial.role;

    item.append(quote, author);
    testimonialsList.appendChild(item);
  });

  const clientsGrid = document.getElementById('clients-grid');
  clientsGrid.replaceChildren();
  data.clients.forEach((client) => {
    const item = document.createElement('span');
    item.className = 'client-name';
    item.textContent = client;
    clientsGrid.appendChild(item);
  });

  const awardsList = document.getElementById('awards-list');
  awardsList.replaceChildren();
  data.awards.forEach((award) => {
    const item = document.createElement('div');
    item.className = 'award-item';

    const title = document.createElement('span');
    title.textContent = award.title;

    const year = document.createElement('span');
    year.className = 'award-year';
    year.textContent = award.year;

    item.append(title, year);
    awardsList.appendChild(item);
  });

  document.getElementById('contact-text').textContent = data.contact.text;
  const contactCta = document.getElementById('contact-cta');
  contactCta.href = 'mailto:' + data.contact.email;

  const footerSocials = document.getElementById('footer-socials');
  footerSocials.textContent = data.socials.map((social) => social.name).join(' · ');
}

renderInfo(info);

const gallery = document.getElementById('galeria-proyectos');

// Crea <img> o <video> según project.type, para que data.js pueda mezclar imágenes y videos.
// Si todavía no hay archivo (src vacío, caso de los placeholders), muestra un bloque visible
// en vez de una imagen/video rota o un hueco en blanco.
function createProjectMedia(project) {
  if (!project.src) {
    const placeholder = document.createElement('div');
    placeholder.className = 'project-media placeholder';
    placeholder.textContent = project.type === 'video' ? 'Video pendiente' : 'Imagen pendiente';
    return placeholder;
  }

  if (project.type === 'video') {
    const video = document.createElement('video');
    video.className = 'project-media';
    video.src = project.src || '';
    if (project.poster) video.poster = project.poster;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    // Se reproduce al pasar el mouse, como vista previa; controls completos quedan para abrir el proyecto
    video.addEventListener('mouseenter', () => video.play());
    video.addEventListener('mouseleave', () => video.pause());
    return video;
  }

  const img = document.createElement('img');
  img.className = 'project-media';
  img.src = project.src || '';
  img.alt = project.title;
  return img;
}

function createProjectCard(project) {
  const card = document.createElement('article');
  card.className = 'project-card';

  const media = createProjectMedia(project);

  const info = document.createElement('div');
  info.className = 'project-info';

  const category = document.createElement('p');
  category.className = 'project-category';
  category.textContent = project.category;

  const title = document.createElement('p');
  title.className = 'project-title';
  title.textContent = project.title;

  info.append(category, title);
  card.append(media, info);
  return card;
}

// Mismo patrón que renderizarGaleria(cyclists) del proyecto de ciclistas: recibe el array,
// limpia el contenedor y lo reconstruye. Reutilizable si luego agregas filtros por categoría.
function renderizarGaleria(listaProyectos) {
  gallery.replaceChildren();
  listaProyectos.forEach((project) => gallery.appendChild(createProjectCard(project)));
}

// --- Filtro de categorías en Work, como el portafolio de designbybrandin.com ---
const workFilters = document.getElementById('work-filters');

function renderWorkFilters(listaProyectos) {
  const categories = ['All', ...new Set(listaProyectos.map((project) => project.category))];

  workFilters.replaceChildren();
  categories.forEach((category) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'filter-btn' + (category === 'All' ? ' active' : '');
    button.textContent = category;
    button.dataset.category = category;

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

renderWorkFilters(projects);
renderizarGaleria(projects);

// --- Nav overlay a pantalla completa (patrón de amyosburn.com) ---
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navOverlay = document.getElementById('nav-overlay');
const mainNav = document.getElementById('main-nav');

function openNav() {
  navOverlay.classList.remove('hidden');
  // requestAnimationFrame para que el navegador registre "hidden" quitado antes de animar
  requestAnimationFrame(() => navOverlay.classList.add('nav-open'));
}

function closeNav() {
  navOverlay.classList.remove('nav-open');
  setTimeout(() => navOverlay.classList.add('hidden'), 350); // espera a que termine la transición CSS
}

navToggle.addEventListener('click', openNav);
navClose.addEventListener('click', closeNav);

// Cerrar el menú al elegir un enlace, para no dejarlo abierto tras navegar
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeNav);
});
