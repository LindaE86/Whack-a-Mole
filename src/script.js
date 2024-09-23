import { updateScore, fetchTop10, hideTop10List } from './top10Handler.js';
import { db, savePlayerToDB } from './database.js';

export let startBtn; // används för reset och start
export let gameActive = false;
export let score = 0;
export let timeLeft = 60;
let playerName; 

let holes; 
let scoreDisplay; // uppdaterar poängen
let timeDisplay; // uppdaterar tiden
let topTime = 1000000000;

document.addEventListener("DOMContentLoaded", function () {
    holes = document.querySelectorAll(".hole"); 

    scoreDisplay = document.getElementById('scoreDisplay');
    timeDisplay = document.getElementById('timeDisplay');

    introSound = document.getElementById('introSound');
    gameOverSound = document.getElementById('gameOverSound');
    moleHitSound = document.getElementById('moleHitSound');

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
            if (hole.children[0].classList.contains('active')) {
                handleMoleClick.call(hole); 
            }
        });
    });

});

export function setPlayerName(name) {
    playerName = name; // Funktion för att sätta spelarnamn
}

// Funktion för att starta spelet
function startNewGame() {
    if (!gameActive) {
        score = 0;
        timeLeft = 60;
        gameActive = true;

        scoreDisplay.textContent = `Score: ${score}`;
        timeDisplay.textContent = `Time Left: ${timeLeft}s`;

        startBtn.disabled = true;
        introSound.play();
        startTimer();

        setTimeout(()=> {
            showThreeRandomMoles();
        },1500)
        
    }
}


//Funktion för att starta nedräkning
function startTimer() {
    const timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timeDisplay.textContent = `Time Left: ${timeLeft}s`;
        } else {
            clearInterval(timerInterval);
            gameActive = false;
            introSound.pause()
            gameOverSound.play();
            fetchTop10();
            console.log("Score to be saved:", score);
            console.log("Username to be saved:", playerName); // Kontrollera att playerName är definierad

            // Kontrollera playerName 
            if (playerName) {
                updateScore(playerName, score);
                // savePlayerToDB(playerName, score);
            } else {
                console.error("playerName is undefined!");
            }
    

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
        randomHole.children[0].classList.add('active');

        randomHole.dataset.startTime = performance.now();


        // Ta bort mollen efter 4 sekunder
        setTimeout(() => {
            randomHole.children[0].classList.remove('active');
            chosenMoles = chosenMoles.filter(hole => hole !== randomHole); 
        }, 4000);

    }, Math.random() * 800 + 200); // Slumpmässig fördröjning mellan 1 till 3 sekunder
}

// Funktion för att uppdatera poängen vid moleclick när spelet är aktivt
function handleMoleClick() {
    if (gameActive) {  
        moleHitSound.play();
        score++;  
        scoreDisplay.textContent = `Score: ${score}`;  
        console.log("Current score:", score); 

        const endTime = performance.now();
        const reactionTime = endTime - this.dataset.startTime;
        topTime = Math.min(topTime, reactionTime);
        console.log("reactiontime:", reactionTime, "ms"); 
        console.log(topTime);
 
       
    }
    this.children[0].classList.remove('active');  // Ta bort 'active' klassen från mollen så att den försvinner
    this.removeAttribute('data-startTime');
}


