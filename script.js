/* برای مرکز کردن تمام محتوا در صفحه */
body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    margin: 0;
    background-image: url('background-image.jpg'); /* مسیر تصویر زمینه */
    background-size: cover;
    background-position: center;
    animation: moveBackground 30s linear infinite;
    font-family: Arial, sans-serif;
}

/* استایل برای صفحه شروع */
#start-screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}

#startButton {
    padding: 15px 30px;
    font-size: 20px;
    background: linear-gradient(145deg, #4CAF50, #3E8E41);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

#startButton:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

/* استایل کانواس */
canvas {
    border: 2px solid #333;
    background-color: rgba(255, 255, 255, 0.8);
    margin-top: 20px;
}

/* استایل کنترل‌ها */
#controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

.row {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 5px 0;
}

#controls button {
    width: 60px;
    height: 60px;
    font-size: 24px;
    border: none;
    border-radius: 10px;
    background: linear-gradient(145deg, #4CAF50, #3E8E41);
    color: white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.2s, box-shadow 0.2s;
}

#controls button:hover {
    transform: scale(1.1);
    box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.5);
}
