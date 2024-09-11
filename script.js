// script.js

export let startBtn; // används för reset och start
export let gameActive = false;
export let score = 0;
export let timeLeft = 60;

document.addEventListener("DOMContentLoaded", function () {
    const holes = document.querySelectorAll(".hole");

    // Score och Time display som visas på skärmen
    const scoreDisplay = document.getElementById('scoreDisplay');
    const timeDisplay = document.getElementById('timeDisplay');

    scoreDisplay.textContent = `Score: ${score}`;
    timeDisplay.textContent = `Time Left: ${timeLeft}s`;

    // Anropa funktionen för att skapa knappen när sidan laddas
    startNewGameButton();

    // Funktion för att starta spelet
    function startNewGame() {
        if (!gameActive) {
            score = 0;
            timeLeft = 60;
            gameActive = true;

            scoreDisplay.textContent = `Score: ${score}`;
            timeDisplay.textContent = `Time Left: ${timeLeft}s`;

            startBtn.disabled = true;

            startTimer();
        }
    }

    // Funktion för att starta nedräkning
    function startTimer() {
        const timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timeDisplay.textContent = `Time Left: ${timeLeft}s`;
            } else {
                clearInterval(timerInterval);
                gameActive = false;
                alert('Game over: ' + score);

                startBtn.disabled = false;
            }
        }, 1000);
    }

    // Funktion för att skapa en Start New Game Button och spara referens till den i startBtn
    function startNewGameButton() {
        startBtn = document.createElement('button');
        startBtn.innerText = 'Start New Game';
        startBtn.id = 'startNewGameButton';
        startBtn.disabled = gameActive;

        startBtn.addEventListener('click', startNewGame);

        document.getElementById('startGameButton').appendChild(startBtn);
    }
});
