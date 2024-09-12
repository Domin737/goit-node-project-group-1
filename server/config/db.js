// server/config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

// Funkcja do połączenia z MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Usunięcie przestarzałych opcji
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1); // Zakończ aplikację przy błędzie połączenia
  }
};

module.exports = connectDB;
