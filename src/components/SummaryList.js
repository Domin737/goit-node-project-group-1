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
  }
}

// Funkcja do renderowania listy podsumowania na podstawie transakcji
function renderSummaryList(transactions) {
  // Logowanie danych transakcji
  log('renderSummaryList', transactions);
  // Pobranie referencji do elementu DOM, w którym będzie wyświetlana lista podsumowania
  const summaryList = document.getElementById('summary-list');

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

  // Inicjalizacja Mapy do przechowywania sumy transakcji dla każdego miesiąca
  const months = new Map();

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

    // Sprawdzenie, czy dla danego miesiąca istnieje już suma transakcji
    if (months.has(key)) {
      // Jeśli tak, dodaj kwotę transakcji do istniejącej sumy
      months.set(key, months.get(key) + amount);
    } else {
      // Jeśli nie, utwórz nowy wpis w Mapie dla tego miesiąca z aktualną kwotą
      months.set(key, amount);
    }
  });

  // Generowanie HTML listy podsumowania na podstawie danych w Mapie months
  summaryList.innerHTML = [...months.entries()]
    .map(month => {
      return `
        <li>
          <span class="month">${month[0]}</span>
          <span class="amount">${month[1].toFixed(2)}</span>
        </li>
      `;
    })
    .join('');
}
