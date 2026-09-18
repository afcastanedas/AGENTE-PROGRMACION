const STORAGE_KEY = 'cyclists';

function saveCyclists() {
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
