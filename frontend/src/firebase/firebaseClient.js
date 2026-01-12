import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAI1ODr8A4AQur5DGx5uU4ypERFwp7KFh8",
  authDomain: "saafi-ariel-aeb41.firebaseapp.com",
  projectId: "saafi-ariel-aeb41",
  storageBucket: "saafi-ariel-aeb41.firebasestorage.app",
  messagingSenderId: "769799824676",
  appId: "1:769799824676:web:050526a5a68ac21fb8bfb1",
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// 🔔 THIS IS WHAT YOU NEED
export const messaging = getMessaging(firebaseApp);
