// server/app.js

// Importowanie niezbędnych modułów
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const log = require('./utils/logger');

// Ustawienie globalnej zmiennej log dla łatwiejszego logowania
global.log = log;

// Wczytanie zmiennych środowiskowych z pliku .env
require('dotenv').config();

// Inicjalizacja aplikacji Express
const app = express();

// Konfiguracja middleware
app.use(express.json()); // Parsowanie JSON w żądaniach
app.use(cors()); // Obsługa Cross-Origin Resource Sharing (CORS)

// Konfiguracja zabezpieczeń przy użyciu modułu helmet
app.use(
  helmet({
    contentSecurityPolicy: false, // Wyłączenie polityki bezpieczeństwa treści
    crossOriginEmbedderPolicy: false, // Wyłączenie polityki osadzania zasobów z innych źródeł
    crossOriginOpenerPolicy: {
      policy: 'same-origin-allow-popups', // Ustawienie polityki otwierania okien
    },
  })
);

// Połączenie z bazą danych MongoDB
const connectDB = require('./config/db');
connectDB();

// Importowanie i konfiguracja tras API
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

app.use('/api/users', userRoutes); // Trasy związane z użytkownikami
app.use('/api/transactions', transactionRoutes); // Trasy związane z transakcjami

// Serwowanie statycznych plików frontendu z folderu "dist"
app.use(express.static(path.join(__dirname, '..', 'dist')));

// Obsługa wszystkich innych tras - przekierowanie do index.html (dla aplikacji SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

// Middleware do globalnej obsługi błędów
app.use((err, req, res, next) => {
  console.error(err.stack); // Logowanie błędu do konsoli
  res
    .status(500)
    .json({ message: err.message || 'Middleware - A server error occurred' });
});

// Konfiguracja i uruchomienie serwera
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  log(`Port - The server is running on the port: ${PORT}`);
});
