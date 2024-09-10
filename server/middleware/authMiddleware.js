// /server/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Pobranie tokena
      token = req.headers.authorization.split(' ')[1];

      // Weryfikacja tokena
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Pobranie użytkownika z tokena
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res
        .status(401)
        .json({ message: 'Brak autoryzacji, token nieprawidłowy' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Brak autoryzacji, brak tokena' });
  }
};

module.exports = { protect };
