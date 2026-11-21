import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPXkA2Hg_ug6GxM_NnhH1pgDire2aRdc8",
  authDomain: "react-pulperia-zabala.firebaseapp.com",
  projectId: "react-pulperia-zabala",
  storageBucket: "react-pulperia-zabala.firebasestorage.app",
  messagingSenderId: "1081806115548",
  appId: "1:1081806115548:web:e334ff9a3005a4e7529a19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);