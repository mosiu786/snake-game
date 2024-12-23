document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('start-screen').style.display = 'none'; // مخفی کردن صفحه شروع
    setInterval(gameLoop, 80); // شروع بازی
});

// افکت لرزش برای برخورد
function shakeCanvas() {
    const canvas = document.getElementById('gameCanvas');
    const offset = 5;
    canvas.style.position = 'relative';
    canvas.animate(
        [
            { transform: `translate(${offset}px, ${offset}px)` },
            { transform: `translate(-${offset}px, -${offset}px)` },
            { transform: 'translate(0, 0)' }
        ],
        {
            duration: 100,
            iterations: 3,
        }
    );
}

// بررسی برخوردها
function checkCollision() {
    const head = snake[0];

    // برخورد با دیوار
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        shakeCanvas();
        return true;
    }

    // برخورد با خود
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            shakeCanvas();
            return true;
        }
    }

    return false;
}
