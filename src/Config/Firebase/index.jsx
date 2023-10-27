// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHNtD4ftc1HSfHOLLMoXNc6ayg27wAlyc",
  authDomain: "tugas-rpl-b788a.firebaseapp.com",
  projectId: "tugas-rpl-b788a",
  storageBucket: "tugas-rpl-b788a.appspot.com",
  messagingSenderId: "494157662076",
  appId: "1:494157662076:web:b9931c24b5b0ca041086f9",
  measurementId: "G-EYDDF77QLM"
};


// Initialize Firebase
const fireConfig = initializeApp(firebaseConfig);
const analytics = getAnalytics(fireConfig);
export const auth = getAuth(fireConfig)
export default fireConfig