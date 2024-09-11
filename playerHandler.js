import { startBtn } from './script.js'; // Importera startBtn

let MODAL = document.getElementById("modal");
let input = document.getElementById("modalInputName");
let saveBtn = document.getElementById("modalBtn")
let playerName ;
let players = ["la"];


const userNameSet = false;
    let div = document.createElement("div");
    input.after(div);

    startBtn.disabled = true;


saveBtn.addEventListener("click", e =>{
    let value = input.value;
    console.log(value);
    playerName = input.value;
    savePlayer()

  
})
function savePlayer(){
if(players.includes(playerName)){

    div.style.fontSize = "12px";
    div.style.color = "red";
    div.style.height ="0"
    div.style.overflow ="visible";
    div.innerHTML = "this name is already taken";

    // Håll startknappen inaktiverad om namnet är upptaget
    startBtn.disabled = true;
    
} else {
    div.innerHTML= "";

    players.push(playerName)

    players.forEach(element => {
         console.log(element)
    });
    
    MODAL.classList.remove("modalContainer");
    MODAL.classList.add("WHACKAMOLE", "fadeOut");
    MODAL.innerHTML = "Let's whack some moles!!!";
    setTimeout(()=>{
            MODAL.style.display="none";

    },3000)

    startBtn.disabled = false;
 
    let gameOne = document.createElement("div");
    
   
    //saving the name to database
}
}
