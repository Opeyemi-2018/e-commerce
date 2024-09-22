// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "e-commerce-1f080.firebaseapp.com",
  projectId: "e-commerce-1f080",
  storageBucket: "e-commerce-1f080.appspot.com",
  messagingSenderId: "615711293564",
  appId: "1:615711293564:web:abe2672133e7556f9889f9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);