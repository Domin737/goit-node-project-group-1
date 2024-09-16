// server/controllers/userController.js

// Importowanie niezbędnych modułów i modeli
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const admin = require('../firebaseAdmin'); // Import Firebase Admin SDK

// Funkcja generująca token JWT
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Kontroler do rejestracji użytkownika
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Sprawdzenie, czy wszystkie wymagane pola są wypełnione
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  // Sprawdzenie, czy użytkownik o podanym emailu już istnieje
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res
      .status(400)
      .json({ message: 'The email address is already registered' });
  }

  // Haszowanie hasła i generowanie URL avatara
  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: '250', d: 'retro' }, true);

  // Tworzenie nowego użytkownika
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    avatarURL,
  });

  if (user) {
    // Generowanie tokena JWT i zapisywanie go w bazie danych
    const token = generateToken(user._id);
    user.token = token;
    await user.save();

    // Wysyłanie odpowiedzi z danymi użytkownika i tokenem
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
      token,
    });
  } else {
    res.status(400).json({ message: 'Failed to register user' });
  }
};

// Kontroler do logowania użytkownika za pomocą Google
const googleLoginUser = async (req, res) => {
  const { token } = req.body;

  try {
    // Weryfikacja tokena Google za pomocą Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, name, picture, uid } = decodedToken;

    let user = await User.findOne({ email });

    if (!user) {
      // Jeśli użytkownik nie istnieje, tworzymy nowego
      const avatarURL =
        picture || gravatar.url(email, { s: '250', d: 'retro' }, true);

      user = await User.create({
        name,
        email,
        googleId: uid,
        avatarURL,
      });
    }

    // Tworzenie tokena JWT dla sesji użytkownika
    const jwtToken = generateToken(user._id);
    user.token = jwtToken;
    await user.save();

    // Wysyłanie odpowiedzi z danymi użytkownika i tokenem
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
      token: jwtToken,
    });
  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(401).json({ message: 'Invalid Google token' });
  }
};

// Kontroler do logowania użytkownika (trasa /login)
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // Sprawdzenie, czy użytkownik istnieje i czy hasło jest poprawne
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);
    user.token = token;
    await user.save();

    // Wysyłanie odpowiedzi z danymi użytkownika i tokenem
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      balance: user.balance,
      avatarURL: user.avatarURL,
      token,
    });
  } else {
    res.status(401).json({ message: 'Incorrect login information' });
  }
};

// Kontroler do wylogowania użytkownika
const logoutUser = async (req, res) => {
  const user = req.user;
  user.token = null;
  await user.save();
  res.status(204).send();
};

// Kontroler do aktualizacji bilansu użytkownika
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

// Kontroler do pobierania aktualnego bilansu użytkownika
const getBalance = async (req, res) => {
  const user = req.user;
  res.json({ balance: user.balance });
};

// Kontroler do pobierania bieżącego użytkownika
const getCurrentUser = async (req, res) => {
  const { email, name, balance, avatarURL } = req.user;
  res.status(200).json({ email, name, balance, avatarURL });
};

// Eksport wszystkich kontrolerów
module.exports = {
  registerUser,
  loginUser,
  googleLoginUser,
  logoutUser,
  updateBalance,
  getBalance,
  getCurrentUser,
};
