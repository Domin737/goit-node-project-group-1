// /src/pages/HomePage.js

import LogoutButton from '../components/LogoutButton';

function HomePage() {
  return `
    <div>
      <h1>Witaj w aplikacji Kapu$ta!</h1>
      <p>To jest strona główna aplikacji.</p>
      <!-- Dodaj przycisk wylogowania -->
      <div id="logout-container"></div>
    </div>
  `;
}

// Załaduj przycisk wylogowania po wyrenderowaniu strony
function renderLogoutButton() {
  const logoutContainer = document.getElementById('logout-container');
  if (logoutContainer) {
    logoutContainer.innerHTML = LogoutButton();
  }
}

// Eksportuj `HomePage` jako default
export default HomePage;
export { renderLogoutButton };
