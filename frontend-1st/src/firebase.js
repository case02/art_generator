// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firbase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjWJBTf-RmFzUfKxZBBqclP-7UVMlIzOE",
  authDomain: "art-generator-app.firebaseapp.com",
  projectId: "art-generator-app",
  storageBucket: "art-generator-app.appspot.com",
  messagingSenderId: "898423662831",
  appId: "1:898423662831:web:e16b82058559671942931a",
  measurementId: "G-9TCT3CZG9H"
};

// Initialize Firebase
const analytics = getAnalytics(app);
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
