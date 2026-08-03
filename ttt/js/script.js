// State Variables
let boardState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = false;
let p1Name = "Player 1";
let p2Name = "Player 2";

let scores = { p1: 0, p2: 0, ties: 0 };

// DOM Elements
const setupForm = document.getElementById("setup-form");
const p1Input = document.getElementById("p1-input");
const p2Input = document.getElementById("p2-input");

const scoreboard = document.getElementById("scoreboard");
const p1Display = document.getElementById("p1-display");
const p2Display = document.getElementById("p2-display");
const p1ScoreElem = document.getElementById("p1-score");
const p2ScoreElem = document.getElementById("p2-score");
const tiesScoreElem = document.getElementById("ties-score");

const statusMessage = document.getElementById("status-message");
const boardElem = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const playAgainBtn = document.getElementById("play-again-btn");

// Standard Win Conditions Array
const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Audio synthesizers (Web Audio API for zero-dependency sounds)
function playSound(type) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  if (type === "win") {
    // Happy Sound: Rising arpeggio
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.setValueAtTime(554, ctx.currentTime + 0.1);
    osc.frequency.setValueAtTime(659, ctx.currentTime + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } else if (type === "tie") {
    // Sad Sound: Falling tone
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  }
}

// Start Game Event
setupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  p1Name = p1Input.value.trim() || "Player 1";
  p2Name = p2Input.value.trim() || "Player 2";

  p1Display.textContent = p1Name;
  p2Display.textContent = p2Name;

  setupForm.classList.add("hidden");
  scoreboard.classList.remove("hidden");
  boardElem.classList.remove("hidden");
  statusMessage.classList.remove("hidden");

  startGame();
});

function startGame() {
  boardState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  playAgainBtn.classList.add("hidden");

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });

  updateStatus(`${p1Name}'s Turn`);
}

function updateStatus(msg) {
  statusMessage.textContent = msg;
}

// Handle Square Clicks
cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = cell.getAttribute("data-index");

    // Prevent clicks on filled cells or ended games
    if (boardState[index] !== "" || !isGameActive) return;

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    checkResult();
  });
});

// Check Win/Tie Logic
function checkResult() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    const winnerName = currentPlayer === "X" ? p1Name : p2Name;
    updateStatus(`${winnerName} Wins! 🎉`);
    if (currentPlayer === "X") scores.p1++; else scores.p2++;
    updateScores();
    playSound("win");
    endGame();
    return;
  }

  if (!boardState.includes("")) {
    updateStatus("It's a Tie! 🤝");
    scores.ties++;
    updateScores();
    playSound("tie");
    endGame();
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  const activeName = currentPlayer === "X" ? p1Name : p2Name;
  updateStatus(`${activeName}'s Turn`);
}

function updateScores() {
  p1ScoreElem.textContent = scores.p1;
  p2ScoreElem.textContent = scores.p2;
  tiesScoreElem.textContent = scores.ties;
}

function endGame() {
  isGameActive = false;
  playAgainBtn.classList.remove("hidden");
}

// Play Again button click
playAgainBtn.addEventListener("click", startGame);