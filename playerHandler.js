import { startBtn } from './script.js'; // Importera startBtn

document.addEventListener("DOMContentLoaded", function () {
    let MODAL = document.getElementById("modal");
    let input = document.getElementById("modalInputName");
    let saveBtn = document.getElementById("modalBtn");
    let playerName;
    let players = ["la"];

    let div = document.createElement("div");
    input.after(div);

    if (!saveBtn) {
        console.error("saveBtn not found! Check if the button ID matches in the HTML.");
        return;

    }

    // Startknappen ska vara inaktiverad tills ett giltigt namn har angetts
    startBtn.disabled = true;

    // klicka på save user button
    saveBtn.addEventListener("click", (e) => {
        let value = input.value.trim(); // Trimma eventuella mellanslag
        playerName = value;

        if (playerName) {
            savePlayer();
        } else {
            div.style.color = "red";
            div.innerHTML = "Name cannot be empty!";
        }
    });

    function savePlayer() {
        if (players.includes(playerName)) {
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
            players.push(playerName); // Lägg till namnet i players-arrayen

            // Logga alla spelarnamn för att verifiera att det sparats
            players.forEach((element) => {
                console.log(element);
            });

            // Stäng modalen och visa spelet
            MODAL.classList.remove("modalContainer");
            MODAL.classList.add("WHACKAMOLE", "fadeOut");
            MODAL.innerHTML = "Let's whack some moles!!!";
            setTimeout(() => {
                MODAL.style.display = "none"; // Göm modalen efter en kort fördröjning
            }, 1000);

            // Aktivera startknappen så att spelet kan börja
            startBtn.disabled = false;
        }
    }
});
