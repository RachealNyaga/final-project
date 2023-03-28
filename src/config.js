import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
    projectName: "finalproject",
    projectId: "finalproject-35621",
    projectNumber: "1008434362127",
    apiKey: "AIzaSyC-_J8uR0F4ej2S5A5_m9Ak5_b96-CJo5Y",
    storageBucket: "finalproject-35621.appspot.com",
    messagingSenderId: "1008434362127",
    appId: "1:1008434362127:web:2b287795f5c35e45fcf07a",
    measurementId: "G-SSJ8VYWFT0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service

export const db = getFirestore(app);