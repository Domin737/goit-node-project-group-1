// src/components/LogoutButton.js
export default function LogoutButton() {
  console.log('Renderowanie przycisku wylogowania');
  return `
    <button id="logout-btn" class="btn btn-secondary">Log out</button>
  `;
}

export function setupLogoutButton(onLogoutClick) {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    console.log('Inicjalizacja przycisku wylogowania');
    logoutBtn.addEventListener('click', onLogoutClick);
  }
}
