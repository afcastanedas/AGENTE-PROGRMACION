// Registro de usuarios del juego, persistido en localStorage (mismo patrón que storage.js).
// La contraseña queda en texto plano, igual que en credenciales.js: no es cifrado real,
// solo sirve para este ejercicio. Un registro real nunca guardaría la contraseña así.
const USERS_STORAGE_KEY = 'gameUsers';

function getUsers() {
  try {
    const stored = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY));
    if (Array.isArray(stored)) return stored;
  } catch (error) {
    console.error('No se pudo leer los usuarios registrados:', error);
  }
  return [];
}

function saveUsers(users) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('No se pudo guardar el usuario:', error);
  }
}

function findUserByEmail(email) {
  return getUsers().find((user) => user.email === email) || null;
}

function registerUser(user) {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
}
