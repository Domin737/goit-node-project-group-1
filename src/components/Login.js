// src/components/Login.js
import log from '../utils/logger';
import { API_URL } from '../config';
import { renderApp } from '../index';
import { signInWithGoogle } from '../utils/firebase'; // Import funkcji logowania przez Google

// Funkcja do obsługi logowania przez Google
async function handleGoogleLogin(event) {
  event.preventDefault();

  try {
    log('function handleGoogleLogin - User attempting to log in with Google');

    // Wywołaj funkcję logowania przez Google
    const user = await signInWithGoogle();

    if (user) {
      // Zalogowano pomyślnie
      log(
        'function handleGoogleLogin - Successfully logged in with Google:',
        user
      );

      // Pobierz token Firebase
      const token = await user.getIdToken();

      // Wyślij token na backend
      const response = await fetch(`${API_URL}/users/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        // Zapisz token w localStorage
        localStorage.setItem('userToken', data.token);

        // Przerysuj aplikację po zalogowaniu
        renderApp();
      } else {
        console.error(
          'function handleGoogleLogin - Google login error:',
          data.message || 'Unknown error'
        );
        alert(`Login error: ${data.message}`);
      }
    }
  } catch (error) {
    console.error(
      'function handleGoogleLogin - Error logging in with Google:',
      error
    );
    alert(
      'There was a problem logging in with Google. Please try again later.'
    );
  }
}

// Funkcja do obsługi logowania przez email i hasło
export async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    log('function handleLogin - User login attempt:', email);
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      log('function handleLogin - Successfully logged in:', data);
      localStorage.setItem('userToken', data.token);
      renderApp();
    } else {
      console.error(
        'function handleLogin - Login error:',
        data.message || 'Unknown error'
      );
      alert(`Login error: ${data.message}`);
    }
  } catch (error) {
    console.error(
      'function handleLogin - There was a problem logging in:',
      error
    );
    alert('There was a problem logging in. Please try again later.');
  }
}

// Funkcja renderująca formularz logowania
export default function Login() {
  log('function Login - Login form rendering');
  return `
    <form id="login-form">
      <label for="email">Email:</label>
      <input type="email" id="email" required />
      
      <label for="password">Password:</label>
      <input type="password" id="password" required />
      
      <button type="submit" class="btn btn-primary">Log in</button>
      <button id="switch-to-register" class="btn btn-secondary">Registration</button>
      
      <!-- Dodaj przycisk Google -->
      <button id="google-login-btn" class="btn btn-google">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo">
        Log in with Google
      </button>
    </form>
  `;
}

// Obsługa formularza logowania i przycisku Google po załadowaniu DOM
export function setupLoginForm() {
  const loginForm = document.getElementById('login-form');
  const googleLoginBtn = document.getElementById('google-login-btn');

  loginForm.addEventListener('submit', handleLogin);
  googleLoginBtn.addEventListener('click', handleGoogleLogin);
}
