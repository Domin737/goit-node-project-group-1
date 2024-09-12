// /server/routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const {
  addTransaction,
  deleteTransaction,
  getTransactions,
} = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

// Wszystkie trasy są chronione i wymagają uwierzytelnienia
router.use(protect);

router.post('/', addTransaction);
router.delete('/:id', deleteTransaction);
router.get('/', getTransactions);

module.exports = router;
