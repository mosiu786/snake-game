const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const box = 20;
const canvasSize = 400;
let snake = [{ x: box * 5, y: box * 5 }];
let direction = 'RIGHT';
let food = generateFood();
let score = 0;
let displayedText = ""; // For displaying U, N, I, Q, U, E and MUSLIM
const sequence = "UNIQUE MUSLIM"; // Sequence of characters and spaces

// Draw food
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);
}

// Generate food at random position
function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvasSize / box)) * box,
        y: Math.floor(Math.random() * (canvasSize / box)) * box,
    };
}

// Draw snake
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, box, box);
    });
}

// Display text at the top
function drawText() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(displayedText, canvasSize / 2, 30);
}

// Move snake
function moveSnake() {
    const head = { ...snake[0] };
    if (direction === 'UP') head.y -= box;
    if (direction === 'DOWN') head.y += box;
    if (direction === 'LEFT') head.x -= box;
    if (direction === 'RIGHT') head.x += box;

    snake.unshift(head);

    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood();
        updateDisplayedText(); // Update the displayed text when food is eaten
    } else {
        snake.pop();
    }
}

// Update the displayed text
function updateDisplayedText() {
    if (displayedText.length < sequence.length) {
        displayedText += sequence[displayedText.length];
    }

    // End game when "MUSLIM" is complete
    if (displayedText.trim() === "MUSLIM") {
        setTimeout(() => {
            alert("مبارک باشه برنده شدی! عشق مسلم ❤️");
            document.location.reload();
        }, 100); // Delay for better user experience
    }
}

// Check for collisions
function checkCollision() {
    const head = snake[0];

    // Wall collision
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        return true;
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// Game loop
function gameLoop() {
    if (checkCollision()) {
        alert(`Game Over! Your score: ${score}`);
        document.location.reload();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawText(); // Draw the displayed text
    drawFood();
    moveSnake();
    drawSnake();
}

// Change direction
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

// Start game
setInterval(gameLoop, 100);
