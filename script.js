const player = document.getElementById('player');
const enemy = document.getElementById('enemy');
const gameContainer = document.getElementById('game-container');
const scoreElement = document.getElementById('score');
const playButton = document.getElementById('play-button');

const containerWidth = gameContainer.clientWidth;
const containerHeight = gameContainer.clientHeight;

let playerX, playerY, enemyX, enemyY, enemySpeed, score, level;
const initialPlayerSpeed = 10; // Aumentar a velocidade do jogador
const playerSpeed = initialPlayerSpeed;
const speedIncreaseInterval = 5000; // Aumentar a velocidade a cada 5 segundos
const enemySpeedIncrement = 0.5;

let gameInterval;
let speedInterval;

function resetGame() {
    playerX = containerWidth / 2 - 25;
    playerY = containerHeight - 60;
    enemyX = Math.random() * (containerWidth - 50);
    enemyY = -50;
    enemySpeed = 2;
    score = 0;
    level = 1;
    scoreElement.textContent = `Score: ${score}`;
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;
    enemy.style.left = `${enemyX}px`;
    enemy.style.top = `${enemyY}px`;
    playButton.classList.remove('hidden');
}

function startGame() {
    playButton.classList.add('hidden');
    resetGame();
    gameInterval = requestAnimationFrame(update);
    speedInterval = setInterval(() => {
        enemySpeed += enemySpeedIncrement; // Aumentar a velocidade do inimigo
        level += 1; // Aumentar o nível
    }, speedIncreaseInterval);
}

function update() {
    // Move enemy down
    enemyY += enemySpeed;

    // Check if enemy is off the screen
    if (enemyY > containerHeight) {
        enemyY = -50;
        enemyX = Math.random() * (containerWidth - 50);
        score += 10; // Increase score when the enemy moves off the screen
        scoreElement.textContent = `Score: ${score}`;
    }

    // Check for collision
    if (
        playerX < enemyX + 50 &&
        playerX + 50 > enemyX &&
        playerY < enemyY + 50 &&
        playerY + 50 > enemyY
    ) {
        alert('Game Over! Final Score: ' + score);
        cancelAnimationFrame(gameInterval);
        clearInterval(speedInterval);
        resetGame();
        return;
    }

    // Update positions
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;
    enemy.style.left = `${enemyX}px`;
    enemy.style.top = `${enemyY}px`;

    gameInterval = requestAnimationFrame(update);
}

// Handle player movement
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            playerX = Math.max(0, playerX - playerSpeed);
            break;
        case 'ArrowRight':
            playerX = Math.min(containerWidth - 50, playerX + playerSpeed);
            break;
        case 'ArrowUp':
            playerY = Math.max(0, playerY - playerSpeed);
            break;
        case 'ArrowDown':
            playerY = Math.min(containerHeight - 50, playerY + playerSpeed);
            break;
    }
});

playButton.addEventListener('click', startGame);
