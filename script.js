const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// تنظیمات بازی
const box = 20;
const canvasSize = 400;
let snake = [{ x: box * 5, y: box * 5 }];
let direction = 'RIGHT';
let food = generateFood();
let score = 0;
let gameInterval; // برای کنترل حلقه بازی

// متن هدف
const goalText = "UNIQUE MUSLIM";
let collectedText = "";

// شروع بازی
document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('start-screen').style.display = 'none'; // مخفی کردن صفحه شروع
    gameInterval = setInterval(gameLoop, 2000); // شروع حلقه بازی
});

// رسم غذا
function drawFood() {
    ctx.beginPath();
    ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.shadowColor = 'rgba(255, 0, 0, 0.8)';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0; // بازنشانی سایه
    ctx.closePath();
}

// تولید مکان تصادفی برای غذا
function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvasSize / box)) * box,
        y: Math.floor(Math.random() * (canvasSize / box)) * box,
    };
}

// رسم مار
function drawSnake() {
    snake.forEach((segment, index) => {
        const gradient = ctx.createLinearGradient(segment.x, segment.y, segment.x + box, segment.y + box);
        gradient.addColorStop(0, index % 2 === 0 ? 'green' : 'lime');
        gradient.addColorStop(1, 'yellow');

        ctx.fillStyle = gradient;
        ctx.fillRect(segment.x, segment.y, box, box);

        // اضافه کردن حاشیه برای هر قطعه
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(segment.x, segment.y, box, box);
    });
}

// حرکت مار
function moveSnake() {
    const head = { ...snake[0] };
    if (direction === 'UP') head.y -= box;
    if (direction === 'DOWN') head.y += box;
    if (direction === 'LEFT') head.x -= box;
    if (direction === 'RIGHT') head.x += box;

    snake.unshift(head);

    // برخورد با غذا
    if (head.x === food.x && head.y === food.y) {
        collectedText += goalText[collectedText.length];
        food = generateFood();

        // اگر متن کامل شد
        if (collectedText === goalText) {
            endGame("آفرین نیم وجبی اینم جایزت اممممماچ 💋");
        }
    } else {
        snake.pop();
    }
}

// کنترل جهت حرکت
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

document.getElementById('up').addEventListener('click', () => {
    if (direction !== 'DOWN') direction = 'UP';
});
document.getElementById('down').addEventListener('click', () => {
    if (direction !== 'UP') direction = 'DOWN';
});
document.getElementById('left').addEventListener('click', () => {
    if (direction !== 'RIGHT') direction = 'LEFT';
});
document.getElementById('right').addEventListener('click', () => {
    if (direction !== 'LEFT') direction = 'RIGHT';
});

// چک کردن برخورد با دیواره
function checkCollision() {
    const head = snake[0];

    // برخورد با دیواره
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        endGame("باختی! مار با دیوار برخورد کرد.");
        return true;
    }

    // برخورد با خودش
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame("باختی! مار به خودش برخورد کرد.");
            return true;
        }
    }

    return false;
}

// پایان بازی
function endGame(message) {
    clearInterval(gameInterval); // توقف حلقه بازی
    document.getElementById('game-over-message').innerText = message;
    document.getElementById('game-over-screen').style.display = 'flex';

    // نمایش کنفتی
    confetti.start();
    setTimeout(() => confetti.stop(), 5000);
}

// حلقه بازی
function gameLoop() {
    if (checkCollision()) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    moveSnake();
    drawSnake();

    // نمایش متن
    ctx.fillStyle = "black";
    ctx.font = "18px Arial";
    ctx.fillText("متن: " + collectedText, 10, 20);
}
