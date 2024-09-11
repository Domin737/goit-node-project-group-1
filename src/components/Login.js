// /src/components/Login.js

import { API_URL } from '../config';
import HomePage from '../pages/HomePage'; // Upewnijmy się, że HomePage jest poprawnie importowane

// Funkcja do obsługi logowania
export async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Wysłanie zapytania POST do API
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Zalogowano pomyślnie, zapisujemy token
      console.log('Zalogowano pomyślnie:', data);
      localStorage.setItem('userToken', data.token);

      // Przekierowanie na stronę główną
      document.getElementById('app').innerHTML = HomePage();
    } else {
      // Obsługa błędów logowania
      console.error('Błąd logowania:', data.message || 'Nieznany błąd');
      alert(`Błąd logowania: ${data.message}`);
    }
  } catch (error) {
    console.error('Wystąpił problem z logowaniem:', error);
    alert('Wystąpił problem z logowaniem. Spróbuj ponownie później.');
  }
}

// Funkcja renderująca formularz logowania
export default function Login() {
  return `
    <div>
      <h2>Logowanie</h2>
      <form id="login-form">
        <label for="email">Email:</label>
        <input type="email" id="email" required />
        
        <label for="password">Hasło:</label>
        <input type="password" id="password" required />
        
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  `;
}
