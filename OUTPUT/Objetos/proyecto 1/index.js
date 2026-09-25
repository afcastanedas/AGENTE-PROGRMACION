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

// --- Filtro por Veterano / Joven promesa + Equipo + Edad máxima (slider) ---
// Los tres filtros se combinan: cada uno reduce el array que ya dejaron los otros.
const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
const ageSlider = document.getElementById('age-slider');
const ageValue = document.getElementById('age-value');
const teamFilter = document.getElementById('team-filter');
const resetFiltersBtn = document.getElementById('reset-filters');

const filters = {
  all: () => cyclists,
  veteran: () => cyclists.filter((cyclist) => cyclist.isVeteran),
  rookie: () => cyclists.filter((cyclist) => !cyclist.isVeteran)
};

let currentStatusFilter = 'all';

// Equipos únicos tomados de cyclists, no una lista fija: si cambian los datos, el menú se ajusta solo
[...new Set(cyclists.map((cyclist) => cyclist.team))].forEach((team) => {
  const option = document.createElement('option');
  option.value = team;
  option.textContent = team;
  teamFilter.appendChild(option);
});

function applyFilters() {
  const maxAge = Number(ageSlider.value);
  const byStatus = filters[currentStatusFilter]();
  const byTeam = teamFilter.value === 'all'
    ? byStatus
    : byStatus.filter((cyclist) => cyclist.team === teamFilter.value);

  renderizarGaleria(byTeam.filter((cyclist) => cyclist.age <= maxAge));
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    currentStatusFilter = button.dataset.filter;
    applyFilters();
  });
});

ageSlider.addEventListener('input', () => {
  ageValue.textContent = ageSlider.value;
  applyFilters();
});

teamFilter.addEventListener('change', applyFilters);

resetFiltersBtn.addEventListener('click', () => {
  currentStatusFilter = 'all';
  filterButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.filter === 'all'));

  teamFilter.value = 'all';

  ageSlider.value = ageSlider.max;
  ageValue.textContent = ageSlider.value;

  applyFilters();
});
