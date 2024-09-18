import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";      
import { getFirestore, collection, addDoc,  } from  "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const firebaseConfig = {

apiKey: "AIzaSyBUL8nzisxQI-tWMpIlp-UgPCgnLpHmtls",

authDomain: "whack-a-mole-eabac.firebaseapp.com",

databaseURL: "https://whack-a-mole-eabac-default-rtdb.europe-west1.firebasedatabase.app",

projectId: "whack-a-mole-eabac",

storageBucket: "whack-a-mole-eabac.appspot.com",

messagingSenderId: "285189561061",

appId: "1:285189561061:web:008eeda07a80915989520c"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

let db = getFirestore(app);

async function savePlayer(){
const hiscoreDocs = collection(db, 'hiscore');
let playerName = document.getElementById("modalInputName");

try {
await addDoc(hiscoreDocs,
  {
      username: playerName.value,
      score: 10
  });
  console.log("Data added successfully");
} catch (error) {
  console.error("Error adding document: ", error);
}

}
let btn = document.getElementById("modalBtn");
btn.addEventListener("click", savePlayer);


