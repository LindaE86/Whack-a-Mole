document.addEventListener(
    "DOMContentLoaded", function () {
        const holes =
            document.querySelectorAll(".hole");
        let bord;
        let startBtn; // används för reset och start
        let timeLeft = 60;
        let score = 0;
        let reactionTime = [];
        let timeUp = false;