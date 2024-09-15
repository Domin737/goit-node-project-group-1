// /server/controllers/transactionController.js
const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');

// Dodawanie nowej transakcji (wydatku lub przychodu)
const addTransaction = async (req, res) => {
  try {
    const { type, category, amount, description, date } = req.body;
    const user = req.user;

    if (!type || !category || !amount || !description || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (type !== 'income' && type !== 'expense') {
      return res.status(400).json({ message: 'Invalid transaction type' });
    }

    const transaction = await Transaction.create({
      user: user._id,
      type,
      category,
      amount,
      description,
      date: new Date(date), // Konwertujemy string na obiekt Date
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
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Usuwanie transakcji
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const transaction = await Transaction.findOne({ _id: id, user: user._id });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
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
      message: 'Transaction deleted',
      newBalance: user.balance,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Pobieranie listy transakcji użytkownika
const getTransactions = async (req, res) => {
  try {
    const user = req.user;
    const query = req.query;
    const transactions = await Transaction.find({
      user: user._id,
      type: query.type,
    }).sort({
      date: -1,
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { addTransaction, deleteTransaction, getTransactions };
