import {db} from './database.js';
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { topTime } from './script.js';

console.log("Firestore DB instance:", db);
const hiscoreCollectionRef = collection(db, 'hiscore');


// Fetch and display top 10 scores
function fetchTop10() {
  const q = query(hiscoreCollectionRef, orderBy('score', 'desc', 'topTime'), limit(10));

  onSnapshot(q, (snapshot) => {
    const top10Scores = snapshot.docs.map(doc => doc.data());
    console.log("Top 10 Scores:", top10Scores);
    displayTop10(top10Scores);
  }, (error) => {
    console.error("Kunde inte ladda top 10 listan: ", error);
  });
}


// Funktion för att visa top 10 listan i HTML
function displayTop10(scores) {
    const container = document.getElementById('top10Container');
    const list = document.getElementById('top10List');
    console.log("Container:", container, "List:", list);  
  
    if (container && list) {
      list.innerHTML = ''; // Töm listan först
  

    scores.forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${player.playerName}: ${player.score} RT: ${player.topTime}ms`;
        list.appendChild(listItem);
      });
      
  
      container.classList.remove('hidden'); // Visa listan om den är dold
      container.classList.add('show');
      setTimeout(() => {
        hideTop10List();
      }, 10000);  // Timer satt till 10000 ms
    }
     else {
      console.error("Could not find the top 10 container or list.");
    }
  }



// Hide the top 10 list
function hideTop10List() {
  const container = document.getElementById('top10Container');

  if (container) {
    container.classList.remove('show');
    container.classList.add('hidden');
  } else {
    console.error("Could not find the top 10 container.");
  }
}

// Add a new score to the database
function updateScore(playerName, score) {
    console.log("Updating score for:", playerName, "Score:", score);
    return addDoc(hiscoreCollectionRef, {
      playerName,
      score,
      topTime,
      timestamp: new Date()
    })
    .then(() => {
      console.log("Poängen tillagd!");
    })
    .catch(error => {
      console.error("Misslyckades med att lägga till poäng: ", error);
      throw error; 
    });
  }
  

export { fetchTop10, updateScore, hideTop10List };
