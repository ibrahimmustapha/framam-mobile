import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

}

initializeApp(firebaseConfig);
export const database = getFirestore();

