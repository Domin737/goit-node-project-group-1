// /src/components/Login.js
// /src/components/Login.js
import { API_URL } from '../config';

// Funkcja do obsługi logowania
function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Proste sprawdzenie czy pola są wypełnione
  if (!email || !password) {
    alert('Proszę wypełnić wszystkie pola');
    return;
  }

  // Wysłanie danych logowania do API
  fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        // Zapisz token do localStorage
        localStorage.setItem('userToken', data.token);
        // Przekieruj na stronę główną
        window.location.reload();
      } else {
        alert('Logowanie nie powiodło się: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Błąd logowania:', error);
    });
}

// Funkcja renderująca HTML formularza logowania
function Login() {
  return `
    <div>
      <h2>Logowanie</h2>
      <form id="login-form">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label for="password">Hasło:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  `;
}

// Funkcja do przypisania obsługi do formularza po załadowaniu DOM
export default function renderLogin() {
  const loginHTML = Login();
  document.getElementById('app').innerHTML = loginHTML;

  // Po załadowaniu HTML przypisujemy obsługę formularza
  document.getElementById('login-form').addEventListener('submit', handleLogin);
}
