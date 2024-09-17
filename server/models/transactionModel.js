// server/models/transactionModel.js

// Importowanie modułu mongoose do obsługi MongoDB
const mongoose = require('mongoose');

// Definicja schematu transakcji
const transactionSchema = mongoose.Schema(
  {
    // Referencja do użytkownika, który utworzył transakcję
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Odniesienie do modelu User
    },
    // Typ transakcji (przychód lub wydatek)
    type: {
      type: String,
      required: true,
      enum: ['income', 'expense'], // Ograniczenie do dwóch możliwych wartości
    },
    // Kategoria transakcji
    category: {
      type: String,
      required: true,
    },
    // Kwota transakcji
    amount: {
      type: Number,
      required: true,
    },
    // Opis transakcji
    description: {
      type: String,
      required: true,
    },
    // Data transakcji (domyślnie ustawiana na aktualną datę)
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Automatyczne dodawanie pól createdAt i updatedAt
    timestamps: true,
  }
);

// Tworzenie modelu Transaction na podstawie schematu
const Transaction = mongoose.model('Transaction', transactionSchema);

// Eksport modelu do użycia w innych częściach aplikacji
module.exports = Transaction;
