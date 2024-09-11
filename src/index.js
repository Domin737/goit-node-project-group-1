// /src/index.js

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import renderLogin from './components/Login'; // Zaktualizowany import

// Początkowa funkcja, która uruchomi renderowanie strony po załadowaniu DOM
document.addEventListener('DOMContentLoaded', function () {
  renderLogin(); // Funkcja, która ładuje i renderuje stronę logowania
});

// Sprawdzenie, czy token użytkownika istnieje w localStorage
const token = localStorage.getItem('userToken');

// Jeśli token istnieje, wyświetlamy stronę główną, inaczej stronę logowania
if (token) {
  document.getElementById('app').innerHTML = HomePage();
} else {
  document.getElementById('app').innerHTML = LoginPage();
}
