// Draw food with glow effect
function drawFood() {
    ctx.beginPath();
    ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.shadowColor = 'rgba(255, 0, 0, 0.8)';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0; // Reset shadow
    ctx.closePath();
}

// Draw snake with gradient colors
function drawSnake() {
    snake.forEach((segment, index) => {
        const gradient = ctx.createLinearGradient(segment.x, segment.y, segment.x + box, segment.y + box);
        gradient.addColorStop(0, index % 2 === 0 ? 'green' : 'lime');
        gradient.addColorStop(1, 'yellow');

        ctx.fillStyle = gradient;
        ctx.fillRect(segment.x, segment.y, box, box);

        // Add border for each segment
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(segment.x, segment.y, box, box);
    });
}

// Vibration effect for collision
function shakeCanvas() {
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
            iterations: 3
        }
    );
}

// Check for collisions
function checkCollision() {
    const head = snake[0];

    // Wall collision
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        shakeCanvas(); // Shake effect
        return true;
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            shakeCanvas(); // Shake effect
            return true;
        }
    }

    return false;
}
