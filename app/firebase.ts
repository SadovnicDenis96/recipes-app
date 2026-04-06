import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Ваша Firebase конфигурация
// Получите эти значения из Firebase Console (https://console.firebase.google.com/)
const firebaseConfig = {
  apiKey: "AIzaSyAyxwKYTt2JM3L-WR5EZIBusF8yupn_NBs",
  authDomain: "recipe-app-84a0c.firebaseapp.com",
  projectId: "recipe-app-84a0c",
  storageBucket: "recipe-app-84a0c.firebasestorage.app",
  messagingSenderId: "836336454958",
  appId: "1:836336454958:web:97f0a079ed14a8bb463ebf",
  measurementId: "G-BFSF83CKHN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
// Auth persistence is automatically handled by Firebase SDK
const auth = getAuth(app);

// Set language code (optional)
auth.languageCode = 'ru'; // Russian language

export { app, auth };
export default app;
