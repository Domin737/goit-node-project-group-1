// src/components/Login.js
import { API_URL } from '../config';
import { renderApp } from '../index';

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
      console.log('Successfully logged in:', data);
      localStorage.setItem('userToken', data.token);

      // Wywołanie renderApp do przerysowania aplikacji
      renderApp();
    } else {
      // Obsługa błędów logowania
      console.error('Login error:', data.message || 'Unknown error');
      alert(`Login error: ${data.message}`);
    }
  } catch (error) {
    console.error('There was a problem logging in:', error);
    alert('There was a problem logging in. Please try again later.');
  }
}

// Funkcja renderująca formularz logowania
export default function Login() {
  return `
    <form id="login-form">
      <label for="email">Email:</label>
      <input type="email" id="email" required />
      
      <label for="password">Password:</label>
      <input type="password" id="password" required />
      
      <button type="submit">Log in</button>
    </form>
  `;
}
