// src/pages/LoginPage.js
import log from '../utils/logger';
import Login, { setupLoginForm } from '../components/Login';
import RegisterForm, { setupRegisterForm } from '../components/RegisterForm';
import logo from '../images/logo-big.svg';

// Funkcja renderująca stronę logowania
export default function LoginPage() {
  log('function LoginPage - Rendering the login page');
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
  const switchToRegisterBtn = document.getElementById('switch-to-register');
  const switchToLoginBtn = document.getElementById('switch-to-login');
  const loginSection = document.getElementById('login-section');
  const registerSection = document.getElementById('register-section');

  log('function setupAuthForms - Initialization of authorization forms');

  // Inicjalizacja formularza logowania
  setupLoginForm();

  // Obsługa przełączania na formularz rejestracji
  switchToRegisterBtn.addEventListener('click', event => {
    event.preventDefault();
    log('function setupAuthForms - Switching to the registration form');
    loginSection.style.display = 'none';
    registerSection.style.display = 'flex';
  });

  // Inicjalizacja formularza rejestracji
  setupRegisterForm(() => {
    log(
      'function setupAuthForms - Registration completed successfully, back to login'
    );
    registerSection.style.display = 'none';
    loginSection.style.display = 'flex';
  });
}
