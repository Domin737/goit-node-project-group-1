// src/pages/LoginPage.js

// Importowanie modułu logowania
import log from '../utils/logger';

// Importowanie komponentów Login i RegisterForm oraz ich funkcji inicjalizujących
import Login, { setupLoginForm } from '../components/Login';
import RegisterForm, { setupRegisterForm } from '../components/RegisterForm';

// Importowanie logo aplikacji
import logo from '../images/logo-big.svg';

// Funkcja renderująca stronę logowania
export default function LoginPage() {
  log('function LoginPage - Renderowanie strony logowania');
  return `
    <div id="auth-container" class="auth-container">
      <div id="login-section" class="login-section">
        <div class="logo">
          <img src="${logo}" alt="Kapu$ta Logo">
        </div>
        <div class="auth-form">
          ${Login()}
        </div>
      </div>
      <div id="register-section" class="register-section" style="display: none;">
        <div class="logo">
          <img src="${logo}" alt="Kapu$ta Logo">
        </div>
        <div class="auth-form">
          ${RegisterForm()}
        </div>
      </div>
    </div>
  `;
}

// Funkcja do przypisania obsługi logowania i rejestracji po załadowaniu DOM
export function setupAuthForms() {
  // Pobranie referencji do elementów DOM dla przycisków i sekcji
  const switchToRegisterBtn = document.getElementById('switch-to-register');
  const switchToLoginBtn = document.getElementById('switch-to-login');
  const loginSection = document.getElementById('login-section');
  const registerSection = document.getElementById('register-section');

  // Logowanie inicjalizacji formularzy autoryzacji
  log('function setupAuthForms - Inicjalizacja formularzy autoryzacji');

  // Inicjalizacja formularza logowania
  setupLoginForm();

  // Obsługa przełączania na formularz rejestracji po kliknięciu przycisku
  switchToRegisterBtn.addEventListener('click', event => {
    event.preventDefault();
    log('function setupAuthForms - Przełączanie na formularz rejestracji');
    loginSection.style.display = 'none';
    registerSection.style.display = 'flex';
  });

  // Inicjalizacja formularza rejestracji z funkcją powrotną po sukcesie
  setupRegisterForm(() => {
    log(
      'function setupAuthForms - Rejestracja zakończona sukcesem, powrót do logowania'
    );
    registerSection.style.display = 'none';
    loginSection.style.display = 'flex';
  });
}
