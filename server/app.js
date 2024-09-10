// /server/app.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Połączenie z bazą danych
const connectDB = require('./config/db');
connectDB();

// Importowanie i używanie tras API
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Obsługa plików statycznych z folderu dist
app.use(express.static(path.join(__dirname, '..', 'dist')));

// Obsługa głównej trasy
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

// Middleware do obsługi błędów
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Wystąpił błąd serwera' });
});

// Konfiguracja portu
const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
