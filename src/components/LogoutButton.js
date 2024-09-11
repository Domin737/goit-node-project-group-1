// /src/components/LogoutButton.js

import { renderLogin } from './Login'; // Importowanie funkcji renderLogin

export default function LogoutButton() {
  return `
    <button id="logout-btn">Wyloguj</button>
  `;
}

// Funkcja obsługująca wylogowanie
export function handleLogout() {
  // Usunięcie tokena z localStorage
  localStorage.removeItem('userToken');

  // Przekierowanie na stronę logowania
  renderLogin(); // Przekierowanie do renderLogin
}

// Funkcja przypisująca obsługę do przycisku wylogowania
export function attachLogoutHandler() {
  const logoutButton = document.getElementById('logout-btn');
  if (logoutButton) {
    logoutButton.addEventListener('click', handleLogout);
  }
}
