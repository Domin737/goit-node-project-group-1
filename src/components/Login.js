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
    console.log('Próba logowania użytkownika:', email);
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

      // Wywołanie renderApp do przerysowania aplikacji
      renderApp();
    } else {
      // Obsługa błędów logowania
      console.error('Błąd logowania:', data.message || 'Nieznany błąd');
      alert(`Login error: ${data.message}`);
    }
  } catch (error) {
    console.error('Wystąpił problem podczas logowania:', error);
    alert('There was a problem logging in. Please try again later.');
  }
}

// Funkcja renderująca formularz logowania
export default function Login() {
  console.log('Renderowanie formularza logowania');
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
