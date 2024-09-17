// src/components/RegisterForm.js
import log from '../utils/logger';
import { API_URL } from '../config';
import { renderApp } from '../index';
import { signInWithGoogle } from '../utils/firebase'; // Import funkcji logowania przez Google

// Funkcja do obsługi rejestracji/logowania przez Google
async function handleGoogleRegister(event) {
  event.preventDefault();

  try {
    log(
      'function handleGoogleRegister - User attempting to register/login with Google'
    );

    // Wywołaj funkcję logowania przez Google
    const user = await signInWithGoogle();

    if (user) {
      // Zalogowano/Rejestrowano pomyślnie
      log(
        'function handleGoogleRegister - Successfully registered/logged in with Google:',
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
          'function handleGoogleRegister - Google login error:',
          data.message || 'Unknown error'
        );
        alert(`Registration error: ${data.message}`);
      }
    }
  } catch (error) {
    console.error(
      'function handleGoogleRegister - Error registering with Google:',
      error
    );
    alert(
      'There was a problem registering with Google. Please try again later.'
    );
  }
}

export default function RegisterForm() {
  log('function RegisterForm - Rendering of registration form');
  return `
    <form id="register-form">
      <div class="google-section">
        <button id="google-register-btn" class="btn btn-google">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo">
          Sign up with Google
        </button>
      </div>
      <label for="register-name">Name:</label>
      <input type="text" id="register-name" name="name" required />
      
      <label for="register-email">Email:</label>
      <input type="email" id="register-email" name="email" required />
      
      <label for="register-password">Password:</label>
      <input type="password" id="register-password" name="password" required />
      
      <button type="submit" class="btn btn-primary">Register</button>
      <button id="switch-to-login" class="btn btn-secondary">Return to login</button>
    </form>
  `;
}

export function setupRegisterForm(onRegisterSuccess) {
  const form = document.getElementById('register-form');
  log('function setupRegisterForm - Initializing the registration form');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());

    try {
      log(
        'function setupRegisterForm - User registration attempt:',
        userData.email
      );
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        log('function setupRegisterForm - Registration completed successfully');
        alert('Registration successful! You can now log in.');
        onRegisterSuccess();
      } else {
        const errorData = await response.json();
        console.error(
          'function setupRegisterForm - Registration error:',
          errorData.message
        );
        alert(`Registration error: ${errorData.message}`);
      }
    } catch (error) {
      console.error(
        'function setupRegisterForm - Error during registration:',
        error
      );
      alert('An error occurred while registering. Please try again later.');
    }
  });

  // Obsługa przycisku logowania przez Google
  const googleRegisterBtn = document.getElementById('google-register-btn');
  googleRegisterBtn.addEventListener('click', event => {
    event.preventDefault();
    handleGoogleRegister(event);
  });

  // Obsługa przycisku przełączania na logowanie
  const switchToLoginBtn = document.getElementById('switch-to-login');
  switchToLoginBtn.addEventListener('click', event => {
    event.preventDefault();
    log('function setupRegisterForm - Switching to login form');
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'flex';
  });
}
