// objeto inicial: la plantilla de datos que se usa como base antes de construir el array
let ciclista = {
    nombre: 'Ciclista de Ruta',
    edad: 24,
    equipo: 'Equipo Andes',
    veterano: false,
    habilidades: ['Montaña', 'Sprint'],
    descripción: "corredor de ruta, especialista en etapas exigentes",
    imagen: 'https://i.imgur.com/J6lJgk2.jpeg'
};

// las 8 fotos usadas para las cartas: nombre, equipo, edad aproximada a 2026 (según fecha de
// nacimiento pública de cada corredor) y si se le considera "joven promesa" o no.
// "archivo" apunta a Imgur (URLs directas) para que la imagen cargue igual en CodePen u otra plataforma externa.
const fotos = [
  { nombre: 'Egan Bernal', archivo: 'https://i.imgur.com/J6lJgk2.jpeg', equipo: 'Ineos Grenadiers', edad: 29, veterano: true },
  { nombre: 'Julian Alaphilippe', archivo: 'https://i.imgur.com/TmbufBj.jpeg', equipo: 'Tudor', edad: 34, veterano: true },
  { nombre: 'Tadej Pogacar', archivo: 'https://i.imgur.com/ANYVFDM.jpeg', equipo: 'UAE', edad: 27, veterano: true },
  { nombre: 'Tom Pidcock', archivo: 'https://i.imgur.com/tjuCDBV.jpeg', equipo: 'Q36.5', edad: 26, veterano: true },
  { nombre: 'Richard Carapaz', archivo: 'https://i.imgur.com/Cvib7ts.jpeg', equipo: 'EF', edad: 33, veterano: true },
  { nombre: 'Felix Gall', archivo: 'https://i.imgur.com/hzFu4nZ.jpeg', equipo: 'Decathlon', edad: 28, veterano: true },
  { nombre: 'Jasper Philipsen', archivo: 'https://i.imgur.com/92h79OV.jpeg', equipo: 'Alpecin', edad: 28, veterano: true },
  { nombre: 'Isaac del Toro', archivo: 'https://i.imgur.com/eqL5YoM.jpeg', equipo: 'UAE', edad: 22, veterano: false }
];

const habilidadesPosibles = ['Montaña', 'Media montaña', 'Sprint', 'Aceleración', 'Contrarreloj', 'Pavé'];

// genera las 8 cartas, una por cada foto disponible, variando solo las habilidades
// Array.from({length: fotos.length}, callback) crea el array y llama al callback una vez por cada posición
const heroes = Array.from({ length: fotos.length }, (_, i) => ({
  nombre: fotos[i].nombre,
  edad: fotos[i].edad,
  equipo: fotos[i].equipo,
  veterano: fotos[i].veterano,
  habilidades: [habilidadesPosibles[i % habilidadesPosibles.length], habilidadesPosibles[(i + 2) % habilidadesPosibles.length]],
  descripción: ciclista.descripción,
  imagen: fotos[i].archivo
}));

// arma el HTML de una sola carta a partir de un objeto hero
// data-index guarda su posición en el array "heroes" para poder buscarla al hacer click
function cardTemplate(hero, index) {
  return `
    <div class="card" data-index="${index}">
      <div class="card-shine"></div>
      <img class="card-img" src="${hero.imagen}" alt="${hero.nombre}">
      <h2 class="card-name">${hero.nombre}</h2>
      <p class="card-age">Edad: ${hero.edad}${hero.veterano ? ' · Veterano' : ' · Joven promesa'}</p>
      <p class="card-status">${hero.equipo}</p>
      <ul class="card-powers">
        ${hero.habilidades.map(habilidad => `<li>${habilidad}</li>`).join('')}
      </ul>
      <p class="card-desc">${hero.descripción}</p>
    </div>
  `;
}

// inclina la carta en 3D según la posición del mouse y mueve el brillo holográfico
// getBoundingClientRect da la posición/tamaño real de la carta para calcular el punto relativo del mouse
function applyTilt(card, event) {
  const rect = card.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;  // 0 a 1, de izquierda a derecha
  const y = (event.clientY - rect.top) / rect.height;  // 0 a 1, de arriba a abajo

  const rotateY = (x - 0.5) * 24; // grados de giro horizontal
  const rotateX = (0.5 - y) * 24; // grados de giro vertical

  card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;

  const shine = card.querySelector('.card-shine');
  if (shine) {
    shine.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.35), transparent 55%)`;
  }
}

// quita la inclinación y el brillo cuando el mouse sale de la carta
function resetTilt(card) {
  card.style.transform = '';
  const shine = card.querySelector('.card-shine');
  if (shine) shine.style.background = 'transparent';
}

// delegación de eventos para el tilt: un solo listener en #galeria escucha el movimiento del mouse sobre cualquier carta
document.getElementById('galeria').addEventListener('mousemove', (event) => {
  const card = event.target.closest('.card');
  if (!card) return;
  applyTilt(card, event);
});

// captura en fase "captura" (tercer argumento true) porque mouseleave no burbujea:
// así se detecta cuando el mouse sale de la galería completa y se resetean todas las cartas
document.getElementById('galeria').addEventListener('mouseleave', () => {
  document.querySelectorAll('#galeria .card').forEach(resetTilt);
}, true);

// recibe un array de heroes, genera el HTML de cada carta y lo inserta en #galeria
function renderGallery(lista) {
  const galeria = document.getElementById('galeria');
  galeria.innerHTML = lista.map(cardTemplate).join('');
}

renderGallery(heroes);

// abre el modal con la info completa del hero en la posición "index" del array
function openModal(index) {
  const hero = heroes[index];
  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = cardTemplate(hero, index) + `<button id="modal-close">Cerrar</button>`;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}

// delegación de eventos: un solo listener en #galeria en vez de uno por carta
// closest('.card') encuentra la carta más cercana al elemento donde se hizo click
document.getElementById('galeria').addEventListener('click', (event) => {
  const card = event.target.closest('.card');
  if (!card) return;
  openModal(Number(card.dataset.index));
});

// cierra el modal al hacer click en el botón "Cerrar" o fuera de la carta (en el overlay)
document.getElementById('modal-overlay').addEventListener('click', (event) => {
  if (event.target.id === 'modal-overlay' || event.target.id === 'modal-close') {
    closeModal();
  }
});

// ajusta el ancho de todas las cartas según el tamaño actual de la ventana
function resizeCards() {
  const cards = document.querySelectorAll('.card');
  let width = '280px'; // ancho por defecto (pantallas grandes)

  if (window.innerWidth < 400) {
    width = '90vw'; // celulares: casi todo el ancho de pantalla
  } else if (window.innerWidth < 800) {
    width = '320px'; // tablets
  }

  cards.forEach(card => {
    card.style.width = width;
  });
}

resizeCards(); // se ejecuta una vez al cargar la página
window.addEventListener('resize', resizeCards); // y cada vez que cambia el tamaño de la ventana

// botón de modo oscuro: alterna la clase dark-mode en <body>
// los estilos de esa clase están definidos en style.css
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkModeToggle.textContent = document.body.classList.contains('dark-mode')
    ? 'Modo claro'
    : 'Modo oscuro';
});
