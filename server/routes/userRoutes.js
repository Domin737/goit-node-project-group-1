// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  updateBalance,
  getBalance,
  getCurrentUser,
  googleLoginUser, // Importujemy kontroler logowania Google
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Trasy otwarte
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google-login', googleLoginUser); // Dodajemy trasę logowania przez Google

// Trasy chronione
router.post('/logout', protect, logoutUser);
router.get('/balance', protect, getBalance);
router.put('/balance', protect, updateBalance);
router.get('/current', protect, getCurrentUser);

module.exports = router;
