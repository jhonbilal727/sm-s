/* =========================
   Memory Game Variables
========================= */


const playBtn = document.getElementById("playBtn");
const resetScoreBtn = document.getElementById("resetScoreBtn");

const startScreen = document.getElementById("startScreen");
const gameContainer = document.getElementById("gameContainer");

const cardBoard = document.getElementById("cardBoard");

const movesDisplay = document.getElementById("moves");
const bestScoreDisplay = document.getElementById("bestScore");
const levelDisplay = document.getElementById("level");
const statusDisplay = document.getElementById("status");

const pauseBtn = document.getElementById("pauseBtn");

const winScreen = document.getElementById("winScreen");
const restartBtn = document.getElementById("restartBtn");



let cards = [];

let firstCard = null;
let secondCard = null;

let lockBoard = false;

let moves = 0;

let level = 1;

let matches = 0;

let paused = false;



let bestScore = localStorage.getItem("memoryBestScore") || 0;

bestScoreDisplay.textContent = bestScore;



/* =========================
   Card Data
========================= */


const cardSymbols = [

    "🍎",
    "🍌",
    "🍇",
    "🍉",
    "🍓",
    "🍒",
    "🥝",
    "🍍"

];



/* =========================
   Start Game
========================= */


playBtn.addEventListener("click", () => {

    startScreen.style.display = "none";

    gameContainer.style.display = "block";

    startGame();

});



restartBtn.addEventListener("click", () => {

    winScreen.style.display = "none";

    startGame();

});



resetScoreBtn.addEventListener("click", () => {

    localStorage.removeItem("memoryBestScore");

    bestScore = 0;

    bestScoreDisplay.textContent = 0;

});



/* =========================
   Create Cards
========================= */


function startGame() {


    cardBoard.innerHTML = "";


    moves = 0;

    matches = 0;

    level = 1;


    movesDisplay.textContent = moves;

    levelDisplay.textContent = level;

    statusDisplay.textContent = "Playing";


    let cardSet = [...cardSymbols, ...cardSymbols];


    cardSet.sort(() => Math.random() - 0.5);



    cards = cardSet;



    createCards();



}

/* =========================
   Generate Cards
========================= */


function createCards() {


    cards.forEach(symbol => {


        const card = document.createElement("div");

        card.classList.add("card");


        card.innerHTML = `

            <div class="card-inner">

                <div class="card-front">
                    ?
                </div>


                <div class="card-back">
                    ${symbol}
                </div>

            </div>

        `;


        card.addEventListener("click", () => flipCard(card));


        cardBoard.appendChild(card);


    });


}




/* =========================
   Flip Card
========================= */


function flipCard(card) {


    if (
        lockBoard ||
        paused ||
        card.classList.contains("flipped")
    ) {
        return;
    }


    card.classList.add("flipped");


    if (!firstCard) {


        firstCard = card;


        return;

    }


    secondCard = card;


    moves++;

    movesDisplay.textContent = moves;


    checkMatch();


}




/* =========================
   Match Checking
========================= */


function checkMatch() {


    const firstSymbol =
        firstCard.querySelector(".card-back").textContent.trim();


    const secondSymbol =
        secondCard.querySelector(".card-back").textContent.trim();



    if (firstSymbol === secondSymbol) {


        matches++;


        resetTurn();


        statusDisplay.textContent = "Match!";


        if (matches === cards.length / 2) {

            finishGame();

        }


    } else {


        lockBoard = true;


        statusDisplay.textContent = "Try Again";


        setTimeout(() => {


            firstCard.classList.remove("flipped");

            secondCard.classList.remove("flipped");


            resetTurn();


        }, 900);


    }


}





function resetTurn() {


    firstCard = null;

    secondCard = null;

    lockBoard = false;


}



/* =========================
   Win System
========================= */


function finishGame() {


    statusDisplay.textContent = "Completed";


    if (
        bestScore === 0 ||
        moves < bestScore
    ) {


        bestScore = moves;


        localStorage.setItem(
            "memoryBestScore",
            bestScore
        );


        bestScoreDisplay.textContent = bestScore;


    }



    setTimeout(() => {

        winScreen.style.display = "flex";

    }, 700);


}





/* =========================
   Pause Button
========================= */


pauseBtn.addEventListener("click", () => {


    paused = !paused;


    if (paused) {


        pauseBtn.textContent = "Resume";

        statusDisplay.textContent = "Paused";


    } else {


        pauseBtn.textContent = "Pause";

        statusDisplay.textContent = "Playing";


    }


});