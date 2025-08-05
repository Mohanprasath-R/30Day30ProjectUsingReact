// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAzRlS6aiWL71RlqmVHFka5e_kPRZDRt08",
  authDomain: "notepad-fda79.firebaseapp.com",
  projectId: "notepad-fda79",
  storageBucket: "notepad-fda79.firebasestorage.app",
  messagingSenderId: "208134971480",
  appId: "1:208134971480:web:adf7d3745786aed242aa2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };