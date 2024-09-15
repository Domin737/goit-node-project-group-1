// server/controllers/userController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

// Tworzenie tokena JWT
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Rejestracja użytkownika
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Sprawdzenie czy wszystkie pola są wypełnione
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  // Sprawdzenie czy email jest już w użyciu
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res
      .status(400)
      .json({ message: 'The email address is already registered' });
  }

  // Haszowanie hasła
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generowanie domyślnego avatara z Gravatar
  const avatarURL = gravatar.url(email, { s: '250', d: 'retro' }, true);

  // Tworzenie nowego użytkownika z avatarem z Gravatara
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    avatarURL, // Dodanie avataru do użytkownika
  });

  // Sprawdzenie czy użytkownik został stworzony i wysłanie odpowiedzi
  if (user) {
    const token = generateToken(user._id);
    user.token = token; // Zapisanie tokena w bazie danych
    await user.save();

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL, // Zwrócenie avataru w odpowiedzi
      token, // Wysyłanie tokena
    });
  } else {
    res.status(400).json({ message: 'Failed to register user' });
  }
};

// Logowanie użytkownika
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Sprawdzenie czy użytkownik istnieje
  const user = await User.findOne({ email });

  // Weryfikacja hasła
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);
    user.token = token; // Zapisanie tokena w bazie danych
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      balance: user.balance,
      avatarURL: user.avatarURL, // Zwrócenie avataru w odpowiedzi
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

// Pobieranie bieżącego użytkownika (wraz z avatarem)
const getCurrentUser = async (req, res) => {
  const { email, name, balance, avatarURL } = req.user;
  res.status(200).json({ email, name, balance, avatarURL });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  updateBalance,
  getBalance,
  getCurrentUser, // Zmieniono nazwę z getCurrent na getCurrentUser
};
