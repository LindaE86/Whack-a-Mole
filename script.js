document.addEventListener(
    "DOMContentLoaded", function () {
        const holes =
            document.querySelectorAll(".hole");
        const scoreDisplay =
            document.getElementById("score");
        const timerDisplay =
            document.getElementById("timer");

        let chosenMoles = [];
        let bord;
        let startBtn; // används för reset och start
        let timer = 60;
        let score = 0;
        let reactionTime = [];
        let timeUp = false;
        let moleCount = 0;

        // Funktion som körs när man klickar på en mole
        function handleMoleClick() {
            if (!timeUp) {
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
                this.classList.remove('active'); // Ta bort mole när den klickas på
            }
        }

        // Lägg till lyssnare för att klicka på hålen
        holes.forEach(hole => {
            hole.addEventListener('click', handleMoleClick);
        });

        // Funktion för att välja ett slumpmässigt hål
        function getRandomHole() {
            const randomIndex = Math.floor(Math.random() * holes.length);
            return holes[randomIndex];
        }

        // Funktion för att kontrollera om två hål är på samma rad
        function isOnSameRow(hole1, hole2) {
            const row1 = Math.floor(Array.from(holes).indexOf(hole1) / 5);
            const row2 = Math.floor(Array.from(holes).indexOf(hole2) / 5);
            return row1 === row2;
        }

        // Funktion för att visa tre slumpmässiga moles
        function showThreeRandomMoles() {
            let moleCount = 0;

            const interval = setInterval(() => {
                if (moleCount >= 3 || timeUp) {
                    clearInterval(interval);
                    return;
                }

                let randomHole = getRandomHole();

                // Kolla att det nya hålet inte är på samma rad som tidigare valda
                while (chosenMoles.some(chosenHole => isOnSameRow(chosenHole, randomHole))) {
                    randomHole = getRandomHole();
                }

                // Lägg till hålet i listan över valda moles och visa en mole
                chosenMoles.push(randomHole);
                randomHole.classList.add('active');

                // Ta bort mollen efter 4 sekunder
                setTimeout(() => {
                    randomHole.classList.remove('active');
                    chosenMoles = chosenMoles.filter(hole => hole !== randomHole);
                }, 4000);

                moleCount++;
            }, Math.random() * 2000 + 1000); // Slumpmässig fördröjning mellan 1 till 3 sekunder
        }


        showThreeRandomMoles();
    });

