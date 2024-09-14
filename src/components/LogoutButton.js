// src/components/LogoutButton.js
export default function LogoutButton() {
  console.log('function LogoutButton - Rendering the logout button');
  return `
    <button id="logout-btn" class="btn btn-secondary">Log out</button>
  `;
}

export function setupLogoutButton(onLogoutClick) {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    console.log('function setupLogoutButton - Initializing the logout button');
    logoutBtn.addEventListener('click', onLogoutClick);
  }
}
