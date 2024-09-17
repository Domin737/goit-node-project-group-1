// server/app.js

// Importowanie niezbędnych modułów
const express = require('express'); // Framework do tworzenia aplikacji webowych
const cors = require('cors'); // Middleware do obsługi CORS
const mongoose = require('mongoose'); // Biblioteka do komunikacji z MongoDB
const path = require('path'); // Moduł do pracy ze ścieżkami plików i folderów
const helmet = require('helmet'); // Middleware do zabezpieczania aplikacji Express
const log = require('./utils/logger'); // Import własnego modułu logowania

// Ustawienie globalnej zmiennej 'log' dla łatwiejszego dostępu w całej aplikacji
global.log = log;

// Wczytanie zmiennych środowiskowych z pliku .env
require('dotenv').config();

// Inicjalizacja aplikacji Express
const app = express();

// Konfiguracja middleware

// Middleware do parsowania JSON w ciele żądań HTTP
app.use(express.json());

// Middleware do obsługi Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Konfiguracja zabezpieczeń przy użyciu modułu Helmet
app.use(
  helmet({
    contentSecurityPolicy: false, // Wyłączenie domyślnej polityki bezpieczeństwa treści
    crossOriginEmbedderPolicy: false, // Wyłączenie polityki osadzania zasobów z innych źródeł
    crossOriginOpenerPolicy: {
      policy: 'same-origin-allow-popups', // Ustawienie polityki otwierania okien na 'same-origin-allow-popups'
    },
  })
);

// Połączenie z bazą danych MongoDB
const connectDB = require('./config/db');
connectDB(); // Nawiązanie połączenia z bazą danych

// Importowanie i konfiguracja tras API

// Importowanie tras związanych z użytkownikami
const userRoutes = require('./routes/userRoutes');
// Importowanie tras związanych z transakcjami
const transactionRoutes = require('./routes/transactionRoutes');

// Rejestrowanie tras w aplikacji Express

// Trasy dla operacji na użytkownikach będą dostępne pod '/api/users'
app.use('/api/users', userRoutes);
// Trasy dla operacji na transakcjach będą dostępne pod '/api/transactions'
app.use('/api/transactions', transactionRoutes);

// Serwowanie statycznych plików frontendu z folderu "dist"
app.use(express.static(path.join(__dirname, '..', 'dist')));

// Obsługa wszystkich innych tras - przekierowanie do index.html (dla aplikacji SPA)
// Zapewnia obsługę routingu po stronie klienta
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

// Middleware do globalnej obsługi błędów
app.use((err, req, res, next) => {
  console.error(err.stack); // Logowanie szczegółów błędu do konsoli
  res
    .status(500)
    .json({ message: err.message || 'Middleware - A server error occurred' }); // Wysłanie odpowiedzi z kodem 500
});

// Konfiguracja i uruchomienie serwera

// Ustawienie portu na podstawie zmiennej środowiskowej lub domyślnie 3000
const PORT = process.env.PORT || 3000;

// Uruchomienie serwera nasłuchującego na określonym porcie
app.listen(PORT, () => {
  log(`Port - The server is running on the port: ${PORT}`);
});
