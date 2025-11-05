// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

// 🔹 Use your actual Firebase project credentials here
const firebaseConfig = {
  apiKey: "AIzaSyCGeFtxTZQPLvqsX_lAqhOC_sZN_JCbhqk",
  authDomain: "calender-ca7d9.firebaseapp.com",
  projectId: "calender-ca7d9",
  storageBucket: "calender-ca7d9.appspot.com",
  messagingSenderId: "118754639611",
  appId: "1:118754639611:web:0e653eaf5c5a553408fa5e"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export Firestore and Auth **after initialization**
export const db = getFirestore(app);
export const auth = getAuth(app);

// Automatically sign in anonymously
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    try {
      await signInAnonymously(auth);
      console.log("Signed in anonymously");
    } catch (err) {
      console.error("Auth error:", err);
    }
  }
});
