// server/models/userModel.js

// Importowanie niezbędnych modułów
const mongoose = require('mongoose');
const gravatar = require('gravatar');

// Definicja schematu użytkownika
const userSchema = mongoose.Schema(
  {
    // Imię użytkownika
    name: {
      type: String,
      required: true,
    },
    // Adres email użytkownika (unikalny)
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // Hasło użytkownika (wymagane tylko jeśli nie ma googleId)
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    // ID Google (dla użytkowników logujących się przez Google)
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Pozwala na null/undefined wartości
    },
    // URL avatara użytkownika (generowany automatycznie z Gravatar)
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250', d: 'retro' }, true);
      },
    },
    // Token JWT dla sesji użytkownika
    token: {
      type: String,
      default: null,
    },
    // Saldo konta użytkownika
    balance: {
      type: Number,
      default: 0,
    },
  },
  {
    // Automatyczne dodawanie pól createdAt i updatedAt
    timestamps: true,
  }
);

// Tworzenie modelu User na podstawie schematu
const User = mongoose.model('User', userSchema);

// Eksport modelu do użycia w innych częściach aplikacji
module.exports = User;
