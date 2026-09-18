const management = document.getElementById('gestion');
const sidebarItems = document.querySelectorAll('.sidebar-item');

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

  list.forEach((cyclist, index) => {
    const rowAction = action ? { label: action.label, onClick: () => action.onClick(index) } : null;
    table.appendChild(createRow(cyclist, rowAction));
  });
  return table;
}

function deleteCyclist(index) {
  const cyclist = cyclists[index];
  if (!confirm('¿Eliminar a ' + cyclist.name + '?')) return;

  cyclists.splice(index, 1);
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
      cyclists.push(data);
      saveCyclists();
      showView('list-all');
    }
  });
}

// paso 2 de Actualizar: formulario rellenado con los datos del ciclista elegido
function showEditForm(index) {
  management.replaceChildren(
    createForm({
      initial: cyclists[index],
      submitLabel: 'Guardar cambios',
      onSubmit: (data) => {
        cyclists[index] = data;
        saveCyclists();
        showView('list-all');
      }
    })
  );
}

const views = {
  'list-all': () => createTable(cyclists),
  create: createCreateView,
  update: () => createTable(cyclists, { label: 'Editar', onClick: showEditForm }),
  delete: () => createTable(cyclists, { label: 'Eliminar', onClick: deleteCyclist })
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
