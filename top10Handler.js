// Hämtar databasen från database.js som ligger i en branch
import { db } from './database.js';
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const hiscoreCollectionRef = collection(db, 'hiscore');

// Kollar på top-10 listan och uppdaterar den live
function fetchTop10() {
  const q = query(hiscoreCollectionRef, orderBy('score', 'desc'), limit(10));

  onSnapshot(q, (snapshot) => {
    const top10Scores = snapshot.docs.map(doc => doc.data());
    displayTop10(top10Scores);
  }, (error) => {
    console.error("Kunde inte ladda top 10 listan: ", error);
  });
}

// Visar top-10 listan på sidan
function displayTop10(scores) {
  const list = document.getElementById('top10List');
  list.innerHTML = ''; // Gör listan tom först
  scores.forEach((player, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${player.username}: ${player.score}`;
    list.appendChild(listItem);
  });
}

// Lägger till en ny poäng i databasen
function updateScore(username, score) {
  addDoc(hiscoreCollectionRef, {
    username,
    score,
    timestamp: new Date()  // Sätter nuvarande tid
  })
  .then(() => {
    console.log("Poängen tillagd!");
  })
  .catch(error => {
    console.error("Misslyckades med att lägga till poäng: ", error);
  });
}

// Gör funktionerna tillgängliga för andra filer
export { fetchTop10, updateScore };

