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
    console.log('function handleLogin - User login attempt:', email);
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
      console.log('function handleLogin - Successfully logged in:', data);
      localStorage.setItem('userToken', data.token);

      // Wywołanie renderApp do przerysowania aplikacji
      renderApp();
    } else {
      // Obsługa błędów logowania
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
  console.log('function Login - Login form rendering');
  return `
    <form id="login-form">
      <label for="email">Email:</label>
      <input type="email" id="email" required />
      
      <label for="password">Password:</label>
      <input type="password" id="password" required />
      
      <button type="submit" class="btn btn-primary">Log in</button>
      <button id="switch-to-register" class="btn btn-secondary">Registration</button>
    </form>
  `;
}
