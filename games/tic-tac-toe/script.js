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



let board = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];


let currentPlayer = "X";

let gameActive = true;


let xScore = 0;
let oScore = 0;
let drawScore = 0;




// Winning combinations

const winPatterns = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];





// Start

updateTurn();





// Cell click

cells.forEach(cell => {


    cell.addEventListener("click",()=>{


        const index = cell.dataset.index;



        if(board[index] !== "" || !gameActive){

            return;

        }



        board[index] = currentPlayer;


        cell.textContent = currentPlayer;


        cell.classList.add(
            currentPlayer.toLowerCase()
        );



        checkWinner();



    });


});








// Check winner


function checkWinner(){


    for(let pattern of winPatterns){


        const [a,b,c] = pattern;



        if(

            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]

        ){


            gameActive = false;



            let winClass =
            currentPlayer === "X"
            ? "win-x"
            : "win-o";



            cells[a].classList.add(winClass);
            cells[b].classList.add(winClass);
            cells[c].classList.add(winClass);





            if(currentPlayer === "X"){


                xScore++;

                xScoreText.textContent = xScore;


            }

            else{


                oScore++;

                oScoreText.textContent = oScore;


            }





            statusText.textContent =
            `🎉 Player ${currentPlayer} Wins!`;



            setTimeout(()=>{

                resetBoard();

            },3000);



            return;


        }


    }






    // Draw check


    if(!board.includes("")){


        gameActive = false;



        drawScore++;

        drawScoreText.textContent = drawScore;




        cells.forEach(cell=>{

            cell.classList.add("draw");

        });




        statusText.textContent =
        "🤝 Draw!";



        setTimeout(()=>{


            resetBoard();


        },3000);



        return;


    }





    // Change turn


    currentPlayer =
    currentPlayer === "X"
    ? "O"
    : "X";



    updateTurn();


}








// Update turn display


function updateTurn(){



    turnIndicator.textContent = currentPlayer;



    turnIndicator.classList.remove(
        "x",
        "o"
    );



    turnIndicator.classList.add(
        currentPlayer.toLowerCase()
    );



    statusText.textContent =
    `Player ${currentPlayer}'s Turn`;



}








// Reset only board


function resetBoard(){



    board = [

        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""

    ];



    currentPlayer = "X";


    gameActive = true;





    cells.forEach(cell=>{


        cell.textContent = "";


        cell.classList.remove(

            "x",
            "o",
            "win-x",
            "win-o",
            "draw"

        );


    });





    updateTurn();



}








// Reset scores


resetBtn.addEventListener("click",()=>{


    xScore = 0;

    oScore = 0;

    drawScore = 0;



    xScoreText.textContent = xScore;
    scoreAnimation(xScoreText);

    oScoreText.textContent = oScore;
    scoreAnimation(oScoreText);

    drawScoreText.textContent = drawScore;
    scoreAnimation(drawScoreText);




    resetBoard();



});

function scoreAnimation(element){

    element.classList.remove("score-change");

    void element.offsetWidth;

    element.classList.add("score-change");

}

// ===================================
// START MENU CONTROL
// ===================================


const startMenu = document.getElementById("startMenu");

const gameArea = document.getElementById("gameArea");

const playBtn = document.getElementById("playBtn");

const resetMenuBtn = document.getElementById("resetMenuBtn");





// PLAY BUTTON

playBtn.addEventListener("click",()=>{


    startMenu.classList.add("hide");



    setTimeout(()=>{


        startMenu.style.display="none";


        gameArea.style.display="flex";


    },400);


});






// RESET SCORE FROM MENU

resetMenuBtn.addEventListener("click",()=>{


    xScore = 0;

    oScore = 0;

    drawScore = 0;



    xScoreText.textContent = 0;

    oScoreText.textContent = 0;

    drawScoreText.textContent = 0;



});