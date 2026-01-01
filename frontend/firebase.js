import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAI1ODr8A4AQur5DGx5uU4ypERFwp7KFh8",
  authDomain: "saafi-ariel-aeb41.firebaseapp.com",
  projectId: "saafi-ariel-aeb41",
  storageBucket: "saafi-ariel-aeb41.firebasestorage.app",
  messagingSenderId: "769799824676",
  appId: "1:769799824676:web:050526a5a68ac21fb8bfb1"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// For debugging
console.log("Firebase initialized with:", {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain
});

export { auth };