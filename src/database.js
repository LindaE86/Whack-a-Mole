// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";      
// import { getFirestore, collection, addDoc,  } from  "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { score } from './script.js';
// import { fetchTop10, updateScore, hideTop10List } from "./top10Handler.js";

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
// const db = getFirestore(app);


  // Import the functions you need from the SDKs you need
  //  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
  //  import { getFirestore, collection, addDoc,  } from  "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

  // Använd samma version för både app och firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDVHxMPwtZsR_69u8hF5MEX5KL_PCqjXgI",
    authDomain: "wackamole-5e7d5.firebaseapp.com",
    databaseURL: "https://console.firebase.google.com/u/0/project/wackamole-5e7d5/firestore/databases/-default-/data?utm_source=welcome&utm_medium=email&utm_campaign=welcome_2021_CTA_A",
    projectId: "wackamole-5e7d5",
    storageBucket: "wackamole-5e7d5.appspot.com",
    messagingSenderId: "207526556476",
    appId: "1:207526556476:web:cc6704063ffecea9222439"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  async function savePlayerToDB(playerName, score) {
    console.log("Attempting to save player to DB with name:", playerName);
    
    // Lägg till loggar för playerName och score
    console.log("Player Name:", playerName);
    console.log("Score:", score);
  
    const hiscoreDocs = collection(db, 'hiscore');
  
    if (!playerName) {
      console.error("playerName is undefined or empty");
      return;
    }
  
    if (typeof score !== 'number') {
      console.error("Score is undefined or not a number");
      return;
    }
  
    try {
      await addDoc(hiscoreDocs, {
        playerName: playerName,
        score: score
      });
      console.log("Data added successfully");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
  

// async function savePlayerToDB(playerName, score) {
//   console.log("Attempting to save player to DB with name:", playerName);
//   const hiscoreDocs = collection(db, 'hiscore');

//   if (!playerName) {
//     console.error("playerName is undefined or empty");
//     return;
//   }

//   if (typeof score !== 'number') {
//     console.error("Score is undefined or not a number");
//     return;
//   }

//   try {
//     await addDoc(hiscoreDocs, {
//       playerName: playerName,
//       score: score
//     });
//     console.log("Data added successfully");
//   } catch (error) {
//     console.error("Error adding document: ", error);
//   }
// }

export { db, savePlayerToDB };



// let btn = document.getElementById("modalBtn");
// btn.addEventListener("click", savePlayer);


