
import { score } from './script.js';

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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

  async function savePlayerToDB(playerName, score, reactionTime) {
    console.log("Attempting to save player to DB with name:", playerName);
    
    // Lägg till loggar för playerName och score
    console.log("Player Name:", playerName);
    console.log("Score:", score);
    console.log ("Reaction Time:", reactionTime);
  
    const hiscoreDocs = collection(db, 'hiscore');
  
    if (!playerName) {
      console.error("playerName is undefined or empty");
      return;
    }
  
    if (typeof score !== 'number') {
      console.error("Score is undefined or not a number");
      return;
    }

    if (typeof reactionTime !== 'number') {
      console.error("Reaction Time is undefined or not a number");
      return;
  }

  
    try {
      await addDoc(hiscoreDocs, {
        playerName: playerName,
        score: score,
        reactionTime: reactionTime
      });
      console.log("Data added successfully");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
  

export { db, savePlayerToDB };

