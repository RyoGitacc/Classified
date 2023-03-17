
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE,
  authDomain: "classified-a35b8.firebaseapp.com",
  projectId: "classified-a35b8",
  storageBucket: "classified-a35b8.appspot.com",
  messagingSenderId: "389969805820",
  appId: "1:389969805820:web:9203b7d62f318202cff279",
  measurementId: "G-7HF0PEBZXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
