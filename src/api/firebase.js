// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNHb5csCjqkXRS33AomwaRTiVXt98XykM",
  authDomain: "gb-chat-5d1cb.firebaseapp.com",
  databaseURL: "https://gb-chat-5d1cb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gb-chat-5d1cb",
  storageBucket: "gb-chat-5d1cb.appspot.com",
  messagingSenderId: "569584918259",
  appId: "1:569584918259:web:b8ae29c4419b3921232186",
  measurementId: "G-QRMV6RW5DT"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);