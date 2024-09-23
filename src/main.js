// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";      
// import { getFirestore, collection, addDoc,  } from  "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
// export let startBtn; // används för reset och start
// export let gameActive = false;
// export let score = 0;
// export let timeLeft = 60;

// let holes; 
// let scoreDisplay; // uppdaterar poängen
// let timeDisplay; // uppdaterar tiden
// let saveBtn = document.getElementById("modalBtn");
// let input = document.getElementById("modalInputName");
// startBtn = document.getElementById("startGameButton");
// // document.addEventListener("DOMContentLoaded", function () {
//     let MODAL = document.getElementById("modal");
   
//     let playerName;
//     let players = [];

// const firebaseConfig = {

// apiKey: "AIzaSyBUL8nzisxQI-tWMpIlp-UgPCgnLpHmtls",

// authDomain: "whack-a-mole-eabac.firebaseapp.com",

// databaseURL: "https://whack-a-mole-eabac-default-rtdb.europe-west1.firebasedatabase.app",

// projectId: "whack-a-mole-eabac",

// storageBucket: "whack-a-mole-eabac.appspot.com",

// messagingSenderId: "285189561061",

// appId: "1:285189561061:web:008eeda07a80915989520c"

// };


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// let db = getFirestore(app);

// export async function savePlayerToDB(){
// const hiscoreDocs = collection(db, 'hiscore');
// let playerName = document.getElementById("modalInputName");

// try {
// await addDoc(hiscoreDocs,
//   {
//       username: input.value,
//       score: 10
//   });
//   console.log("Data added successfully");
// } catch (error) {
//   console.error("Error adding document: ", error);
// }

// }
// // let btn = document.getElementById("modalBtn");
// // btn.addEventListener("click", savePlayer);


//     let div = document.createElement("div");
//     input.after(div);

//     if (!saveBtn) {
//         console.error("saveBtn not found! Check if the button ID matches in the HTML.");

//     }

//     // Startknappen ska vara inaktiverad tills ett giltigt namn har angetts
//     startBtn.disabled = true;

//     // klicka på save user button
//     saveBtn.addEventListener("click", (e) => {
//         let value = input.value.trim(); // Trimma eventuella mellanslag
//         playerName = value;

//         if (playerName) {
//             savePlayer();
//         } else {
//             div.style.color = "red";
//             div.innerHTML = "Name cannot be empty!";
//         }
//     });

//   function savePlayer() {
//         if (players.includes(playerName)) {
//             // Visa felmeddelande om namnet redan finns
//             div.style.fontSize = "12px";
//             div.style.color = "red";
//             div.style.height = "0";
//             div.style.overflow = "visible";
//             div.innerHTML = "This name is already taken";
//             startBtn.disabled = true;
//         } else {
//             // Spara spelarnamnet om det är nytt
//             div.innerHTML = "";
//             console.log("saving player button presed and name is okey")
//             players.push(playerName); // Lägg till namnet i players-arrayen

//             // Stäng modalen och visa spelet
//             MODAL.classList.remove("modalContainer");
//             MODAL.classList.add("WHACKAMOLE", "fadeOut");
//             MODAL.innerHTML = "Let's whack some moles!!!";
//             setTimeout(() => {
//                 MODAL.style.display = "none"; // Göm modalen efter en kort fördröjning
//                 startBtn.disabled = false;
//              }, 1000);
            
//               savePlayerToDB();
//             // Aktivera startknappen så att spelet kan börja
          
//         }
//     }
// //});

// // const hiscore = async (name, score, reactionTime) => {
// //     console.log("Trying to send data to firestore...");}

//     // klicka på save user button
//     saveBtn.addEventListener("click", (e) => {
//         let value = input.value.trim(); // Trimma eventuella mellanslag
//         playerName = value;

//         if (playerName) {
//             savePlayer();
//         } else {
//             div.style.color = "red";
//             div.innerHTML = "Name cannot be empty!";
//         }
//     });

// document.addEventListener("DOMContentLoaded", function () {
//     holes = document.querySelectorAll(".hole"); 

//     scoreDisplay = document.getElementById('scoreDisplay');
//     timeDisplay = document.getElementById('timeDisplay');

//     if (!scoreDisplay || !timeDisplay) {
//         console.error("scoreDisplay or timeDisplay element not found");
//         return; 
//     }

//     scoreDisplay.textContent = `Score: ${score}`;
//     timeDisplay.textContent = `Time Left: ${timeLeft}s`;

//     // Anropa startNewGameButton
//     startNewGameButton();

//     // Lägg till event listener till alla hål, så att bara de med moles blir klickbara för poäng
//     holes.forEach(hole => {
//         hole.addEventListener('click', function() {
//             if (hole.classList.contains('active')) {
//                 handleMoleClick.call(hole); 
//             }
//         });
//     });
// });

// // Funktion för att starta spelet
// function startNewGame() {
//     if (!gameActive) {
//         score = 0;
//         timeLeft = 60;
//         gameActive = true;

//         scoreDisplay.textContent = `Score: ${score}`;
//         timeDisplay.textContent = `Time Left: ${timeLeft}s`;

//         startBtn.disabled = true;

//         startTimer();

//         showThreeRandomMoles();
//     }
// }

// // Funktion för att starta nedräkning
// function startTimer() {
//     const timerInterval = setInterval(() => {
//         if (timeLeft > 0) {
//             timeLeft--;
//             timeDisplay.textContent = `Time Left: ${timeLeft}s`;
//         } else {
//             clearInterval(timerInterval);
//             gameActive = false;
//             alert('Game over: ' + score);

//             startBtn.disabled = false;
//         }
//     }, 1000);
// }

// // Funktion för att skapa en Start New Game Button och spara referens till den i startBtn
// function startNewGameButton() {
//     startBtn = document.createElement('button');
//     startBtn.innerText = 'Start New Game';
//     startBtn.id = 'startNewGameButton';
//     startBtn.disabled = gameActive;

//     startBtn.addEventListener('click', startNewGame);

//     document.getElementById('startGameButton').appendChild(startBtn);
// }

// function getRandomHole() {
//     const holes = document.querySelectorAll(".hole");
//     const index = Math.floor(Math.random() * holes.length);
//     return holes[index];
// }

// // Funktion för att visa tre slumpmässiga moles
// function showThreeRandomMoles() {
//     let chosenMoles = [];

//     const interval = setInterval(() => {
//         if (!gameActive) {
//             clearInterval(interval);
//             return;
//         }

//         // Kontrollerar så bara tre aktiva moles visas samtidigt
//         if (chosenMoles.length >= 3) {
//             return;  
//         }

//         let randomHole = getRandomHole();  // Hämta ett slumpmässigt hål

//         // Lägg till hålet i listan över valda moles och visa en mole
//         chosenMoles.push(randomHole);
//         randomHole.classList.add('active');

//         // Ta bort mollen efter 4 sekunder
//         setTimeout(() => {
//             randomHole.classList.remove('active');
//             chosenMoles = chosenMoles.filter(hole => hole !== randomHole); 
//         }, 4000);

//     }, Math.random() * 2000 + 1000); // Slumpmässig fördröjning mellan 1 till 3 sekunder
// }

// // Funktion för att uppdatera poängen vid moleclick när spelet är aktivt
// function handleMoleClick() {
//     if (gameActive) {  
//         score++;  
//         scoreDisplay.textContent = `Score: ${score}`;  
//     }
//     this.classList.remove('active');  // Ta bort 'active' klassen från mollen så att den försvinner
// }
