// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCANzBpYEwgtb2xRJsVPtpqAQhu_XfF2-Y",

  authDomain: "whack-a-mole-4ed00.firebaseapp.com",

  projectId: "whack-a-mole-4ed00",

  storageBucket: "whack-a-mole-4ed00.appspot.com",

  messagingSenderId: "644860846890",

  appId: "1:644860846890:web:10f73fb37978d4dd9df453",

  measurementId: "G-2BJ31XY564"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

let name = "Linda";
let id = 1;
userData(id, name);
export function userData(userId, Name){
    const db = getDatabase();
    setImmediate(ref(db, 'user/' + userId)),{
        username: Name
    }
    console.log("test database")
}




const db = getDatabase();
const starCountRef = ref(db, 'posts/' + postId + '/starCount');
onValue(starCountRef, (snapshot) => {
const data = snapshot.val();
updateStarCount(postElement, data);
});


const dbRef = ref(getDatabase());
get(child(dbRef, `users/${userId}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
