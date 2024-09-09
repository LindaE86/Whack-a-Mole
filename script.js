document.addEventListener(
    "DOMContentLoaded", function () {
        const holes =
            document.querySelectorAll(".hole");
<<<<<<< Updated upstream
=======
        const scoreDisplay =
            document.getElementById("score");
        const timerDisplay =
            document.getElementById("timer");

>>>>>>> Stashed changes
        let bord;
        let startBtn; // används för reset och start
        let timer = 60;
        let score = 0;
        let reactionTime = [];
        let timeUp = false;

        function handleMoleClick() {
            if (!gameOver) {
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
            }
            this.classList.remove('mole');
        }