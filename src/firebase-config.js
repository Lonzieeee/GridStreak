

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuK1eMu1HjYJMTkpUs85mvkK6JjQBZKJA",
  authDomain: "gridstreak-84ad2.firebaseapp.com",
  projectId: "gridstreak-84ad2",
  storageBucket: "gridstreak-84ad2.firebasestorage.app",
  messagingSenderId: "642740580443",
  appId: "1:642740580443:web:efd9c2884d301e54e20f7e",
  measurementId: "G-43GBMBKHCL",
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
