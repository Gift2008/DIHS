import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC-4hXlMSkd2iLtKlTP4X3nPAhQP3VL4Xg",
  authDomain: "dihs-despairmenot.firebaseapp.com",
  projectId: "dihs-despairmenot",
  storageBucket: "dihs-despairmenot.firebasestorage.app",
  messagingSenderId: "658299197426 ",
  appId: "1:658299197426:web:614abf9f8c639ad9da3d6b",
  measurementId: "G-X00FRZNNPM",
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// sign up
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "./firebase";

// async function signUp(email, password) {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     console.log("User created:", userCredential.user);
//     return userCredential.user;
//   } catch (error) {
//     console.error("Sign up error:", error.message);
//   }
// }

// sign in
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "./firebase";

// async function login(email, password) {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     console.log("Logged in:", userCredential.user);
//     return userCredential.user;
//   } catch (error) {
//     console.error("Login error:", error.message);
//   }
// }
