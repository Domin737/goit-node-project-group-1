// /src/pages/HomePage.js

import LogoutButton, { setupLogoutButton } from '../components/LogoutButton';

export default function HomePage() {
  const content = `
    <div>
      <h1>Witaj w aplikacji Kapu$ta!</h1>
      <p>To jest strona główna aplikacji.</p>
      ${LogoutButton()}  <!-- Renderuj przycisk wylogowania -->
    </div>
  `;

  // Wywołaj setupLogoutButton po załadowaniu strony
  setTimeout(() => {
    setupLogoutButton();
  }, 0);

  return content;
}
