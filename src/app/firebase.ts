// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-WhwGhsGmxwsRT3AoCV4Fai24yKCLJ_s",
  authDomain: "newcrud-27d18.firebaseapp.com",
  projectId: "newcrud-27d18",
  storageBucket: "newcrud-27d18.firebasestorage.app",
  messagingSenderId: "96041695226",
  appId: "1:96041695226:web:5c648a6bfbcef68d169643",
  measurementId: "G-RD7GEZ6BXP"
};

// Firebase dasturini ishga tushirish
const app = initializeApp(firebaseConfig);

// Authentication xizmatini olish
const auth = getAuth(app);

export { auth };

// Foydalanuvchini ro'yxatdan o'tkazish

// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "./firebase";

// const registerUser = async (email, password) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     console.log("Foydalanuvchi yaratildi:", userCredential.user);
//   } catch (error) {
//     console.error("Xatolik:", error.message);
//   }
// };

// // Misol uchun:
// registerUser("test@example.com", "password123");

// Foydalanuvchini tizimga kirgizish

// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "./firebase";

// const loginUser = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     console.log("Foydalanuvchi tizimga kirdi:", userCredential.user);
//   } catch (error) {
//     console.error("Xatolik:", error.message);
//   }
// };

// // Misol uchun:
// loginUser("test@example.com", "password123");\


// Foydalanuvchi ma'lumotlarini olish

// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase";

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.log("Hozirgi foydalanuvchi:", user);
//   } else {
//     console.log("Foydalanuvchi tizimga kirmagan.");
//   }
// });

// . Foydalanuvchini tizimdan chiqarish

// import { signOut } from "firebase/auth";
// import { auth } from "./firebase";

// const logoutUser = async () => {
//   try {
//     await signOut(auth);
//     console.log("Foydalanuvchi tizimdan chiqdi.");
//   } catch (error) {
//     console.error("Chiqishda xatolik:", error.message);
//   }
// };

// // Misol uchun:
// logoutUser();