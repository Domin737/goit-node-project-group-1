// server/firebaseAdmin.js

// Importowanie modułu Firebase Admin SDK
const admin = require('firebase-admin');

// Importowanie klucza serwisowego z pliku konfiguracyjnego
const serviceAccount = require('./config/serviceAccountKey.json');

// Inicjalizacja aplikacji Firebase Admin z wykorzystaniem klucza serwisowego
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Eksportowanie zainicjalizowanego modułu admin, aby był dostępny w innych częściach aplikacji
module.exports = admin;
