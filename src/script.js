import { updateScore, fetchTop10 } from './top10Handler.js';
import { db, savePlayerToDB } from './database.js';

export let startBtn; // används för reset och start
export let gameActive = false;
export let score = 0;
export let timeLeft = 5;
let playerName;

let holes;
let scoreDisplay; // uppdaterar poängen
let timeDisplay; // uppdaterar tiden
let topTime = 1000000000;
export let reactionTimes = [];

document.addEventListener("DOMContentLoaded", function () {
    holes = document.querySelectorAll(".hole");

    scoreDisplay = document.getElementById('scoreDisplay');
    timeDisplay = document.getElementById('timeDisplay');

    const reactionTimeList = document.getElementById('reactionTimeList'); 

    introSound = document.getElementById('introSound');
    gameOverSound = document.getElementById('gameOverSound');
    moleHitSound = document.getElementById('moleHitSound');

    introSound.volume = 0.3;
    gameOverSound.volume = 0.3;
    moleHitSound.volume = 0.3;

    if (!scoreDisplay || !timeDisplay) {
        console.error("scoreDisplay or timeDisplay element not found");
        return;
    }

    scoreDisplay.textContent = `Score: ${score}`;
    timeDisplay.textContent = `Time Left: ${timeLeft}s`;

    startNewGameButton();

    holes.forEach(hole => {
        hole.addEventListener('click', function () {
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
        timeLeft = 5;
        gameActive = true;

        scoreDisplay.textContent = `Score: ${score}`;
        timeDisplay.textContent = `Time Left: ${timeLeft}s`;

        startBtn.disabled = true;
        introSound.play();
        startTimer();

        // Visa de första tre mullvadarna direkt
        for (let i = 0; i < 3; i++) {
            showNextMole();
        }
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
            introSound.pause();
            gameOverSound.play();
            fetchTop10();

            if (playerName) {
                updateScore(playerName, score);
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
    const index = Math.floor(Math.random() * holes.length);
    return holes[index];
}

// Funktion för att visa nästa mullvad
function showNextMole() {
    if (!gameActive) {
        return;
    }

    const activeMoles = Array.from(holes).filter(hole => hole.children[0].classList.contains('active')).length;

    if (activeMoles < 3) {
        let randomHole = getRandomHole();

        // Kontrollera att hålet inte redan har en aktiv mullvad
        if (!randomHole.children[0].classList.contains('active')) {
            randomHole.children[0].classList.add('active');
            randomHole.dataset.startTime = performance.now(); // Spara starttid för reaktionstid

            // Ta bort mullvaden efter 4 sekunder
            setTimeout(() => {
                if (randomHole.children[0].classList.contains('active')) {
                    randomHole.children[0].classList.remove('active');
                }
            }, 4000);

            // Anropa showNextMole efter en viss fördröjning
            setTimeout(showNextMole, Math.random() * 1500 + 1000); // Fördröjning mellan 1 och 2 sekunder
        }
    } else {
        // Om det redan finns tre aktiva, vänta och försök igen
        setTimeout(showNextMole, 1000); // Vänta 1 sekund innan nästa försök
    }
}

// Funktion för att uppdatera poängen vid moleclick när spelet är aktivt
function handleMoleClick() {
    if (gameActive) {
        moleHitSound.play();
        score++;
        scoreDisplay.textContent = `Score: ${score}`;

        const endTime = performance.now();
        const reactionTime = endTime - this.dataset.startTime; // Beräkna reaktionstid

        // Kontrollera att this.dataset.startTime är definierad
        if (!this.dataset.startTime) {
            console.error("Start time is undefined!");
            return;
        }

        // Kontrollera om reactionTime är ett giltigt nummer
        if (typeof reactionTime !== 'number' || isNaN(reactionTime)) {
            console.error("Invalid reaction time:", reactionTime);
            return; // Avbryt om reactionTime inte är giltigt
        }
    // Kontrollera om reactionTime är ett giltigt nummer
    if (typeof reactionTime !== 'number' || isNaN(reactionTime)) {
        console.error("Invalid reaction time:", reactionTime);
        return; // Avbryt om reactionTime inte är giltigt
    }


        topTime = Math.min(topTime, reactionTime);

        // Lägger till spelarens reaktionstid och sorterar listan
        reactionTimes.push({ name: playerName, time: reactionTime });
        reactionTimes.sort((a, b) => a.time - b.time); // Sortera efter tid

        // Begränsa till topp 10
        if (reactionTimes.length > 10) {
            reactionTimes.pop(); 
        }

        // Spara reaktionstid och poäng i databasen
        if (playerName) {
            // console.log("Saving player to DB with reaction time:", reactionTime);
            updateScore(playerName, score, reactionTime);
        } else {
            console.error("playerName is undefined!");
        }

        // Uppdatera visningen
        displayReactionTimes();
    }
    this.children[0].classList.remove('active');  // Ta bort 'active' klassen från mollen
    this.removeAttribute('data-startTime');
}



function displayReactionTimes() {
    const reactionTimeList = document.getElementById('reactionTimeList');
    if (!reactionTimeList) {
        console.error("reactionTimeList element not found");
        return;
    }

    reactionTimeList.innerHTML = '';

    reactionTimes.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.name}: ${entry.time.toFixed(2)} ms`;
        reactionTimeList.appendChild(listItem);
    });
}


