// src/components/Login.js

// Importowanie modułu logowania
import log from '../utils/logger';
// Importowanie stałej API_URL z konfiguracji
import { API_URL } from '../config';
// Importowanie funkcji renderApp z głównego pliku index.js
import { renderApp } from '../index';
// Importowanie funkcji signInWithGoogle z utils/firebase (logowanie przez Google)
import { signInWithGoogle } from '../utils/firebase'; // Import funkcji logowania przez Google

// Funkcja do obsługi logowania przez Google
async function handleGoogleLogin(event) {
  // Zapobiega domyślnemu zachowaniu formularza
  event.preventDefault();

  try {
    // Logowanie próby logowania przez Google
    log('function handleGoogleLogin - User attempting to log in with Google');

    // Wywołaj funkcję logowania przez Google
    const user = await signInWithGoogle();

    if (user) {
      // Zalogowano pomyślnie
      log(
        'function handleGoogleLogin - Successfully logged in with Google:',
        user
      );

      // Pobierz token Firebase dla zalogowanego użytkownika
      const token = await user.getIdToken();

      // Wyślij token na backend w celu uwierzytelnienia lub rejestracji
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
        // Zapisz token w localStorage po pomyślnym zalogowaniu
        localStorage.setItem('userToken', data.token);

        // Przerysuj aplikację po zalogowaniu
        renderApp();
      } else {
        // Obsługa błędu podczas logowania przez Google
        console.error(
          'function handleGoogleLogin - Google login error:',
          data.message || 'Unknown error'
        );
        // Wyświetl alert z komunikatem o błędzie
        alert(`Login error: ${data.message}`);
      }
    }
  } catch (error) {
    // Obsługa wyjątków podczas logowania przez Google
    console.error(
      'function handleGoogleLogin - Error logging in with Google:',
      error
    );
    // Wyświetl ogólny komunikat o błędzie
    alert(
      'There was a problem logging in with Google. Please try again later.'
    );
  }
}

// Funkcja do obsługi logowania przez email i hasło
export async function handleLogin(event) {
  // Zapobiega domyślnemu zachowaniu formularza
  event.preventDefault();

  // Pobranie wartości pól email i password z formularza
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Prosta walidacja wypełnienia pól
  if (!email || !password) {
    alert('Please fill out both the email and password fields.');
    return;
  }

  try {
    // Logowanie próby logowania użytkownika
    log('function handleLogin - User login attempt:', email);
    // Wysłanie żądania POST do endpointu logowania
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Przekazanie danych logowania w ciele żądania
      body: JSON.stringify({ email, password }),
    });

    // Parsowanie odpowiedzi z serwera
    const data = await response.json();

    if (response.ok) {
      // Logowanie pomyślnego zalogowania
      log('function handleLogin - Successfully logged in:', data);
      // Zapisz token w localStorage
      localStorage.setItem('userToken', data.token);
      // Przerysuj aplikację po zalogowaniu
      renderApp();
    } else {
      // Obsługa błędu podczas logowania
      console.error(
        'function handleLogin - Login error:',
        data.message || 'Unknown error'
      );
      // Wyświetl alert z komunikatem o błędzie
      alert(`Login error: ${data.message}`);
    }
  } catch (error) {
    // Obsługa wyjątków podczas logowania
    console.error(
      'function handleLogin - There was a problem logging in:',
      error
    );
    // Wyświetl ogólny komunikat o błędzie
    alert('There was a problem logging in. Please try again later.');
  }
}

// Funkcja renderująca formularz logowania
export default function Login() {
  // Logowanie renderowania formularza logowania
  log('function Login - Login form rendering');
  // Zwracanie szablonu HTML formularza
  return `
    <form id="login-form">
      <div class="google-section">
        <button id="google-login-btn" class="btn btn-google">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo">
          Log in with Google
        </button>
      </div>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required />
      
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required />
      
      <button type="submit" class="btn btn-primary">Log in</button>
      <button id="switch-to-register" class="btn btn-secondary">Registration</button>
    </form>
  `;
}

// Funkcja inicjalizująca obsługę formularza logowania i przycisku Google po załadowaniu DOM
export function setupLoginForm() {
  // Pobranie referencji do elementów DOM
  const loginForm = document.getElementById('login-form');
  const googleLoginBtn = document.getElementById('google-login-btn');

  // Dodanie obsługi zdarzenia 'submit' dla formularza logowania
  loginForm.addEventListener('submit', handleLogin);

  // Dodanie obsługi kliknięcia dla przycisku logowania przez Google
  googleLoginBtn.addEventListener('click', event => {
    event.preventDefault(); // Zapobiegamy domyślnej akcji (jeśli wciąż znajduje się w formularzu)
    handleGoogleLogin(event); // Wywołujemy logowanie przez Google
  });
}
