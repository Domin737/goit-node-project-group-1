// src/pages/LoginPage.js
import Login, { handleLogin } from '../components/Login';
import RegisterForm, { setupRegisterForm } from '../components/RegisterForm';
import logo from '../images/logo-big.svg';

// Funkcja renderująca stronę logowania
export default function LoginPage() {
  console.log('function LoginPage - Rendering the login page');
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
      <div id="register-section" style="display: none;">
        ${RegisterForm()}
        <button id="switch-to-login">Log in</button>
      </div>
    </div>
  `;
}

// Funkcja do przypisania obsługi logowania i rejestracji po załadowaniu DOM
export function setupAuthForms() {
  const loginForm = document.getElementById('login-form');
  const switchToRegisterBtn = document.getElementById('switch-to-register');
  const switchToLoginBtn = document.getElementById('switch-to-login');
  const loginSection = document.getElementById('login-section');
  const registerSection = document.getElementById('register-section');

  console.log(
    'function setupAuthForms - Initialization of authorization forms'
  );
  loginForm.addEventListener('submit', handleLogin);

  switchToRegisterBtn.addEventListener('click', () => {
    console.log('function setupAuthForms - Switching to the registration form');
    loginSection.style.display = 'none';
    registerSection.style.display = 'block';
  });

  switchToLoginBtn.addEventListener('click', () => {
    console.log('function setupAuthForms - Switching to login form');
    registerSection.style.display = 'none';
    loginSection.style.display = 'block';
  });

  setupRegisterForm(() => {
    console.log(
      'function setupAuthForms - Registration completed successfully, back to login'
    );
    registerSection.style.display = 'none';
    loginSection.style.display = 'block';
  });
}
