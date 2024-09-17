// src/utils/logoutUtils.js

// Importowanie stałej API_URL z konfiguracji
import { API_URL } from '../config';

// Funkcja asynchroniczna do obsługi wylogowania użytkownika
export async function handleLogout() {
  try {
    // Pobranie tokena JWT z localStorage
    const token = localStorage.getItem('userToken');

    // Sprawdzenie, czy token istnieje
    if (!token) {
      // Jeśli token nie istnieje, rzucamy błąd
      throw new Error('No authentication token');
    }

    // Wysłanie żądania POST do endpointu wylogowania
    const response = await fetch(`${API_URL}/users/logout`, {
      method: 'POST',
      headers: {
        // Dodanie nagłówka Authorization z tokenem
        Authorization: `Bearer ${token}`,
        // Ustawienie typu zawartości na application/json
        'Content-Type': 'application/json',
      },
    });

    // Sprawdzenie, czy odpowiedź z serwera jest prawidłowa
    if (!response.ok) {
      // Jeśli odpowiedź nie jest OK, rzucamy błąd
      throw new Error('Error while logging out');
    }

    // Usunięcie tokena JWT z localStorage
    localStorage.removeItem('userToken');

    // Opcjonalne usunięcie innych danych użytkownika z localStorage
    // Można dodać więcej informacji do wyczyszczenia, np. imię użytkownika, email itp.
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');

    // Przekierowanie na stronę logowania
    window.location.href = '/login';
  } catch (error) {
    // Obsługa błędów podczas wylogowania
    console.error('function handleLogout - Error while logging out:', error);
    // Wyświetlenie alertu z komunikatem o błędzie
    alert(`An error occurred while logging out: ${error.message}`);
  }
}
