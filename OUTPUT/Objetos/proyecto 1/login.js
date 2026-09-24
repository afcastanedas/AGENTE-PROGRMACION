// --- Login ---
// Valida contra credenciales.js. Solo client-side: cualquiera puede leer el
// archivo fuente o abrir la consola, así que esto NO es seguridad real, solo
// evita que un visitante casual llegue al CRUD sin usuario y contraseña.
// isAuthenticated está declarada en storage.js; saveCyclists() la revisa
// antes de guardar cualquier cambio.

const loginScreen = document.getElementById('login-screen');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const app = document.getElementById('app');

// Función que verifica los datos del formulario contra las credenciales válidas
function verifyLogin(user, userPassword) {
  return user === usuarios && userPassword === password;
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const isValid = verifyLogin(loginForm.user.value, loginForm.password.value);

  if (!isValid) {
    loginError.classList.remove('hidden');
    return;
  }

  loginError.classList.add('hidden');
  loginScreen.classList.add('hidden');
  app.classList.remove('hidden');
  isAuthenticated = true;
});
