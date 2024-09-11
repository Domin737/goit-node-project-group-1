// /src/pages/HomePage.js

import LogoutButton, { setupLogoutButton } from '../components/LogoutButton';
import { handleLogout } from '../utils/logoutUtils';

export default function HomePage() {
  return `
    <div>
      <h1>Witaj w aplikacji Kapu$ta!</h1>
      <p>To jest strona główna aplikacji.</p>
      ${LogoutButton()}
    </div>
    <div id="logout-modal" class="modal" style="display: none;">
      <div class="modal-content">
        <p>Czy na pewno chcesz opuścić aplikację?</p>
        <button id="confirm-logout">Tak</button>
        <button id="cancel-logout">Nie</button>
      </div>
    </div>
  `;
}

export function setupHomePage() {
  setupLogoutButton(() => {
    const modal = document.getElementById('logout-modal');
    modal.style.display = 'block';
  });

  const confirmLogoutBtn = document.getElementById('confirm-logout');
  const cancelLogoutBtn = document.getElementById('cancel-logout');
  const modal = document.getElementById('logout-modal');

  confirmLogoutBtn.addEventListener('click', () => {
    handleLogout();
    modal.style.display = 'none';
  });

  cancelLogoutBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}
