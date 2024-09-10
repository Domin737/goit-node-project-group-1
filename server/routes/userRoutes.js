// /server/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Trasy otwarte
router.post('/register', registerUser); // Rejestracja użytkownika
router.post('/login', loginUser); // Logowanie użytkownika

// Trasy chronione
router.get('/profile', protect, (req, res) => {
  res.json({ message: `Witaj, ${req.user.name}` }); // Ochrona trasy za pomocą middleware "protect"
});

module.exports = router;
