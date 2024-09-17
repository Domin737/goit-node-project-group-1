// server/routes/transactionRoutes.js

// Importowanie modułu Express do tworzenia routera
const express = require('express');
// Inicjalizacja routera Express
const router = express.Router();

// Importowanie kontrolerów transakcji
const {
  addTransaction,
  deleteTransaction,
  getTransactions,
} = require('../controllers/transactionController');

// Importowanie middleware do ochrony tras
const { protect } = require('../middleware/authMiddleware');

// Zastosowanie middleware 'protect' do wszystkich tras w tym routerze
// Wszystkie trasy są chronione i wymagają uwierzytelnienia
router.use(protect);

// Trasa POST do dodawania nowej transakcji
router.post('/', addTransaction);

// Trasa DELETE do usuwania transakcji o podanym ID
router.delete('/:id', deleteTransaction);

// Trasa GET do pobierania listy transakcji
router.get('/', getTransactions);

// Eksport routera, aby mógł być używany w innych częściach aplikacji
module.exports = router;
