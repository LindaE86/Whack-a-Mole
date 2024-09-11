// Låt globala variablerna ligga överst :)
let board;
let startBtn; // används för reset och start
let timeLeft = 60;
let score = 0;
let reactionTime = [];
let timeUp = false;
let gameActive = false;

document.addEventListener("DOMContentLoaded", function () {
    const holes = document.querySelectorAll(".hole");

    // Start Game-knapp och uppdateringsfunktioner
    const scoreDisplay = document.getElementById('scoreDisplay');
    const timeDisplay = document.getElementById('timeDisplay');

    // Score and Time display som visas på skärmen
    scoreDisplay.textContent = `Score: ${score}`;
    timeDisplay.textContent = `Time Left: ${timeLeft}s`;

    // Anropa funktionen för att skapa knappen när sidan laddas
    startNewGameButton();

    // Funktion för att starta spelet
    function startNewGame() {
        if (!gameActive) {
            // Återställer dessa värden när man klickar
            score = 0;
            timeLeft = 60;
            gameActive = true;

            // Uppdatera skärmvisningen
            scoreDisplay.textContent = `Score: ${score}`;
            timeDisplay.textContent = `Time Left: ${timeLeft}s`;

            // Inaktivera knappen när spelet startar
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

                // Aktivera knappen igen när spelet är slut
                startBtn.disabled = false;
            }
        }, 1000);
    }

    // Funktion för att skapa en Start New Game Button och spara referens till den i startBtn
    function startNewGameButton() {
        startBtn = document.createElement('button');
        startBtn.innerText = 'Start New Game';
        startBtn.id = 'startNewGameButton';
        startBtn.disabled = gameActive; // sätt knappen som icke klickbar om spelet är aktivt

        // kopplar knappen till funktionen startNewGame()
        startBtn.addEventListener('click', startNewGame);

        document.getElementById('startGameButton').appendChild(startBtn);
    }
});
