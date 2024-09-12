// server/controllers/userController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Tworzenie tokena JWT
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Rejestracja użytkownika
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res
      .status(400)
      .json({ message: 'The email address is already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    const token = generateToken(user._id);
    user.token = token; // Zapisanie tokena w bazie danych
    await user.save();

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token, // Wysyłanie tokena
    });
  } else {
    res.status(400).json({ message: 'Failed to register user' });
  }
};

// Logowanie użytkownika
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);
    user.token = token; // Zapisanie tokena w bazie danych
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      balance: user.balance,
      token, // Wysyłanie tokena
    });
  } else {
    res.status(401).json({ message: 'Incorrect login information' });
  }
};

// Wylogowanie użytkownika
const logoutUser = async (req, res) => {
  const user = req.user;
  user.token = null; // Usunięcie tokena z bazy danych
  await user.save();
  res.status(204).send(); // Odpowiedź: brak treści
};

// Aktualizacja bilansu użytkownika
const updateBalance = async (req, res) => {
  const { balance } = req.body;
  const user = req.user;

  if (balance === undefined) {
    return res
      .status(400)
      .json({ message: 'No new balance sheet was provided' });
  }

  user.balance = balance;
  await user.save();

  res.json({ balance: user.balance });
};

// Pobieranie aktualnego bilansu użytkownika
const getBalance = async (req, res) => {
  const user = req.user;
  res.json({ balance: user.balance });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  updateBalance,
  getBalance,
};
