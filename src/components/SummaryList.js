// src/components/SummaryList.js

// Importowanie modułu logowania
import log from '../utils/logger';

// Importowanie stałej API_URL z konfiguracji
import { API_URL } from '../config';

// Funkcja komponentu SummaryList, renderująca widok listy podsumowania
export const SummaryList = () => {
  return `
  <div class="summary-list-container">
    <h2 class="summary-title">Summary</h2>
    <ul id="summary-list" class="summary-list">
    </ul>
  </div>
  `;
};

// Funkcja asynchroniczna do pobrania i przygotowania danych do listy podsumowania
export async function setupSummaryList(type) {
  try {
    // Wysłanie żądania do API w celu pobrania transakcji danego typu (przychody lub wydatki)
    const response = await fetch(`${API_URL}/transactions?type=${type}`, {
      headers: {
        // Dodanie tokena uwierzytelniającego w nagłówkach żądania
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });

    // Sprawdzenie, czy odpowiedź jest poprawna
    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }

    // Parsowanie odpowiedzi jako JSON
    const transactions = await response.json();

    // Renderowanie listy podsumowania na podstawie pobranych transakcji
    renderSummaryList(transactions);
  } catch (error) {
    // Obsługa błędów podczas pobierania transakcji
    console.error(
      `SummaryList - Błąd podczas pobierania transakcji typu ${type}:`,
      error
    );

    // Wyświetlenie komunikatu o błędzie w interfejsie użytkownika
    const summaryList = document.getElementById('summary-list');
    if (summaryList) {
      summaryList.innerHTML = '<li>Error loading summary</li>';
    }
  }
}

// Funkcja do renderowania listy podsumowania na podstawie transakcji
function renderSummaryList(transactions) {
  // Logowanie danych transakcji
  log('renderSummaryList', transactions);

  // Pobranie referencji do elementu DOM, w którym będzie wyświetlana lista podsumowania
  const summaryList = document.getElementById('summary-list');

  if (!summaryList) {
    console.error('renderSummaryList - Nie znaleziono elementu #summary-list');
    return;
  }

  // Tablica z nazwami miesięcy
  const monthsNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Inicjalizacja obiektu do przechowywania sumy transakcji dla każdego miesiąca
  const months = {};

  // Iteracja po wszystkich transakcjach
  transactions.forEach(transaction => {
    // Konwersja daty transakcji na obiekt Date
    const date = new Date(transaction.date);
    // Pobranie nazwy miesiąca z tablicy monthsNames
    const monthName = monthsNames[date.getMonth()];
    // Pobranie roku z daty transakcji
    const year = date.getFullYear();
    // Utworzenie klucza w formacie "Rok Miesiąc", np. "2023 March"
    const key = `${year} ${monthName}`;
    // Pobranie kwoty transakcji
    const amount = transaction.amount;

    // Dodanie kwoty do sumy dla danego miesiąca
    months[key] = (months[key] || 0) + amount;
  });

  // Sortowanie miesięcy w porządku chronologicznym
  const sortedMonths = Object.keys(months).sort((a, b) => {
    const [yearA, monthA] = a.split(' ');
    const [yearB, monthB] = b.split(' ');
    const dateA = new Date(`${monthA} 1, ${yearA}`);
    const dateB = new Date(`${monthB} 1, ${yearB}`);
    return dateB - dateA; // Od najnowszego do najstarszego
  });

  // Generowanie HTML listy podsumowania na podstawie danych
  summaryList.innerHTML = sortedMonths
    .map(monthKey => {
      return `
        <li>
          <span class="month">${monthKey}</span>
          <span class="amount">${months[monthKey].toFixed(2)}</span>
        </li>
      `;
    })
    .join('');
}
