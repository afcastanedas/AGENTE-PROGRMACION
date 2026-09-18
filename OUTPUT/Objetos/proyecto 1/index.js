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

cyclists.forEach((cyclist) => {
  gallery.appendChild(createCard(cyclist));
});

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
