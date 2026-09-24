const STORAGE_KEY = 'cyclists';

// gestion.js pone esto en true solo tras un login correcto. Es una barrera
// de cliente, no seguridad real: cualquiera puede escribir "isAuthenticated = true"
// en la consola y saltársela igual. Lo que sí evita es que operaciones CRUD
// llamadas "sin pensar" (sin pasar por el login) queden guardadas.
let isAuthenticated = false;

function saveCyclists() {
  if (!isAuthenticated) {
    console.warn('saveCyclists() bloqueado: no hay sesión iniciada.');
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cyclists));
  } catch (error) {
    console.error('No se pudo guardar en localStorage:', error);
  }
}

function loadCyclists() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(stored)) return stored;
  } catch (error) {
    console.error('No se pudo leer localStorage:', error);
  }
  return cyclists;
}

// data.js aporta los datos iniciales; si ya hay datos guardados, tienen prioridad
cyclists = loadCyclists();
