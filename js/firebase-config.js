// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA_beSjqptsEE5j--HPrQdB6Cpdy2zbMyc",
  authDomain: "twofactor-login.firebaseapp.com",
  projectId: "twofactor-login",
  storageBucket: "twofactor-login.firebasestorage.app",
  messagingSenderId: "1094302576945",
  appId: "1:1094302576945:web:dab7def44a8c6ddcc78010"
};

// Inisialisasi Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
