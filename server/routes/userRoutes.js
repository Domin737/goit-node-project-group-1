// server/routes/userRoutes.js

// Importowanie modułu Express do tworzenia routera
const express = require('express');
// Inicjalizacja routera Express
const router = express.Router();

// Importowanie kontrolerów użytkownika, w tym kontrolera logowania Google
const {
  registerUser,
  loginUser,
  logoutUser,
  updateBalance,
  getBalance,
  getCurrentUser,
  googleLoginUser, // Importujemy kontroler logowania Google
} = require('../controllers/userController');

// Importowanie middleware do ochrony tras
const { protect } = require('../middleware/authMiddleware');

// Definicja tras otwartych (nie wymagających autoryzacji)

// Trasa POST do rejestracji nowego użytkownika
router.post('/register', registerUser);

// Trasa POST do logowania użytkownika
router.post('/login', loginUser);

// Trasa POST do logowania użytkownika za pomocą Google
router.post('/google-login', googleLoginUser); // Dodajemy trasę logowania przez Google

// Definicja tras chronionych (wymagających autoryzacji)

// Trasa POST do wylogowania użytkownika; używamy middleware 'protect' do ochrony trasy
router.post('/logout', protect, logoutUser);

// Trasa GET do pobierania aktualnego bilansu użytkownika
router.get('/balance', protect, getBalance);

// Trasa PUT do aktualizacji bilansu użytkownika
router.put('/balance', protect, updateBalance);

// Trasa GET do pobierania danych bieżącego użytkownika
router.get('/current', protect, getCurrentUser);

// Eksport routera, aby mógł być używany w innych częściach aplikacji
module.exports = router;
