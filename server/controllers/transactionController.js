// /server/controllers/transactionController.js
const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');

// Dodawanie nowej transakcji (wydatku lub przychodu)
const addTransaction = async (req, res) => {
  try {
    const { type, category, amount, description } = req.body;
    const user = req.user;

    if (!type || !category || !amount || !description) {
      return res.status(400).json({ message: 'Wszystkie pola są wymagane' });
    }

    if (type !== 'income' && type !== 'expense') {
      return res.status(400).json({ message: 'Nieprawidłowy typ transakcji' });
    }

    const transaction = await Transaction.create({
      user: user._id,
      type,
      category,
      amount,
      description,
    });

    // Aktualizacja bilansu użytkownika
    if (type === 'income') {
      user.balance += amount;
    } else {
      user.balance -= amount;
    }
    await user.save();

    res.status(201).json({
      transaction,
      newBalance: user.balance,
    });
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera', error: error.message });
  }
};

// Usuwanie transakcji
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const transaction = await Transaction.findOne({ _id: id, user: user._id });

    if (!transaction) {
      return res.status(404).json({ message: 'Transakcja nie znaleziona' });
    }

    // Aktualizacja bilansu użytkownika
    if (transaction.type === 'income') {
      user.balance -= transaction.amount;
    } else {
      user.balance += transaction.amount;
    }
    await user.save();

    await transaction.deleteOne();

    res.json({
      message: 'Transakcja usunięta',
      newBalance: user.balance,
    });
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera', error: error.message });
  }
};

// Pobieranie listy transakcji użytkownika
const getTransactions = async (req, res) => {
  try {
    const user = req.user;
    const transactions = await Transaction.find({ user: user._id }).sort({
      date: -1,
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera', error: error.message });
  }
};

module.exports = { addTransaction, deleteTransaction, getTransactions };
