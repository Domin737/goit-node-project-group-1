// /server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Trasy otwarte
router.post('/register', registerUser); // Rejestracja użytkownika
router.post('/login', loginUser); // Logowanie użytkownika

// Trasy chronione
router.post('/logout', protect, logoutUser); // Wylogowanie użytkownika
router.get('/profile', protect, (req, res) => {
  res.json({ message: `Witaj, ${req.user.name}` });
});

module.exports = router;
