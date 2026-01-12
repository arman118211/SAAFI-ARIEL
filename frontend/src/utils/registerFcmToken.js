import { getToken } from "firebase/messaging";
import axios from "axios";
import { messaging } from "../firebase/firebaseClient";

export const registerFcmToken = async (authToken) => {
  try {
    const fcmToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    if (!fcmToken) return;

    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/notification/save-token`,
      { token: fcmToken},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  } catch (err) {
    console.error("FCM token save failed", err);
  }
};
