// /src/utils/logoutUtils.js

export async function handleLogout() {
  try {
    const token = localStorage.getItem('userToken');
    if (!token) {
      throw new Error('Brak tokenu uwierzytelniającego');
    }

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

    // Przekierowanie na stronę logowania
    window.location.href = '/login';
  } catch (error) {
    console.error('Błąd podczas wylogowywania:', error);
    alert(`Wystąpił błąd podczas wylogowywania: ${error.message}`);
  }
}
