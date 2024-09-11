// /src/components/LogoutButton.js

export default function LogoutButton() {
  return `
    <button id="logout-btn">Wyloguj</button>
  `;
}

export function setupLogoutButton(onLogoutClick) {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', onLogoutClick);
  }
}
