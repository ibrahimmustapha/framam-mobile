import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAJDQiQvbaim6UnlEZnoO-gUT_g5F4Hx00",
    authDomain: "framam-recycling-application.firebaseapp.com",
    databaseURL: "https://framam-recycling-application-default-rtdb.firebaseio.com",
    projectId: "framam-recycling-application",
    storageBucket: "framam-recycling-application.appspot.com",
    messagingSenderId: "546173436761",
    appId: "1:546173436761:web:0d2381b88c359b0b588248", 
    measurementId: "G-JVMP10NL6Z"
}

initializeApp(firebaseConfig);
export const database = getFirestore();

