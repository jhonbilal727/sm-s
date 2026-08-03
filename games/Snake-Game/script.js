const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const finalScoreEl = document.getElementById("finalScore");

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const gridSize = 20;
const tileSize = canvas.width / gridSize;

let snake = [];
let food = { x: 0, y: 0 };
let dx = 1;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem("snakeHighScore") || 0;
let gameInterval = null;
let changingDirection = false;

highScoreEl.textContent = highScore;

function startGame() {
    startScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");
    
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    score = 0;
    scoreEl.textContent = score;
    dx = 1;
    dy = 0;
    
    spawnFood();
    
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(main, 120);
}

function main() {
    changingDirection = false;
    clearCanvas();
    drawFood();
    moveSnake();
    
    if (checkGameOver()) {
        endGame();
        return;
    }
    
    drawSnake();
}

function clearCanvas() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "#111" : "#333";
        ctx.fillRect(part.x * tileSize, part.y * tileSize, tileSize - 2, tileSize - 2);
    });
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    // Screen wrapping behavior
    if (head.x < 0) head.x = gridSize - 1;
    if (head.x >= gridSize) head.x = 0;
    if (head.y < 0) head.y = gridSize - 1;
    if (head.y >= gridSize) head.y = 0;
    
    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreEl.textContent = score;
        if (score > highScore) {
            highScore = score;
            highScoreEl.textContent = highScore;
            localStorage.setItem("snakeHighScore", highScore);
        }
        spawnFood();
    } else {
        snake.pop();
    }
}

function spawnFood() {
    food.x = Math.floor(Math.random() * gridSize);
    food.y = Math.floor(Math.random() * gridSize);
    
    // Ensure food doesn't spawn on top of snake
    snake.forEach(part => {
        if (part.x === food.x && part.y === food.y) {
            spawnFood();
        }
    });
}

function drawFood() {
    ctx.fillStyle = "#ff3b30";
    ctx.beginPath();
    ctx.arc(
        (food.x * tileSize) + tileSize / 2,
        (food.y * tileSize) + tileSize / 2,
        tileSize / 2 - 3,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

function checkGameOver() {
    // Self collision check only (walls wrap around smoothly)
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    return false;
}

function endGame() {
    clearInterval(gameInterval);
    finalScoreEl.textContent = score;
    gameOverScreen.classList.remove("hidden");
}

document.addEventListener("keydown", e => {
    if (changingDirection) return;
    
    const key = e.key.toLowerCase();
    
    if ((key === "arrowup" || key === "w") && dy === 0) {
        dx = 0; dy = -1;
        changingDirection = true;
    }
    if ((key === "arrowdown" || key === "s") && dy === 0) {
        dx = 0; dy = 1;
        changingDirection = true;
    }
    if ((key === "arrowleft" || key === "a") && dx === 0) {
        dx = -1; dy = 0;
        changingDirection = true;
    }
    if ((key === "arrowright" || key === "d") && dx === 0) {
        dx = 1; dy = 0;
        changingDirection = true;
    }
});

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);