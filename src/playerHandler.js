import { startBtn } from '../script.js'; // Importera startBtn
import { savePlayerToDB } from './database.js';
// document.addEventListener("DOMContentLoaded", function () {
    let MODAL = document.getElementById("modal");
    let input = document.getElementById("modalInputName");
    let saveBtn = document.getElementById("modalBtn");
    let playerName;
    let players = [];

    let div = document.createElement("div");
    input.after(div);

    if (!saveBtn) {
        console.error("saveBtn not found! Check if the button ID matches in the HTML.");

    }

    // Startknappen ska vara inaktiverad tills ett giltigt namn har angetts
    startBtn.disabled = true;

    //klicka på save user button
    saveBtn.addEventListener("click", (e) => {
        let value = input.value.trim(); // Trimma eventuella mellanslag
        playerName = value;

        if (playerName) {
            savePlayer(playerName);
        } else {
            div.style.color = "red";
            div.innerHTML = "Name cannot be empty!";
        }
    });

    export function savePlayer(player) {
        if (players.includes(player)) {
            // Visa felmeddelande om namnet redan finns
            div.style.fontSize = "12px";
            div.style.color = "red";
            div.style.height = "0";
            div.style.overflow = "visible";
            div.innerHTML = "This name is already taken";
            startBtn.disabled = true;
        } else {
            // Spara spelarnamnet om det är nytt
            div.innerHTML = "";
            console.log("saving player button presed and name is okey")
            players.push(playerName); // Lägg till namnet i players-arrayen

            // Stäng modalen och visa spelet
            MODAL.classList.remove("modalContainer");
            MODAL.classList.add("WHACKAMOLE", "fadeOut");
            MODAL.innerHTML = "Let's whack some moles!!!";
            setTimeout(() => {
                MODAL.style.display = "none"; // Göm modalen efter en kort fördröjning
                startBtn.disabled = false;
             }, 1000);
            
              savePlayerToDB();
            // Aktivera startknappen så att spelet kan börja
          
        }
    }
//});
