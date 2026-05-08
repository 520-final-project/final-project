// ── game.js ──
// This file is loaded at the BOTTOM of <body> in game.html,
// so every HTML element already exists when this code runs.

const TRASH = ['🛍️','🧴','🚬','💀','🪣','⚗️','🗑️','🥤','🪤'];
const OCEAN  = ['🐠','🐡','🦈','🐙','🪸','🐬','🦑','🐟','🦀','🐚','🐋','🦭'];
const GRID   = 48; // total number of cells

let gScore   = 0;
let gCleaned = 0;
let gTimer   = 30;
let gRunning = false;
let gIntvl   = null;
let gSpawn   = null;
const cells  = [];

// ── Personal best (stored in localStorage) ──
let bestScore = parseInt(localStorage.getItem('ow-best') || '0');

function updateBestDisplay() {
  const el = document.getElementById('bestDisplay');
  el.textContent = bestScore > 0 ? bestScore + ' pts' : '—';
}
updateBestDisplay();

// ── Build the 8×6 grid ──
function buildGrid() {
  const grid = document.getElementById('ocean-grid');

  // Guard: if the element doesn't exist, stop here and warn
  if (!grid) {
    console.error('❌ #ocean-grid not found in the DOM. Check your game.html.');
    return;
  }

  grid.innerHTML = '';
  cells.length = 0;

  for (let i = 0; i < GRID; i++) {
    const div = document.createElement('div');
    div.className = 'ocean-cell empty';
    div.addEventListener('click', () => cellClick(i));
    grid.appendChild(div);
    cells.push({ el: div, type: 'empty' });
  }
}

// ── Set a cell's content and class ──
function setCell(i, type) {
  const c = cells[i];
  c.type = type;
  if (type === 'trash') {
    c.el.textContent = TRASH[Math.floor(Math.random() * TRASH.length)];
    c.el.className   = 'ocean-cell trash';
  } else if (type === 'fish') {
    c.el.textContent = OCEAN[Math.floor(Math.random() * OCEAN.length)];
    c.el.className   = 'ocean-cell fish';
  } else {
    c.el.textContent = '';
    c.el.className   = 'ocean-cell empty';
  }
}

// ── Spawn a random item into an empty cell ──
function spawnItems() {
  const emptyIndices = cells
    .map((c, i) => (c.type === 'empty' ? i : -1))
    .filter(i => i >= 0);
  if (!emptyIndices.length) return;
  const idx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  setCell(idx, Math.random() < 0.48 ? 'trash' : 'fish');
}

// ── Handle a cell click ──
function cellClick(i) {
  if (!gRunning) return;
  const c = cells[i];
  if (c.type === 'empty') return;

  // Pop animation
  c.el.classList.add('pop');
  setTimeout(() => c.el.classList.remove('pop'), 200);

  const msg = document.getElementById('game-msg');

  if (c.type === 'trash') {
    gScore   += 10;
    gCleaned += 1;
    msg.textContent = '✅ Trash removed! +10 pts';
    msg.className   = '';
    setCell(i, 'empty');
  } else if (c.type === 'fish') {
    gScore = Math.max(0, gScore - 5);
    msg.textContent = '❌ That\'s a sea creature! -5 pts';
    msg.className   = 'bad';
  }

  document.getElementById('g-score').textContent   = gScore;
  document.getElementById('g-cleaned').textContent = gCleaned;
}

// ── Start game ──
function startGame() {
  if (gRunning) return;
  gScore = 0; gCleaned = 0; gTimer = 30; gRunning = true;

  buildGrid();
  document.getElementById('g-score').textContent   = 0;
  document.getElementById('g-cleaned').textContent = 0;
  document.getElementById('g-timer').textContent   = 30;
  document.getElementById('game-msg').textContent  = '🌊 Clean up the ocean!';
  document.getElementById('game-msg').className    = '';
  document.getElementById('startBtn').disabled     = true;
  document.getElementById('resetBtn').disabled     = false;
  document.getElementById('timerBox').classList.remove('urgent');

  // Seed the grid with some items
  for (let k = 0; k < 10; k++) spawnItems();

  // Spawn new items every 1.1 s
  gSpawn = setInterval(spawnItems, 1100);

  // Countdown
  gIntvl = setInterval(() => {
    gTimer--;
    document.getElementById('g-timer').textContent = gTimer;
    if (gTimer <= 10) document.getElementById('timerBox').classList.add('urgent');
    if (gTimer <= 0)  endGame();
  }, 1000);
}

// ── End game ──
function endGame() {
  gRunning = false;
  clearInterval(gIntvl);
  clearInterval(gSpawn);
  document.getElementById('startBtn').disabled = false;
  document.getElementById('resetBtn').disabled = true;
  document.getElementById('timerBox').classList.remove('urgent');

  // Save personal best
  if (gScore > bestScore) {
    bestScore = gScore;
    localStorage.setItem('ow-best', bestScore);
    updateBestDisplay();
  }

  const msg =
    gScore >= 100 ? `🏆 Ocean Hero! ${gCleaned} pieces cleaned, ${gScore} pts! Amazing!`
  : gScore >= 50  ? `⭐ Great job! ${gCleaned} cleaned, ${gScore} pts! Keep it up!`
                  : `🌱 ${gScore} pts — practice makes perfect! The ocean still needs you.`;

  document.getElementById('game-msg').textContent = msg;
  document.getElementById('game-msg').className   = '';
}

// ── Reset game ──
function resetGame() {
  gRunning = false;
  clearInterval(gIntvl);
  clearInterval(gSpawn);
  gScore = 0; gCleaned = 0; gTimer = 30;

  buildGrid();
  document.getElementById('g-score').textContent   = 0;
  document.getElementById('g-cleaned').textContent = 0;
  document.getElementById('g-timer').textContent   = 30;
  document.getElementById('game-msg').textContent  = 'Press Start to clean the ocean! 🌊';
  document.getElementById('game-msg').className    = '';
  document.getElementById('startBtn').disabled     = false;
  document.getElementById('resetBtn').disabled     = true;
  document.getElementById('timerBox').classList.remove('urgent');
}

// ── Initial grid render (runs as soon as this script is loaded) ──
// Because the <script> tag is at the bottom of <body>,
// all HTML elements already exist at this point.
buildGrid();
