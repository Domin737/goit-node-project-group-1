// src/components/LogoutButton.js

// Importowanie modułu logowania
import log from '../utils/logger';

// Funkcja renderująca przycisk wylogowania
export default function LogoutButton() {
  log('function LogoutButton - Renderowanie przycisku wylogowania');
  return `
    <button id="logout-btn" class="btn btn-secondary">Exit</button>
  `;
}

// Funkcja inicjalizująca obsługę przycisku wylogowania
export function setupLogoutButton(onLogoutClick) {
  // Pobranie referencji do elementu przycisku wylogowania
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    log('function setupLogoutButton - Inicjalizacja przycisku wylogowania');
    // Dodanie obsługi zdarzenia 'click' dla przycisku wylogowania
    logoutBtn.addEventListener('click', onLogoutClick);
  }
}
