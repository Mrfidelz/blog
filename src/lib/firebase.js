// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "trendzipper-3daec.firebaseapp.com",
  projectId: "trendzipper-3daec",
  storageBucket: "trendzipper-3daec.appspot.com",
  messagingSenderId: "692853735385",
  appId: "1:692853735385:web:66e3a879d7ac2f7fa4e3c8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);