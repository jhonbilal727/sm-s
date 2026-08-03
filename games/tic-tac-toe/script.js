// ===================================
// MODERN TIC TAC TOE
// script.js
// ===================================

const cells = document.querySelectorAll(".cell");

const xScoreText = document.getElementById("xScore");
const oScoreText = document.getElementById("oScore");
const drawScoreText = document.getElementById("drawScore");

const turnIndicator = document.getElementById("turnIndicator");
const statusText = document.getElementById("statusText");

const resetBtn = document.getElementById("resetBtn");
const resetMenuBtn = document.getElementById("resetMenuBtn");

const startMenu = document.getElementById("startMenu");
const gameArea = document.getElementById("gameArea");
const playBtn = document.getElementById("playBtn");

let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];

let currentPlayer = "X";
let gameActive = true;

let xScore = 0;
let oScore = 0;
let drawScore = 0;

// Winning combinations
const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // Rows
    [0,3,6], [1,4,7], [2,5,8], // Columns
    [0,4,8], [2,4,6]             // Diagonals
];

// Start Menu Flow
playBtn.addEventListener("click", () => {
    startMenu.classList.add("hide");
    setTimeout(() => {
        startMenu.style.display = "none";
        gameArea.style.display = "flex";
        updateTurn();
    }, 400);
});

// Cell Click Logic
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.dataset.index;

        if (board[index] !== "" || !gameActive) {
            return;
        }

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());

        checkWinner();
    });
});

// Check Winner Logic
function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;

            let winClass = currentPlayer === "X" ? "win-x" : "win-o";
            cells[a].classList.add(winClass);
            cells[b].classList.add(winClass);
            cells[c].classList.add(winClass);

            if (currentPlayer === "X") {
                xScore++;
                xScoreText.textContent = xScore;
                scoreAnimation(xScoreText);
            } else {
                oScore++;
                oScoreText.textContent = oScore;
                scoreAnimation(oScoreText);
            }

            statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;

            setTimeout(() => {
                resetBoard();
            }, 2500);

            return;
        }
    }

    // Draw Check
    if (!board.includes("")) {
        gameActive = false;
        drawScore++;
        drawScoreText.textContent = drawScore;
        scoreAnimation(drawScoreText);

        cells.forEach(cell => {
            cell.classList.add("draw");
        });

        statusText.textContent = "🤝 Draw!";

        setTimeout(() => {
            resetBoard();
        }, 2500);

        return;
    }

    // Change Turn
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateTurn();
}

// Update Turn Display
function updateTurn() {
    turnIndicator.textContent = currentPlayer;
    turnIndicator.classList.remove("x", "o");
    turnIndicator.classList.add(currentPlayer.toLowerCase());
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Reset Only Board
function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o", "win-x", "win-o", "draw");
    });

    updateTurn();
}

// Reset Scores Button (In-Game)
resetBtn.addEventListener("click", () => {
    resetAllScores();
    resetBoard();
});

// Reset Scores Button (Menu)
resetMenuBtn.addEventListener("click", () => {
    resetAllScores();
});

function resetAllScores() {
    xScore = 0;
    oScore = 0;
    drawScore = 0;

    xScoreText.textContent = xScore;
    scoreAnimation(xScoreText);

    oScoreText.textContent = oScore;
    scoreAnimation(oScoreText);

    drawScoreText.textContent = drawScore;
    scoreAnimation(drawScoreText);
}

// Score Update Animation Helper
function scoreAnimation(element) {
    element.classList.remove("score-change");
    void element.offsetWidth;
    element.classList.add("score-change");
}