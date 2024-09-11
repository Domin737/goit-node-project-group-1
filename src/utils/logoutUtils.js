// /src/utils/logoutUtils.js

// Funkcja do wylogowania użytkownika
export async function handleLogout() {
  console.log('Handling logout...'); // Log w konsoli, aby sprawdzić, czy funkcja się wywołuje

  try {
    const token = localStorage.getItem('userToken');
    if (!token) {
      throw new Error('Brak tokenu uwierzytelniającego');
    }

    // Wysyłanie żądania wylogowania do backendu
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Błąd podczas wylogowywania');
    }

    // Usunięcie tokena JWT z localStorage
    localStorage.removeItem('userToken');

    // Można dodać więcej informacji do wyczyszczenia, np. imię użytkownika, email itp.
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');

    alert('Wylogowano pomyślnie!');

    // Aktualizacja interfejsu użytkownika
    updateUIAfterLogout();
  } catch (error) {
    console.error('Błąd podczas wylogowywania:', error);
    alert(`Wystąpił błąd podczas wylogowywania: ${error.message}`);
  }
}

function updateUIAfterLogout() {
  // Tutaj możesz dodać kod do aktualizacji interfejsu użytkownika
  // Na przykład, ukrycie elementów dostępnych tylko dla zalogowanych użytkowników

  // Przekierowanie na stronę logowania
  window.location.href = '/login';
}
