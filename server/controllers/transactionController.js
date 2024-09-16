// /server/controllers/transactionController.js

// Importowanie modeli transakcji i użytkownika
const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');

// Kontroler do dodawania nowej transakcji (wydatku lub przychodu)
const addTransaction = async (req, res) => {
  try {
    // Destrukturyzacja danych z ciała żądania
    const { type, category, amount, description, date } = req.body;
    const user = req.user;

    // Sprawdzenie, czy wszystkie wymagane pola są obecne
    if (!type || !category || !amount || !description || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Walidacja typu transakcji
    if (type !== 'income' && type !== 'expense') {
      return res.status(400).json({ message: 'Invalid transaction type' });
    }

    // Tworzenie nowej transakcji w bazie danych
    const transaction = await Transaction.create({
      user: user._id,
      type,
      category,
      amount,
      description,
      date: new Date(date), // Konwersja stringa na obiekt Date
    });

    // Aktualizacja bilansu użytkownika
    if (type === 'income') {
      user.balance += amount;
    } else {
      user.balance -= amount;
    }
    await user.save();

    // Wysłanie odpowiedzi z utworzoną transakcją i nowym bilansem
    res.status(201).json({
      transaction,
      newBalance: user.balance,
    });
  } catch (error) {
    // Obsługa błędów serwera
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Kontroler do usuwania transakcji
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    // Znalezienie transakcji należącej do danego użytkownika
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

    // Usunięcie transakcji
    await transaction.deleteOne();

    // Wysłanie odpowiedzi z potwierdzeniem usunięcia i nowym bilansem
    res.json({
      message: 'Transaction deleted',
      newBalance: user.balance,
    });
  } catch (error) {
    // Obsługa błędów serwera
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Kontroler do pobierania listy transakcji użytkownika
const getTransactions = async (req, res) => {
  try {
    const user = req.user;
    const query = req.query;

    // Pobranie transakcji użytkownika z filtrowaniem po typie i sortowaniem po dacie
    const transactions = await Transaction.find({
      user: user._id,
      type: query.type,
    }).sort({
      date: -1,
    });

    // Wysłanie listy transakcji jako odpowiedź
    res.json(transactions);
  } catch (error) {
    // Obsługa błędów serwera
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Eksport funkcji kontrolera
module.exports = { addTransaction, deleteTransaction, getTransactions };
