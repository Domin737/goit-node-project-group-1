// /src/index.js

import HomePage from './pages/HomePage';
import LoginPage, { renderLogin } from './pages/LoginPage';

document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('userToken');

  if (token) {
    document.getElementById('app').innerHTML = HomePage(); // Załadowanie strony głównej
    // Usuwamy wywołanie renderLogoutButton, ponieważ setupLogoutButton jest teraz wywoływane w HomePage
  } else {
    document.getElementById('app').innerHTML = LoginPage(); // Załadowanie strony logowania
    renderLogin(); // Przypisanie obsługi do formularza logowania
  }
});
