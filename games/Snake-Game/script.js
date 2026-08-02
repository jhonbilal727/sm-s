// ================================
// Snake Modern Edition
// Game Logic + Pause System
// ================================


// DOM Elements

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const playButton = document.getElementById("playButton");
const restartButton = document.getElementById("restartButton");
const resetScoreButton = document.getElementById("resetScoreButton");
const pauseButton = document.getElementById("pauseButton");

const board = document.getElementById("gameBoard");

const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highScore");
const levelText = document.getElementById("level");
const statusText = document.getElementById("status");




// Game Settings

const gridSize = 30;
const cellSize = 20;


let snake;
let food;

let direction;
let nextDirection;

let score;
let level;

let speed;

let gameLoop;

let isPaused = false;


let highScore =
localStorage.getItem("snakeHighScore") || 0;


highScoreText.textContent = highScore;




// Create Board

function createBoard(){

    board.innerHTML = "";

    board.style.gridTemplateColumns =
    `repeat(${gridSize}, ${cellSize}px)`;

    board.style.gridTemplateRows =
    `repeat(${gridSize}, ${cellSize}px)`;


    for(let i = 0; i < gridSize * gridSize; i++){

        let cell = document.createElement("div");

        cell.classList.add("cell");

        board.appendChild(cell);

    }

}




// Start Game

function startGame(){


    startScreen.classList.add("hidden");

    gameOverScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");



    snake = [
        {
            x:15,
            y:15
        }
    ];


    direction = "right";
    nextDirection = "right";


    score = 0;
    level = 1;

    speed = 150;


    isPaused = false;

    pauseButton.textContent = "Pause";


    updateScore();


    createFood();


    statusText.textContent = "Playing";


    clearInterval(gameLoop);


    gameLoop =
    setInterval(updateGame, speed);



}




// Draw Game

function draw(){


    const cells =
    document.querySelectorAll(".cell");


    cells.forEach(cell=>{

        cell.className="cell";

    });



    snake.forEach(part=>{


        const index =
        part.y * gridSize + part.x;


        cells[index].classList.add("snake");


    });



    const foodIndex =
    food.y * gridSize + food.x;


    cells[foodIndex].classList.add("food");


}




// Update Game

function updateGame(){


    direction = nextDirection;



    let head = {

        x: snake[0].x,
        y: snake[0].y

    };



    if(direction==="up")
        head.y--;


    if(direction==="down")
        head.y++;


    if(direction==="left")
        head.x--;


    if(direction==="right")
        head.x++;




    if(

        head.x < 0 ||
        head.y < 0 ||
        head.x >= gridSize ||
        head.y >= gridSize ||

        snake.some(
            part =>
            part.x===head.x &&
            part.y===head.y
        )

    ){

        gameOver();

        return;

    }




    snake.unshift(head);



    if(

        head.x===food.x &&
        head.y===food.y

    ){

        score += 10;


        if(score % 50 === 0){

            level++;

            increaseSpeed();

        }


        createFood();


    }
    else{

        snake.pop();

    }



    updateScore();

    draw();

}




// Create Food

function createFood(){


    do{


        food={

            x:
            Math.floor(Math.random()*gridSize),


            y:
            Math.floor(Math.random()*gridSize)

        };


    }

    while(

        snake.some(
            part =>
            part.x===food.x &&
            part.y===food.y
        )

    );

}




// Speed Increase

function increaseSpeed(){


    speed -= 15;


    if(speed < 50)
        speed = 50;



    clearInterval(gameLoop);


    gameLoop =
    setInterval(updateGame,speed);


}




// Score Update

function updateScore(){


    scoreText.textContent=score;

    levelText.textContent=level;



    if(score > highScore){

        highScore=score;


        localStorage.setItem(
            "snakeHighScore",
            highScore
        );

    }


    highScoreText.textContent=highScore;


}




// Game Over

function gameOver(){


    clearInterval(gameLoop);


    statusText.textContent="Game Over";


    gameOverScreen.classList.remove("hidden");


}




// Pause System

function pauseGame(){


    if(isPaused){


        gameLoop =
        setInterval(updateGame,speed);


        statusText.textContent="Playing";


        pauseButton.textContent="Pause";


        isPaused=false;


    }

    else{


        clearInterval(gameLoop);


        statusText.textContent="Paused";


        pauseButton.textContent="Resume";


        isPaused=true;


    }


}




// Keyboard Controls

document.addEventListener(
"keydown",
event=>{


let key =
event.key.toLowerCase();



if(
(key==="arrowup" || key==="w")
&& direction!=="down"
)
nextDirection="up";



if(
(key==="arrowdown" || key==="s")
&& direction!=="up"
)
nextDirection="down";



if(
(key==="arrowleft" || key==="a")
&& direction!=="right"
)
nextDirection="left";



if(
(key==="arrowright" || key==="d")
&& direction!=="left"
)
nextDirection="right";


});





// Buttons

playButton.addEventListener(
"click",
startGame
);



restartButton.addEventListener(
"click",
startGame
);



pauseButton.addEventListener(
"click",
pauseGame
);



resetScoreButton.addEventListener(
"click",
()=>{


localStorage.removeItem(
"snakeHighScore"
);


highScore=0;


highScoreText.textContent=0;


});





// Initial Board

createBoard();