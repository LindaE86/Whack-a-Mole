
export let startBtn; // används för reset och start
export let gameActive = false;
export let score = 0;
export let timeLeft = 60;

let holes; 
let scoreDisplay; // uppdaterar poängen
let timeDisplay; // uppdaterar tiden

document.addEventListener("DOMContentLoaded", function () {
    holes = document.querySelectorAll(".hole"); 

    scoreDisplay = document.getElementById('scoreDisplay');
    timeDisplay = document.getElementById('timeDisplay');

    if (!scoreDisplay || !timeDisplay) {
        console.error("scoreDisplay or timeDisplay element not found");
        return; 
    }

    scoreDisplay.textContent = `Score: ${score}`;
    timeDisplay.textContent = `Time Left: ${timeLeft}s`;

    // Anropa startNewGameButton
    startNewGameButton();

    // Lägg till event listener till alla hål, så att bara de med moles blir klickbara för poäng
    holes.forEach(hole => {
        hole.addEventListener('click', function() {
            if (hole.classList.contains('active')) {
                handleMoleClick.call(hole); 
            }
        });
    });
});

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

        showThreeRandomMoles();
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

function getRandomHole() {
    const holes = document.querySelectorAll(".hole");
    const index = Math.floor(Math.random() * holes.length);
    return holes[index];
}

// Funktion för att visa tre slumpmässiga moles
function showThreeRandomMoles() {
    let chosenMoles = [];

    const interval = setInterval(() => {
        if (!gameActive) {
            clearInterval(interval);
            return;
        }

        // Kontrollerar så bara tre aktiva moles visas samtidigt
        if (chosenMoles.length >= 3) {
            return;  
        }

        let randomHole = getRandomHole();  // Hämta ett slumpmässigt hål

        // Lägg till hålet i listan över valda moles och visa en mole
        chosenMoles.push(randomHole);
        randomHole.classList.add('active');

        // Ta bort mollen efter 4 sekunder
        setTimeout(() => {
            randomHole.classList.remove('active');
            chosenMoles = chosenMoles.filter(hole => hole !== randomHole); 
        }, 4000);

    }, Math.random() * 2000 + 1000); // Slumpmässig fördröjning mellan 1 till 3 sekunder
}

// Funktion för att uppdatera poängen vid moleclick när spelet är aktivt
function handleMoleClick() {
    if (gameActive) {  
        score++;  
        scoreDisplay.textContent = `Score: ${score}`;  
    }
    this.classList.remove('active');  // Ta bort 'active' klassen från mollen så att den försvinner
}
