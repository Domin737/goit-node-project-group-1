// /src/utils/logoutUtils.js

// Funkcja do wylogowania użytkownika
export function handleLogout() {
  console.log('Handling logout...'); // Log w konsoli, aby sprawdzić, czy funkcja się wywołuje

  // Usunięcie tokena JWT z localStorage
  localStorage.removeItem('userToken');

  // Można dodać więcej informacji do wyczyszczenia, np. imię użytkownika, email itp.
  alert('Wylogowano pomyślnie!');

  // Przekierowanie na stronę logowania
  location.reload(); // Możesz też użyć `window.location.href = '/';` aby przekierować na stronę główną
}
