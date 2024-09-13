// src/components/LogoutButton.js
export default function LogoutButton() {
  return `
    <button id="logout-btn" class="btn btn-secondary">Log out</button>
  `;
}

export function setupLogoutButton(onLogoutClick) {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', onLogoutClick);
  }
}
