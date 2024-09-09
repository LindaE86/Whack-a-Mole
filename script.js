let bord; 
let startBtn ; // används för reset och start
let hole ;
let displayHere = document.getElementById("timer");

let timeLeft = 60;
let score = 0;
let reactionTime = [];
let timeUp = false;

// använts så här = CountDown(timeLeft, displayHere);
function CountDown(time, display){  
    
    let timer = time, minutes, seconds;
    timerInterval = setInterval(() =>{
      

        minutes = parseInt(timer / 60, 10); 
        seconds =  parseInt(timer % 60, 10); 

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        console.log( minutes + ":" + seconds)
        display.innerHTML = `${minutes}:${seconds}`; 

        if(--timer < 0){
            clearInterval(timerInterval);
            timeUp = true;
        }

    }, 1000);
}