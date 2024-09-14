// src/index.js
import log from './utils/logger';
import HomePage, { setupHomePage } from './pages/HomePage';
import LoginPage, { setupAuthForms } from './pages/LoginPage';
import './styles/index.scss';

function renderApp() {
  const token = localStorage.getItem('userToken');
  const appContainer = document.getElementById('app');

  if (token) {
    appContainer.innerHTML = HomePage();
    setupHomePage();
  } else {
    appContainer.innerHTML = LoginPage();
    setupAuthForms();
  }
}

document.addEventListener('DOMContentLoaded', renderApp);

// Nasłuchiwanie na zmiany w localStorage (np. po zalogowaniu lub wylogowaniu)
window.addEventListener('storage', event => {
  if (event.key === 'userToken') {
    renderApp();
  }
});

// Eksportujemy funkcję renderApp, aby można było jej użyć w innych miejscach aplikacji
export { renderApp };
