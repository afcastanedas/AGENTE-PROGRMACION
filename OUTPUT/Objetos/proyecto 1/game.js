const gameLoginForm = document.getElementById('game-login-form');
const emailInput = gameLoginForm.email;
const emailError = document.getElementById('email-error');
const passwordInput = gameLoginForm.password;
const passwordError = document.getElementById('password-error');
const loginError = document.getElementById('login-error');
const requirementItems = document.querySelectorAll('#password-requirements li');
const gameLoginScreen = document.getElementById('game-login');
const gameBoard = document.getElementById('game-board');

// Usuario de la sesión actual; memory.js lo lee para registrar el puntaje en scores.js
let currentPlayer = null;

// Formato básico: texto@texto.dominio, sin espacios
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Al menos 6 caracteres, 1 mayúscula, 1 número y 1 carácter especial (no letra ni dígito)
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

// Cada regla por separado, para marcar en tiempo real cuál falta y cuál ya se cumple
const rules = {
  length: (value) => value.length >= 6,
  uppercase: (value) => /[A-Z]/.test(value),
  number: (value) => /\d/.test(value),
  special: (value) => /[^A-Za-z0-9]/.test(value)
};

function updateRequirements() {
  const value = passwordInput.value;

  requirementItems.forEach((item) => {
    const passes = rules[item.dataset.rule](value);
    item.classList.toggle('met', passes);
  });
}

passwordInput.addEventListener('input', updateRequirements);
updateRequirements();

// Igual que la contraseña: valida en tiempo real mientras se escribe
emailInput.addEventListener('input', () => {
  const isValid = EMAIL_REGEX.test(emailInput.value);
  emailError.classList.toggle('hidden', isValid || emailInput.value === '');
});

gameLoginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const fullName = gameLoginForm.fullName.value.trim();
  const alias = gameLoginForm.alias.value.trim();
  const email = gameLoginForm.email.value.trim();
  const password = gameLoginForm.password.value;

  if (!EMAIL_REGEX.test(email)) {
    emailError.classList.remove('hidden');
    return;
  }
  emailError.classList.add('hidden');

  if (!PASSWORD_REGEX.test(password)) {
    passwordError.classList.remove('hidden');
    return;
  }

  passwordError.classList.add('hidden');
  loginError.classList.add('hidden');

  // --- Login / registro contra usuarios.js ---
  const existingUser = findUserByEmail(email);

  if (existingUser) {
    if (existingUser.password !== password) {
      loginError.classList.remove('hidden');
      return;
    }

    console.log('Login válido:', { fullName, alias, email });
    currentPlayer = { alias, email };
    enterGame();
    return;
  }

  const wantsToRegister = confirm('No hay ninguna cuenta con ese email. ¿Deseas registrarte?');
  if (!wantsToRegister) return;

  registerUser({ fullName, alias, email, password });
  renderRegisteredUsers();
  console.log('Usuario registrado:', { fullName, alias, email });
  currentPlayer = { alias, email };
  enterGame();
});

// Oculta el login y arranca el memorama (memory.js), tras un login o registro válido
function enterGame() {
  gameLoginScreen.classList.add('hidden');
  gameBoard.classList.remove('hidden');
  startGame();
}

// --- Tabla de usuarios registrados (usuarios.js) ---
// A diferencia de la misma tabla en gestion.html, esta NO está detrás de ningún login:
// cualquiera que abra game.html ve nombres, emails y contraseñas de todos los registrados.
function renderRegisteredUsers() {
  const container = document.getElementById('registered-users-table');
  const users = getUsers();

  if (users.length === 0) {
    const note = document.createElement('p');
    note.textContent = 'Todavía no hay usuarios registrados.';
    container.replaceChildren(note);
    return;
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

  container.replaceChildren(table);
}

renderRegisteredUsers();
