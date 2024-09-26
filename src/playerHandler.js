import { setPlayerName, startBtn, topTime } from './script.js'; // Importera setPlayerName
import { savePlayerToDB } from './database.js';
import { fetchTop10, updateScore, hideTop10List } from './top10Handler.js';
import { score } from './script.js';

document.addEventListener("DOMContentLoaded", function () {
    let MODAL = document.getElementById("modal");
    let input = document.getElementById("modalInputName");
    let saveBtn = document.getElementById("modalBtn");
    let players = ["la"];

    let div = document.createElement("div");
    input.after(div);

    if (!saveBtn) {
        console.error("saveBtn not found! Check if the button ID matches in the HTML.");
        return;
    }

    // Startknappen ska vara inaktiverad tills ett giltigt namn har angetts
    startBtn.disabled = true;

    // Klicka på save user button
    saveBtn.addEventListener("click", (e) => {
        let value = input.value.trim(); // Trimma eventuella mellanslag

        if (value) {
            console.log("Player name to save:", value); 
            setPlayerName(value); // Sätt spelarnamn
            savePlayer(value); // Skicka värdet till savePlayer
        } else {
            div.style.color = "red";
            div.innerHTML = "Name cannot be empty!";
        }
    });

    function savePlayer(playerName) { // Ta emot playerName som parameter
        if (players.includes(playerName)) { // Kolla mot värdet
            // Felmeddelande om namnet redan finns
            div.innerHTML = "This name is already taken";
            div.style.color = "red";
            startBtn.disabled = true;
        } else {
            // Spara spelarnamnet om det är nytt
            players.push(playerName); // Lägg till namnet i players-arrayen
            div.innerHTML = ""; // Rensa 
    
            // Stäng modalen och visa spelet
            MODAL.classList.remove("modalContainer");
            MODAL.classList.add("WHACKAMOLE", "fadeOut");
            MODAL.innerHTML = "Let's whack some moles!!!";
            setTimeout(() => {
                MODAL.style.display = "none"; // Göm modalen
            }, 1000);
    
            console.log("Saving player to DB:", playerName);
            // Spara spelarnamnet i databasen
            savePlayerToDB(playerName, score, topTime); // Kontrollera att score har rätt värde
    
            // Aktivera startknappen
            startBtn.disabled = false;
        }
    }
});
