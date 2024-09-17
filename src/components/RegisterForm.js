// src/components/RegisterForm.js

// Importowanie modułu logowania
import log from '../utils/logger';

// Importowanie stałych i funkcji z innych modułów
import { API_URL } from '../config';
import { renderApp } from '../index';
import { signInWithGoogle } from '../utils/firebase'; // Import funkcji logowania przez Google

// Funkcja do obsługi rejestracji/logowania przez Google
async function handleGoogleRegister(event) {
  // Zapobieganie domyślnemu zachowaniu formularza
  event.preventDefault();

  try {
    // Logowanie próby rejestracji/logowania przez Google
    log(
      'function handleGoogleRegister - User attempting to register/login with Google'
    );

    // Wywołanie funkcji logowania przez Google
    const user = await signInWithGoogle();

    if (user) {
      // Zalogowano/Rejestrowano pomyślnie
      log(
        'function handleGoogleRegister - Successfully registered/logged in with Google:',
        user
      );

      // Pobranie tokena Firebase od zalogowanego użytkownika
      const token = await user.getIdToken();

      // Wysłanie tokena na backend w celu uwierzytelnienia lub rejestracji
      const response = await fetch(`${API_URL}/users/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Przekazanie tokena w ciele żądania
        body: JSON.stringify({ token }),
      });

      // Parsowanie odpowiedzi z serwera
      const data = await response.json();

      if (response.ok) {
        // Zapisanie tokena JWT w localStorage
        localStorage.setItem('userToken', data.token);

        // Przerysowanie aplikacji po zalogowaniu
        renderApp();
      } else {
        // Obsługa błędu podczas logowania przez Google
        console.error('Registration error:', data.message || 'Unknown error');
        alert(
          'An error occurred during Google registration. Please try again later.'
        );
      }
    }
  } catch (error) {
    // Obsługa wyjątku podczas rejestracji/logowania przez Google
    console.error('Registration error:', error);
    alert(
      'An error occurred during Google registration. Please try again later.'
    );
  }
}

// Domyślny eksport funkcji renderującej formularz rejestracji
export default function RegisterForm() {
  // Logowanie renderowania formularza rejestracji
  log('function RegisterForm - Rendering of registration form');
  // Zwracanie szablonu HTML formularza
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

// Funkcja do inicjalizacji formularza rejestracji po załadowaniu DOM
export function setupRegisterForm(onRegisterSuccess) {
  // Pobranie referencji do formularza rejestracji
  const form = document.getElementById('register-form');
  // Logowanie inicjalizacji formularza rejestracji
  log('function setupRegisterForm - Initializing the registration form');

  // Dodanie obsługi zdarzenia 'submit' dla formularza
  form.addEventListener('submit', async e => {
    // Zapobieganie domyślnemu zachowaniu formularza
    e.preventDefault();
    // Utworzenie obiektu FormData z formularza
    const formData = new FormData(form);
    // Konwersja FormData do zwykłego obiektu
    const userData = Object.fromEntries(formData.entries());

    try {
      // Logowanie próby rejestracji użytkownika
      log(
        'function setupRegisterForm - User registration attempt:',
        userData.email
      );
      // Wysłanie żądania POST do endpointu rejestracji
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Przekazanie danych użytkownika w ciele żądania
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Logowanie pomyślnego zakończenia rejestracji
        log('function setupRegisterForm - Registration completed successfully');
        // Wyświetlenie komunikatu o sukcesie
        alert('Registration successful! You can now log in.');
        // Wywołanie funkcji po pomyślnej rejestracji
        onRegisterSuccess();
      } else {
        // Pobranie danych błędu z odpowiedzi
        const errorData = await response.json();
        // Logowanie błędu rejestracji
        console.error('Registration error:', errorData.message);
        // Wyświetlenie komunikatu o błędzie
        alert('An error occurred during registration. Please try again later.');
      }
    } catch (error) {
      // Obsługa wyjątków podczas rejestracji
      console.error('Registration error:', error);
      // Wyświetlenie komunikatu o błędzie
      alert('An error occurred during registration. Please try again later.');
    }
  });

  // Obsługa przycisku rejestracji przez Google
  const googleRegisterBtn = document.getElementById('google-register-btn');
  googleRegisterBtn.addEventListener('click', event => {
    // Zapobieganie domyślnemu zachowaniu
    event.preventDefault();
    // Wywołanie funkcji obsługującej rejestrację przez Google
    handleGoogleRegister(event);
  });

  // Obsługa przycisku przełączania na formularz logowania
  const switchToLoginBtn = document.getElementById('switch-to-login');
  switchToLoginBtn.addEventListener('click', event => {
    // Zapobieganie domyślnemu zachowaniu
    event.preventDefault();
    // Logowanie przełączania na formularz logowania
    log('function setupRegisterForm - Switching to login form');
    // Ukrycie sekcji rejestracji
    document.getElementById('register-section').style.display = 'none';
    // Wyświetlenie sekcji logowania
    document.getElementById('login-section').style.display = 'flex';
  });
}
