// src/index.js

// Importowanie komponentów strony głównej i funkcji ich konfiguracji
import HomePage, { setupHomePage } from './pages/HomePage';

// Importowanie komponentów strony logowania i funkcji ich konfiguracji
import LoginPage, { setupAuthForms } from './pages/LoginPage';

// Importowanie głównych stylów aplikacji
import './styles/index.scss';

// Funkcja renderująca aplikację w zależności od stanu uwierzytelnienia użytkownika
function renderApp() {
  try {
    // Pobranie tokena JWT z localStorage
    const token = localStorage.getItem('userToken');

    // Pobranie referencji do głównego kontenera aplikacji w DOM
    const appContainer = document.getElementById('app');

    if (token) {
      // Jeśli token istnieje, renderujemy stronę główną i inicjalizujemy jej funkcjonalności
      appContainer.innerHTML = HomePage();
      setupHomePage();
    } else {
      // Jeśli token nie istnieje, renderujemy stronę logowania i inicjalizujemy formularze autoryzacji
      appContainer.innerHTML = LoginPage();
      setupAuthForms();
    }
  } catch (error) {
    // Obsługa błędów podczas renderowania aplikacji
    console.error('Error rendering the application:', error);

    // Wyświetlenie komunikatu o błędzie użytkownikowi
    const appContainer = document.getElementById('app');
    if (appContainer) {
      appContainer.innerHTML =
        '<p>An unexpected error occurred. Please try again later.</p>';
    }
  }
}

// Dodanie nasłuchiwania na zdarzenie 'DOMContentLoaded', aby uruchomić renderowanie aplikacji po załadowaniu DOM
document.addEventListener('DOMContentLoaded', renderApp);

// Nasłuchiwanie na zmiany w localStorage (np. po zalogowaniu lub wylogowaniu)
// Jeśli nastąpi zmiana w kluczu 'userToken', ponownie renderujemy aplikację
window.addEventListener('storage', event => {
  if (event.key === 'userToken') {
    renderApp();
  }
});

// Eksportowanie funkcji renderApp, aby można było jej użyć w innych miejscach aplikacji
export { renderApp };
