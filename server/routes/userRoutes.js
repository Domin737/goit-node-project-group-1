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
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Trasy otwarte
router.post('/register', registerUser);
router.post('/login', loginUser);

// Trasy chronione
router.post('/logout', protect, logoutUser);
router.get('/balance', protect, getBalance);
router.put('/balance', protect, updateBalance);
router.get('/current', protect, getCurrentUser);

module.exports = router;
