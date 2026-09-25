// Memorama de ciclistas. Adaptado del cardgame de ejemplo (ejemplo juego/cardgame),
// pero usando `cyclists` (data.js + storage.js) en vez de un array fijo de productos.
// El número de pares es cyclists.length, no un valor fijo: se ajusta solo si en
// gestion.html se agregan o eliminan ciclistas.

const board = document.getElementById('board');
const hudTimer = document.getElementById('hud-timer');
const hudAttempts = document.getElementById('hud-attempts');
const hudPairs = document.getElementById('hud-pairs');
const btnRestart = document.getElementById('btn-restart');
const victoryOverlay = document.getElementById('victory-overlay');
const btnPlayAgain = document.getElementById('btn-play-again');

let flippedCard1 = null;
let flippedCard2 = null;
let pairKey1 = null;
let pairKey2 = null;
let waiting = false;
let pairsFound = 0;
let attempts = 0;

let timerInterval = null;
let gameSeconds = 0;
let gameActive = false;

function startTimer() {
  clearInterval(timerInterval);
  gameSeconds = 0;
  gameActive = true;
  hudTimer.classList.remove('danger');

  timerInterval = setInterval(() => {
    if (!gameActive) return;
    gameSeconds++;

    const mm = String(Math.floor(gameSeconds / 60)).padStart(2, '0');
    const ss = String(gameSeconds % 60).padStart(2, '0');
    hudTimer.textContent = mm + ':' + ss;

    if (gameSeconds >= 120) hudTimer.classList.add('danger');
  }, 1000);
}

function stopTimer() {
  gameActive = false;
  clearInterval(timerInterval);
}

function formatTime(seconds) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  return mm + ':' + ss;
}

// Fisher-Yates: mezcla sin alterar el array original
function shuffle(array) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// pairKey identifica cada PAR de cartas de forma única. No usamos cyclist.id:
// si dos ciclistas distintos llegaran a compartir el mismo id (datos corruptos,
// ediciones manuales, etc.) el juego los emparejaría igual, aunque sean
// visualmente distintos. pairKey lo generamos nosotros al armar el mazo
// (la posición del ciclista en `cyclists`), así siempre es único de verdad.
function createFlipCard(cyclist, pairKey) {
  const flipCard = document.createElement('div');
  flipCard.className = 'flip-card';
  flipCard.dataset.pairKey = pairKey;

  const inner = document.createElement('div');
  inner.className = 'flip-card-inner';

  const front = document.createElement('div');
  front.className = 'flip-card-front';
  front.innerHTML = '<span class="card-back-icon">🚴</span><span class="card-back-label">Ciclistas</span>';

  const back = document.createElement('div');
  back.className = 'flip-card-back';

  const img = document.createElement('img');
  img.className = 'card-img';
  img.src = cyclist.image;
  img.alt = cyclist.name;

  const info = document.createElement('div');
  info.className = 'flip-card-info';

  const name = document.createElement('p');
  name.className = 'card-name';
  name.textContent = cyclist.name;

  const team = document.createElement('p');
  team.className = 'card-age';
  team.textContent = cyclist.team;

  info.append(name, team);
  back.append(img, info);
  inner.append(front, back);
  flipCard.appendChild(inner);

  flipCard.addEventListener('click', () => handleClick(flipCard));

  return flipCard;
}

function renderBoard() {
  board.replaceChildren();

  // Cada ciclista aporta su índice en el array como pairKey, duplicado (2 cartas).
  // Así el par queda garantizado por construcción, sin depender de cyclist.id.
  const deck = shuffle(
    cyclists.flatMap((cyclist, index) => [
      { cyclist, pairKey: index },
      { cyclist, pairKey: index }
    ])
  );
  deck.forEach((entry) => board.appendChild(createFlipCard(entry.cyclist, entry.pairKey)));

  hudPairs.textContent = '0/' + cyclists.length;
  startTimer();
}

function handleClick(card) {
  if (waiting) return;
  if (card.classList.contains('flipped')) return;
  if (card.classList.contains('matched')) return;

  card.classList.add('flipped');

  if (!flippedCard1) {
    flippedCard1 = card;
    pairKey1 = card.dataset.pairKey;
    return;
  }

  flippedCard2 = card;
  pairKey2 = card.dataset.pairKey;

  attempts++;
  hudAttempts.textContent = attempts;
  waiting = true;

  if (pairKey1 === pairKey2) {
    processMatchedPair();
  } else {
    setTimeout(flipBack, 900);
  }
}

function processMatchedPair() {
  flippedCard1.classList.remove('flipped');
  flippedCard2.classList.remove('flipped');
  flippedCard1.classList.add('matched', 'locked');
  flippedCard2.classList.add('matched', 'locked');

  pairsFound++;
  hudPairs.textContent = pairsFound + '/' + cyclists.length;

  clearSelection();

  if (pairsFound === cyclists.length) {
    stopTimer();
    setTimeout(showVictory, 500);
  }
}

function flipBack() {
  flippedCard1.classList.remove('flipped');
  flippedCard2.classList.remove('flipped');
  clearSelection();
}

function clearSelection() {
  flippedCard1 = null;
  flippedCard2 = null;
  pairKey1 = null;
  pairKey2 = null;
  waiting = false;
}

function showVictory() {
  const time = formatTime(gameSeconds);
  document.getElementById('stat-time').textContent = time;
  document.getElementById('stat-attempts').textContent = attempts;
  victoryOverlay.classList.remove('hidden');

  // currentPlayer lo deja game.js al iniciar sesión; recordScore vive en scores.js
  if (typeof currentPlayer !== 'undefined' && currentPlayer) {
    recordScore({
      alias: currentPlayer.alias,
      email: currentPlayer.email,
      time,
      attempts
    });
  }
}

function resetGame() {
  victoryOverlay.classList.add('hidden');
  flippedCard1 = null;
  flippedCard2 = null;
  pairKey1 = null;
  pairKey2 = null;
  waiting = false;
  pairsFound = 0;
  attempts = 0;

  hudAttempts.textContent = '0';
  hudPairs.textContent = '0/' + cyclists.length;
  hudTimer.textContent = '00:00';
  hudTimer.classList.remove('danger');

  renderBoard();
}

btnRestart.addEventListener('click', resetGame);
btnPlayAgain.addEventListener('click', resetGame);

// game.js llama a esto tras un login/registro exitoso; el tablero no arranca solo al cargar el script
function startGame() {
  renderBoard();
}
