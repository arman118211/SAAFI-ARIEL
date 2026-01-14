
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

// 🔴 PASTE VALUES DIRECTLY (NO env vars, NO imports)
firebase.initializeApp({
  apiKey: "AIzaSyAI1ODr8A4AQur5DGx5uU4ypERFwp7KFh8",
  authDomain: "saafi-ariel-aeb41.firebaseapp.com",
  projectId: "saafi-ariel-aeb41",
  storageBucket: "saafi-ariel-aeb41.firebasestorage.app",
  messagingSenderId: "769799824676",
  appId: "1:769799824676:web:050526a5a68ac21fb8bfb1"
});

// Initialize Firebase Messaging
firebase.messaging();

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Payload received:", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // Extract icon and image from the webpush or data object
    icon: payload.data?.icon || "/logo.jpg", 
    image: payload.data?.image || payload.notification?.image,
    // Crucial: Pass the data along so the click event can see it
    data: {
      url: payload.data?.url || payload.fcmOptions?.link || "/"
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  // Try to find the URL in multiple possible locations
  const targetUrl = event.notification.data?.url || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // 1. If a tab is already open with this URL, focus it
      for (const client of clientList) {
        if (client.url === targetUrl && "focus" in client) {
          return client.focus();
        }
      }
      // 2. If no tab is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

