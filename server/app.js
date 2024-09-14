// server/app.js
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
const transactionRoutes = require('./routes/transactionRoutes');

app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

// Serwowanie plików frontendu z folderu "dist"
app.use(express.static(path.join(__dirname, '..', 'dist')));

// Obsługa wszystkich innych tras, aby obsłużyć plik index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

// Middleware do obsługi błędów
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: err.message || 'Middleware - A server error occurred' });
});

// Konfiguracja portu
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Port - The server is running on the port: ${PORT}`);
});
