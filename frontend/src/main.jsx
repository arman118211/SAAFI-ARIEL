import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then(() => console.log("✅ FCM Service Worker registered"))
    .catch((err) =>
      console.error("❌ FCM Service Worker registration failed", err)
    );
}

createRoot(document.getElementById('root')).render(
   <Provider store={store}>
      <BrowserRouter>
      <Toaster position="top-right" />
        <App />
      </BrowserRouter>,
  </Provider>
)
