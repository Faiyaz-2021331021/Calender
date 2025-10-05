import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGeFtxTZQPLvqsX_lAqhOC_sZN_JCbhqk",
  authDomain: "calender-ca7d9.firebaseapp.com",
  projectId: "calender-ca7d9",
  storageBucket: "calender-ca7d9.appspot.com",
  messagingSenderId: "118754639611",
  appId: "1:118754639611:web:de7d8ebef5b0941808fa5e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
