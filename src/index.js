// /src/index.js

import { HomePage, renderLogoutButton } from './pages/HomePage';
import { renderLogin } from './components/Login';

// Początkowa funkcja, która uruchomi renderowanie strony po załadowaniu DOM
document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('userToken');

  // Jeśli token istnieje, wyświetlamy stronę główną, inaczej stronę logowania
  if (token) {
    document.getElementById('app').innerHTML = HomePage();
    renderLogoutButton(); // Renderujemy przycisk wylogowania
  } else {
    renderLogin();
  }
});
