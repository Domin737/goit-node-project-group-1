// src/components/LogoutButton.js
import log from '../utils/logger';

export default function LogoutButton() {
  log('function LogoutButton - Rendering the logout button');
  return `
    <button id="logout-btn" class="btn btn-secondary">Log out</button>
  `;
}

export function setupLogoutButton(onLogoutClick) {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    log('function setupLogoutButton - Initializing the logout button');
    logoutBtn.addEventListener('click', onLogoutClick);
  }
}
