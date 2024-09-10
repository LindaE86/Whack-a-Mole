document.addEventListener(
    "DOMContentLoaded", function () {
        const holes =
            document.querySelectorAll(".hole");
        let bord;
        let reactionTime = [];
        let timeUp = false;
    }
);

        /* Körde en const på startBtn i koden*/
let score = 0;
let timeLeft = 60;
let gameActive = false;

// väntar på att allt på sidan ska laddas innan koden körs
document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startNewGameButton');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const timeDisplay = document.getElementById('timeDisplay');

    // Visas på skärmen
    scoreDisplay.textContent = `Score: ${score}`;
    timeDisplay.textContent = `Time Left: ${timeLeft}s`;
    
    startBtn.addEventListener('click', function() {
        // återsäller dessa värden när man klickar
        score = 0;
        timeLeft = 60;
        gameActive = true;

        scoreDisplay.textContent = `Score: ${score}`;
        timeDisplay.textContent = `Time Left: ${timeLeft}s`;
        startTimer();
    });

    function startTimer() {
        const timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timeDisplay.textContent = `Time Left: ${timeLeft}s`;
            } else {
                clearInterval(timerInterval);
                gameActive = false;
                alert('Game over: ' + score);
                // Återställer knappen och startar igen
                startBtn.disabled = false;
            }
        }, 1000);
    }
});