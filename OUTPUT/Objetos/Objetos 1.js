// objeto base: la plantilla de datos que se usa para generar la galería
let heroe = {
    nombre: 'Racho Makuin',
    edad: 38,
    activo: true,
    poderes: ['Velocidad', 'Inteligencia', 'bondad'],
    descripción: "velocidad soy veloz, 1 ganador 42 perdedores yo desayuno perdedores",
    imagen: "https://noticias.coches.com/wp-content/uploads/2020/08/coches.com_quien-es-rayo-mcqueen-cars-10.jpeg"
};

// se reutiliza la misma imagen para las 12 cartas
const imagen = heroe.imagen;

// genera un array de 12 objetos a partir de heroe, variando nombre/edad/estado
// Array.from({length: 12}, callback) crea el array y llama al callback una vez por cada posición
const heroes = Array.from({ length: 12 }, (_, i) => ({
  nombre: `${heroe.nombre} #${i + 1}`,
  edad: heroe.edad + i,
  activo: i % 2 === 0, // alterna activo/inactivo según si i es par o impar
  poderes: heroe.poderes,
  descripción: heroe.descripción,
  imagen
}));

// arma el HTML de una sola carta a partir de un objeto hero
// data-index guarda su posición en el array "heroes" para poder buscarla al hacer click
function cardTemplate(hero, index) {
  return `
    <div class="card" data-index="${index}">
      <img class="card-img" src="${hero.imagen}" alt="${hero.nombre}">
      <h2 class="card-name">${hero.nombre}</h2>
      <p class="card-age">Edad: ${hero.edad}</p>
      <p class="card-status">${hero.activo ? 'Activo' : 'Inactivo'}</p>
      <ul class="card-powers">
        ${hero.poderes.map(poder => `<li>${poder}</li>`).join('')}
      </ul>
      <p class="card-desc">${hero.descripción}</p>
    </div>
  `;
}

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
