// server/middleware/authMiddleware.js

// Importowanie niezbędnych modułów
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware do ochrony tras wymagających autoryzacji
const protect = async (req, res, next) => {
  let token;

  // Sprawdzenie, czy token jest obecny w nagłówku Authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Pobranie tokena z nagłówka Authorization
      token = req.headers.authorization.split(' ')[1];

      // Weryfikacja tokena przy użyciu klucza JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Pobranie danych użytkownika z bazy danych na podstawie ID z tokena
      // Wykluczamy pole 'password' z pobieranych danych
      req.user = await User.findById(decoded.id).select('-password');

      // Przejście do następnego middleware lub obsługi trasy
      next();
    } catch (error) {
      // Obsługa błędu w przypadku nieprawidłowego tokena
      console.error(error);
      res
        .status(401)
        .json({ message: 'authMiddleware - No authorization, invalid token' });
    }
  }

  // Jeśli token nie jest obecny w nagłówku
  if (!token) {
    res
      .status(401)
      .json({ message: 'authMiddleware - No authorization, no token' });
  }
};

// Eksport middleware do użycia w innych częściach aplikacji
module.exports = { protect };
