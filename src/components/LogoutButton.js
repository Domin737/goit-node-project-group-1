// src/components/LogoutButton.js
function LogoutButton() {
  // Stwórz przycisk
  const button = document.createElement('button');
  button.textContent = 'Wyloguj'; // Tekst przycisku
  button.className = 'logout-btn'; // Dodaj klasę CSS

  // Dodaj nasłuchiwanie zdarzeń
  button.addEventListener('click', () => {
    // Usunięcie tokena z localStorage
    localStorage.removeItem('token');
    // Przekierowanie użytkownika na stronę logowania
    window.location.href = '/login';
  });

  return button.outerHTML;
}

export default LogoutButton;
