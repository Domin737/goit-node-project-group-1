// src/utils/firebase.js

// Importowanie funkcji inicjalizacyjnych z Firebase SDK
import { initializeApp } from 'firebase/app';
// Importowanie funkcji autoryzacji z Firebase SDK
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// Konfiguracja Firebase przy użyciu zmiennych środowiskowych
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Inicjalizacja aplikacji Firebase z podaną konfiguracją
const app = initializeApp(firebaseConfig);
// Inicjalizacja usługi autoryzacji Firebase
const auth = getAuth(app);
// Utworzenie dostawcy uwierzytelniania Google
const provider = new GoogleAuthProvider();

// Funkcja do logowania użytkownika za pomocą Google
export const signInWithGoogle = async () => {
  try {
    // Wyświetlenie okna logowania Google i uzyskanie wyniku uwierzytelniania
    const result = await signInWithPopup(auth, provider);
    // Zwrócenie obiektu zalogowanego użytkownika
    return result.user;
  } catch (error) {
    // Logowanie błędu w przypadku niepowodzenia logowania
    console.error('Error logging in with Google:', error);
    // Przekazanie błędu dalej do obsługi przez wywołujący kod
    throw error;
  }
};
