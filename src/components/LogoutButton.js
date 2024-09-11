// /src/components/LogoutButton.js

import { handleLogout } from '../utils/logoutUtils'; // Import funkcji wylogowania

export default function LogoutButton() {
  return `
    <button id="logout-btn">Wyloguj</button>
  `;
}

// Przypisanie obsługi po wyrenderowaniu
export function setupLogoutButton() {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
}
