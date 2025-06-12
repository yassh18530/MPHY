// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ Import Firebase Storage

// ✅ Your Firebase Config (Replace with your own)
const firebaseConfig = {
  apiKey: "AIzaSyCvyTimAPZZZbqjYqn8JZ4Q4z0vuZv9pco",
  authDomain: "be-project-2025-a56a5.firebaseapp.com",
  projectId: "be-project-2025-a56a5",
  storageBucket: "be-project-2025-a56a5.appspot.com",
  messagingSenderId: "526575689399",
  appId: "1:526575689399:web:1f7ff87cf8aa5928d3b732",
  measurementId: "G-0PCM7QLF96"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
