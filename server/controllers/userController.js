// server/controllers/userController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const admin = require('../firebaseAdmin'); // Import Firebase Admin SDK

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
  const avatarURL = gravatar.url(email, { s: '250', d: 'retro' }, true);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    avatarURL,
  });

  if (user) {
    const token = generateToken(user._id);
    user.token = token;
    await user.save();

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

// Logowanie użytkownika za pomocą Google
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

// Logowanie użytkownika (trasa /login)
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);
    user.token = token;
    await user.save();

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

// Wylogowanie użytkownika
const logoutUser = async (req, res) => {
  const user = req.user;
  user.token = null;
  await user.save();
  res.status(204).send();
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

// Pobieranie bieżącego użytkownika
const getCurrentUser = async (req, res) => {
  const { email, name, balance, avatarURL } = req.user;
  res.status(200).json({ email, name, balance, avatarURL });
};

module.exports = {
  registerUser,
  loginUser,
  googleLoginUser, // Eksportujemy funkcję do logowania przez Google
  logoutUser,
  updateBalance,
  getBalance,
  getCurrentUser,
};
