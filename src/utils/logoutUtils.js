// src/utils/logoutUtils.js
import log from './logger';

export async function handleLogout() {
  try {
    const token = localStorage.getItem('userToken');
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error while logging out');
    }

    // Usunięcie tokena JWT z localStorage
    localStorage.removeItem('userToken');

    // Można dodać więcej informacji do wyczyszczenia, np. imię użytkownika, email itp.
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');

    // Przekierowanie na stronę logowania
    window.location.href = '/login';
  } catch (error) {
    console.error('function handleLogout - Error while logging out:', error);
    alert(`An error occurred while logging out: ${error.message}`);
  }
}
