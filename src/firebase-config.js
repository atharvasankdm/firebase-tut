import { initializeApp } from "firebase/app";
import {getFirestore } from '@firebase/firestore' ;


const firebaseConfig = {
    apiKey: "AIzaSyDCBYRJebaUWEnO0IQOfKdSiDTCj4oELp4",
    authDomain: "fir-tutorial-55cfc.firebaseapp.com",
    projectId: "fir-tutorial-55cfc",
    storageBucket: "fir-tutorial-55cfc.appspot.com",
    messagingSenderId: "814085875850",
    appId: "1:814085875850:web:f00f131f86c5d99e432573",
    measurementId: "G-WC38CXN1NC"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);