// =========================
// DOM Elements
// =========================

const startScreen = document.getElementById("startScreen");
const gameContainer = document.getElementById("gameContainer");

const playBtn = document.getElementById("playBtn");
const resetBtn = document.getElementById("resetBtn");

const restartBtn = document.getElementById("restartBtn");
const playAgainBtn = document.getElementById("playAgainBtn");

const pauseBtn = document.getElementById("pauseBtn");

const playerChoice = document.getElementById("playerChoice");
const computerChoice = document.getElementById("computerChoice");

const resultText = document.getElementById("resultText");
const roundMessage = document.getElementById("roundMessage");

const playerScoreText = document.getElementById("playerScore");
const computerScoreText = document.getElementById("computerScore");

const winsText = document.getElementById("wins");
const lossesText = document.getElementById("losses");
const drawsText = document.getElementById("draws");

const roundNumberText = document.getElementById("roundNumber");
const gameStatus = document.getElementById("gameStatus");

const gameOverScreen = document.getElementById("gameOverScreen");
const finalMessage = document.getElementById("finalMessage");

const choiceButtons = document.querySelectorAll(".choice-btn");


// =========================
// Game Variables
// =========================

let playerScore = 0;
let computerScore = 0;

let wins = 0;
let losses = 0;
let draws = 0;

let round = 0;

let isPaused = false;


// =========================
// Load Saved Data
// =========================

const savedData = JSON.parse(
    localStorage.getItem("rpsScore")
);


if (savedData) {

    wins = savedData.wins || 0;
    losses = savedData.losses || 0;
    draws = savedData.draws || 0;

    updateScore();

}


// =========================
// Start Button
// =========================

playBtn.addEventListener("click", () => {

    startScreen.style.display = "none";

    gameContainer.style.display = "block";

    gameStatus.textContent = "Game Started";

});



// =========================
// Reset Saved Score
// =========================

resetBtn.addEventListener("click", () => {


    localStorage.removeItem("rpsScore");


    wins = 0;
    losses = 0;
    draws = 0;


    updateScore();


});



// =========================
// Player Choice
// =========================

choiceButtons.forEach(button => {


    button.addEventListener("click", () => {


        if (isPaused) return;


        const playerMove =
            button.dataset.choice;


        playRound(playerMove);


    });


});



// =========================
// Main Round Function
// =========================

function playRound(playerMove) {


    round++;

    roundNumberText.textContent = round;


    const computerMove =
        getComputerMove(playerMove);



    playerChoice.textContent =
        getEmoji(playerMove);


    computerChoice.textContent =
        "❔";


    resultText.textContent =
        "Battle starting...";


    roundMessage.textContent =
        "Computer is choosing";


    setTimeout(() => {


        computerChoice.textContent =
            getEmoji(computerMove);


        decideWinner(
            playerMove,
            computerMove
        );


    },700);


}



// =========================
// 50/50 Computer System
// =========================

function getComputerMove(playerMove) {


    const chance = Math.random();


    if (chance < 0.5) {


        // Player wins

        if (playerMove === "rock") {
            return "scissors";
        }


        if (playerMove === "paper") {
            return "rock";
        }


        return "paper";


    }

    else {


        // Computer wins

        if (playerMove === "rock") {
            return "paper";
        }


        if (playerMove === "paper") {
            return "scissors";
        }


        return "rock";


    }


}

// =========================
// Winner Checker
// =========================

function decideWinner(player, computer) {


    if (player === computer) {


        draws++;


        resultText.textContent =
            "Draw 🤝";


        roundMessage.textContent =
            "Same choice!";


        playAnimation("draw");


    }


    else if (

        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")

    ) {


        playerScore++;

        wins++;


        resultText.textContent =
            "You Win! 🎉";


        roundMessage.textContent =
            "Great move!";


        playAnimation("win");


    }


    else {


        computerScore++;

        losses++;


        resultText.textContent =
            "You Lose 😢";


        roundMessage.textContent =
            "Computer wins this round";


        playAnimation("lose");


    }


    updateScore();

    saveScore();

    checkGameOver();


}



// =========================
// Update Score
// =========================

function updateScore() {


    playerScoreText.textContent =
        playerScore;


    computerScoreText.textContent =
        computerScore;


    winsText.textContent =
        wins;


    lossesText.textContent =
        losses;


    drawsText.textContent =
        draws;


}



// =========================
// Save Score
// =========================

function saveScore() {


    localStorage.setItem(
        "rpsScore",
        JSON.stringify({

            wins,
            losses,
            draws

        })
    );


}



// =========================
// Emoji System
// =========================

function getEmoji(choice) {


    if (choice === "rock") {

        return "🪨";

    }


    if (choice === "paper") {

        return "📄";

    }


    if (choice === "scissors") {

        return "✂️";

    }


}



// =========================
// Animation
// =========================

function playAnimation(type) {


    resultText.classList.remove(
        "win",
        "lose",
        "draw"
    );


    void resultText.offsetWidth;


    resultText.classList.add(type);


}



// =========================
// Restart Match
// =========================

restartBtn.addEventListener("click", () => {


    playerScore = 0;

    computerScore = 0;

    round = 0;


    playerChoice.textContent = "?";

    computerChoice.textContent = "?";


    resultText.textContent =
        "Make your choice";


    roundMessage.textContent =
        "Choose Rock, Paper, or Scissors";


    roundNumberText.textContent = 0;


    updateScore();


});



// =========================
// Pause Game
// =========================

pauseBtn.addEventListener("click", () => {


    isPaused = !isPaused;


    if (isPaused) {


        pauseBtn.textContent =
            "Resume Game";


        gameStatus.textContent =
            "Game Paused";


    }

    else {


        pauseBtn.textContent =
            "Pause Game";


        gameStatus.textContent =
            "Game Active";


    }


});



// =========================
// Game Over
// =========================

function checkGameOver() {


    if (
        playerScore >= 10 ||
        computerScore >= 10
    ) {


        gameOverScreen.style.display =
            "flex";


        if (playerScore > computerScore) {


            finalMessage.textContent =
                "You are the Champion 🏆";


        }

        else {


            finalMessage.textContent =
                "Computer Won 🤖";


        }


    }


}



// =========================
// Play Again
// =========================

playAgainBtn.addEventListener("click", () => {


    gameOverScreen.style.display =
        "none";


    restartBtn.click();


});