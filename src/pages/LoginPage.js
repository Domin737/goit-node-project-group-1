// /src/pages/LoginPage.js

import Login, { handleLogin } from '../components/Login';

// Funkcja renderująca stronę logowania
export default function LoginPage() {
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

// Funkcja do przypisania obsługi logowania po załadowaniu DOM
export function renderLogin() {
  const loginHTML = Login();
  document.getElementById('app').innerHTML = loginHTML;

  // Przypisanie obsługi do formularza logowania
  document.getElementById('login-form').addEventListener('submit', handleLogin);
}
