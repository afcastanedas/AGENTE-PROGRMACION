const gallery = document.getElementById('galeria');
const darkModeToggle = document.getElementById('dark-mode-toggle');

function createCard(cyclist) {
  const card = document.createElement('article');
  card.className = 'card';

  const img = document.createElement('img');
  img.className = 'card-img';
  img.src = cyclist.image;
  img.alt = cyclist.name;

  const name = document.createElement('h2');
  name.className = 'card-name';
  name.textContent = cyclist.name;

  const team = document.createElement('p');
  team.className = 'card-age';
  team.textContent = cyclist.team;

  const age = document.createElement('p');
  age.className = 'card-age';
  age.textContent = cyclist.age + ' años';

  const status = document.createElement('span');
  status.className = 'card-status';
  status.textContent = cyclist.isVeteran ?'Veterano' : 'Joven';

  card.append(img, name, team, age, status);
  return card;
}

// Recibe cualquier array de ciclistas, limpia la galería y la reconstruye
function renderizarGaleria(listaCyclists) {
  gallery.replaceChildren();

  listaCyclists.forEach((cyclist) => {
    gallery.appendChild(createCard(cyclist));
  });
}

renderizarGaleria(cyclists);

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// --- Filtro por Veterano / Joven promesa ---
const filterButtons = document.querySelectorAll('.filter-btn');

const filters = {
  all: () => cyclists,
  veteran: () => cyclists.filter((cyclist) => cyclist.isVeteran),
  rookie: () => cyclists.filter((cyclist) => !cyclist.isVeteran)
};

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    renderizarGaleria(filters[button.dataset.filter]());
  });
});
