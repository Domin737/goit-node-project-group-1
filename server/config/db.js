// server/config/db.js

// Importowanie modułu mongoose do obsługi MongoDB
const mongoose = require('mongoose');

// Wczytanie zmiennych środowiskowych z pliku .env
require('dotenv').config();

// Funkcja asynchroniczna do nawiązania połączenia z bazą danych MongoDB
const connectDB = async () => {
  try {
    // Próba połączenia z bazą danych przy użyciu URI zdefiniowanego w zmiennych środowiskowych
    await mongoose.connect(process.env.MONGO_URI);

    // Logowanie sukcesu połączenia
    log('Database - Connected to MongoDB');
  } catch (err) {
    // W przypadku błędu połączenia, wyświetl komunikat błędu
    console.error(`Database - Error connecting to MongoDB: ${err.message}`);

    // Zakończ proces aplikacji z kodem błędu 1
    process.exit(1);
  }
};

// Eksport funkcji connectDB, aby mogła być używana w innych częściach aplikacji
module.exports = connectDB;
