const management = document.getElementById('gestion');
const sidebarItems = document.querySelectorAll('.sidebar-item');

// El login vive en login.js. Deja lista la variable global isAuthenticated
// (declarada en storage.js), que saveCyclists() y las funciones de abajo revisan.

// action = { label, onClick }: agrega una columna con un botón por fila (opcional)
function createRow(cyclist, action) {
  const row = document.createElement('tr');

  [cyclist.name, cyclist.team, cyclist.age, cyclist.isVeteran ? 'Sí' : 'No'].forEach((value) => {
    const cell = document.createElement('td');
    cell.textContent = value;
    row.appendChild(cell);
  });

  if (action) {
    const cell = document.createElement('td');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'row-btn';
    button.textContent = action.label;
    button.addEventListener('click', action.onClick);
    cell.appendChild(button);
    row.appendChild(cell);
  }

  return row;
}

function createTable(list, action = null) {
  const table = document.createElement('table');

  const head = document.createElement('tr');
  const titles = ['Nombre', 'Equipo', 'Edad', 'Veterano'];
  if (action) titles.push('');
  titles.forEach((title) => {
    const th = document.createElement('th');
    th.textContent = title;
    head.appendChild(th);
  });
  table.appendChild(head);

  list.forEach((cyclist) => {
    const rowAction = action ? { label: action.label, onClick: () => action.onClick(cyclist.id) } : null;
    table.appendChild(createRow(cyclist, rowAction));
  });
  return table;
}

// id que se asignará al próximo ciclista creado; arranca después del id más alto existente
let nextId = cyclists.reduce((max, cyclist) => Math.max(max, cyclist.id), 0) + 1;

function deleteCyclist(id) {
  if (!isAuthenticated) return;

  const cyclist = cyclists.find((c) => c.id === id);
  if (!cyclist) return;
  if (!confirm('¿Eliminar a ' + cyclist.name + '?')) return;

  cyclists = cyclists.filter((c) => c.id !== id);
  saveCyclists();
  showView('delete');
}

function createField(labelText, input) {
  const label = document.createElement('label');
  label.textContent = labelText;
  label.appendChild(input);
  return label;
}

function createInput(type, name) {
  const input = document.createElement('input');
  input.type = type;
  input.name = name;
  return input;
}

// initial: ciclista con el que se rellena el formulario (vacío al crear)
// onSubmit recibe el objeto armado con los valores del formulario
function createForm({ initial = null, submitLabel, onSubmit }) {
  const form = document.createElement('form');
  form.id = 'cyclist-form';

  const nameInput = createInput('text', 'name');
  const imageInput = createInput('url', 'image');
  const teamInput = createInput('text', 'team');
  const ageInput = createInput('number', 'age');
  const veteranInput = createInput('checkbox', 'isVeteran');

  ageInput.min = 16;
  [nameInput, imageInput, teamInput, ageInput].forEach((input) => {
    input.required = true;
  });

  if (initial) {
    nameInput.value = initial.name;
    imageInput.value = initial.image;
    teamInput.value = initial.team;
    ageInput.value = initial.age;
    veteranInput.checked = initial.isVeteran;
  }

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.textContent = submitLabel;

  form.append(
    createField('Nombre', nameInput),
    createField('URL de la imagen', imageInput),
    createField('Equipo', teamInput),
    createField('Edad', ageInput),
    createField('Veterano', veteranInput),
    submit
  );

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!isAuthenticated) return;

    onSubmit({
      name: nameInput.value.trim(),
      image: imageInput.value.trim(),
      team: teamInput.value.trim(),
      age: Number(ageInput.value),
      isVeteran: veteranInput.checked
    });
  });

  return form;
}

function createCreateView() {
  return createForm({
    submitLabel: 'Aceptar y agregar',
    onSubmit: (data) => {
      cyclists.push({ id: nextId, ...data });
      nextId += 1;
      saveCyclists();
      showView('list-all');
    }
  });
}

// paso 2 de Actualizar: formulario rellenado con los datos del ciclista elegido
function showEditForm(id) {
  const cyclist = cyclists.find((c) => c.id === id);

  management.replaceChildren(
    createForm({
      initial: cyclist,
      submitLabel: 'Guardar cambios',
      onSubmit: (data) => {
        Object.assign(cyclist, data);
        saveCyclists();
        showView('list-all');
      }
    })
  );
}

// Tabla de usuarios registrados en el login del juego (usuarios.js).
// Ojo: deja ver la contraseña en texto plano, solo para este ejercicio.
function createUsersView() {
  const users = getUsers();

  if (users.length === 0) {
    const note = document.createElement('p');
    note.textContent = 'Todavía no hay usuarios registrados.';
    return note;
  }

  const table = document.createElement('table');

  const head = document.createElement('tr');
  ['Nombre', 'Alias', 'Email', 'Contraseña'].forEach((title) => {
    const th = document.createElement('th');
    th.textContent = title;
    head.appendChild(th);
  });
  table.appendChild(head);

  users.forEach((user) => {
    const row = document.createElement('tr');
    [user.fullName, user.alias, user.email, user.password].forEach((value) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    });
    table.appendChild(row);
  });

  return table;
}

// Tabla de intentos del memorama (memory.js), registrados por scores.js al ganar.
function createScoresView() {
  const scores = getScores();

  if (scores.length === 0) {
    const note = document.createElement('p');
    note.textContent = 'Todavía no hay partidas registradas.';
    return note;
  }

  const table = document.createElement('table');

  const head = document.createElement('tr');
  ['Alias', 'Email', 'Tiempo', 'Intentos', 'Fecha'].forEach((title) => {
    const th = document.createElement('th');
    th.textContent = title;
    head.appendChild(th);
  });
  table.appendChild(head);

  // más reciente primero
  scores.slice().reverse().forEach((score) => {
    const row = document.createElement('tr');
    const date = new Date(score.date).toLocaleString('es-CO');
    [score.alias, score.email, score.time, score.attempts, date].forEach((value) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    });
    table.appendChild(row);
  });

  return table;
}

const views = {
  'list-all': () => createTable(cyclists),
  create: createCreateView,
  update: () => createTable(cyclists, { label: 'Editar', onClick: showEditForm }),
  delete: () => createTable(cyclists, { label: 'Eliminar', onClick: deleteCyclist }),
  users: createUsersView,
  scores: createScoresView
};

function showView(action) {
  management.replaceChildren();

  if (views[action]) {
    management.appendChild(views[action]());
  } else {
    const note = document.createElement('p');
    note.textContent = 'Esta sección todavía no está disponible.';
    management.appendChild(note);
  }

  sidebarItems.forEach((item) => {
    item.classList.toggle('active', item.dataset.action === action);
  });
}

sidebarItems.forEach((item) => {
  item.addEventListener('click', () => showView(item.dataset.action));
});

showView('list-all');
