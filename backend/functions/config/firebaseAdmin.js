import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    storageBucket: "saafi-ariel-aeb41.firebasestorage.app",
  });
}

export const messaging = admin.messaging();
export const auth = admin.auth();
export const db = admin.firestore();
export const bucket = admin.storage().bucket();

export default admin;
