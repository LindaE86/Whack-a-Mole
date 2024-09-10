// Funktion för att skapa en Start New Game Button
export function startNewGameButton() {

    const button = document.createElement('button');

    button.innerText = 'Start New Game';

    // kopplar knappen till funktionen startNewGame(3)
    button.addEventListener('click', startNewGame);

    document.getElementById('startGameButton').appendChild(button);

    //satt knappen som icke klickbar när spelet är startat
    startNewGameButton.disabled = true;
}


// Anropa funktionen för att skapa knappen när sidan laddas
window.onload = startNewGameButton;
