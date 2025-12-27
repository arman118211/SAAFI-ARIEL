import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    storageBucket: "saafi-ariel-aeb41.firebasestorage.app",
  });
}

export const bucket = admin.storage().bucket();
