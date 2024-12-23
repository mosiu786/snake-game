const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// تنظیمات بازی
const box = 20; // اندازه هر خانه
const canvasSize = 400; // اندازه کانواس
let snake = [{ x: box * 5, y: box * 5 }]; // مار اولیه
let direction = 'RIGHT'; // جهت پیش‌فرض
let food = generateFood(); // مکان غذا
let score = 0;

// توابع اصلی بازی

// تولید مکان تصادفی برای غذا
function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvasSize / box)) * box,
        y: Math.floor(Math.random() * (canvasSize / box)) * box,
    };
}

// رسم غذا
function drawFood() {
    ctx.beginPath();
    ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.shadowColor = 'rgba(255, 0, 0, 0.8)';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0; // ریست سایه
    ctx.closePath();
}

// رسم مار
function drawSnake() {
    snake.forEach((segment, index) => {
        const gradient = ctx.createLinearGradient(segment.x, segment.y, segment.x + box, segment.y + box);
        gradient.addColorStop(0, index % 2 === 0 ? 'green' : 'lime');
        gradient.addColorStop(1, 'yellow');

        ctx.fillStyle = gradient;
        ctx.fillRect(segment.x, segment.y, box, box);

        // اضافه کردن حاشیه به هر بخش مار
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

    // اگر مار غذا خورد
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood(); // تولید غذا جدید
    } else {
        snake.pop(); // حذف انتهای مار
    }
}

// بررسی برخوردها
function checkCollision() {
    const head = snake[0];

    // برخورد با دیوارها
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        return true;
    }

    // برخورد با خودش
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// حلقه اصلی بازی
function gameLoop() {
    if (checkCollision()) {
        alert(`Game Over! Your score: ${score}`);
        document.location.reload();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height); // پاک کردن کانواس
    drawFood(); // رسم غذا
    moveSnake(); // حرکت مار
    drawSnake(); // رسم مار
}

// تنظیم جهت حرکت مار با کلیدها
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

// دکمه شروع بازی
document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('start-screen').style.display = 'none'; // مخفی کردن صفحه شروع
    setInterval(gameLoop, 100); // شروع حلقه بازی
});
