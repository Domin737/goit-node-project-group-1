// /src/pages/HomePage.js

import LogoutButton, { attachLogoutHandler } from '../components/LogoutButton';

function HomePage() {
  return `
    <div>
      <h1>Witaj w aplikacji Kapu$ta!</h1>
      <p>To jest strona główna aplikacji.</p>
      <div id="logout-container"></div>
    </div>
  `;
}

// Funkcja renderująca przycisk wylogowania
function renderLogoutButton() {
  const logoutContainer = document.getElementById('logout-container');
  if (logoutContainer) {
    logoutContainer.innerHTML = LogoutButton();
    attachLogoutHandler(); // Dodanie event listenera do przycisku wylogowania
  }
}

export { HomePage, renderLogoutButton };
