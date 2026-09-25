// Registro de intentos del memorama (memory.js), persistido en localStorage
// (mismo patrón que storage.js y usuarios.js).
const SCORES_STORAGE_KEY = 'gameScores';

function getScores() {
  try {
    const stored = JSON.parse(localStorage.getItem(SCORES_STORAGE_KEY));
    if (Array.isArray(stored)) return stored;
  } catch (error) {
    console.error('No se pudo leer los puntajes:', error);
  }
  return [];
}

function saveScores(scores) {
  try {
    localStorage.setItem(SCORES_STORAGE_KEY, JSON.stringify(scores));
  } catch (error) {
    console.error('No se pudo guardar el puntaje:', error);
  }
}

// score = { alias, email, time, attempts }
function recordScore(score) {
  const scores = getScores();
  scores.push({ ...score, date: new Date().toISOString() });
  saveScores(scores);
}
