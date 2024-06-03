import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyA4wTWMZYFbmCqLn1I5jf_YHLTBPLQekMA",
  authDomain: "govhsp.firebaseapp.com",
  projectId: "govhsp",
  storageBucket: "govhsp.appspot.com",
  messagingSenderId: "995586791101",
  appId: "1:995586791101:web:12977db21b8876eb4349d4",
  measurementId: "G-EP9H8ZNGQD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);


export {app, auth, db};