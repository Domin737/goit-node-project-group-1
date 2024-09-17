// src/components/TransactionList.js

// Importowanie modułu logowania
import log from '../utils/logger';

// Importowanie stałej API_URL z konfiguracji
import { API_URL } from '../config';

// Importowanie funkcji showModal z komponentu Modal
import { showModal } from './Modal';

// Importowanie funkcji setupSummaryList z komponentu SummaryList
import { setupSummaryList } from './SummaryList';

// Importowanie stałej TRANSACTIONS z TransactionForm
import { TRANSACTIONS } from './TransactionForm';

// Funkcja komponentu TransactionList, renderująca listę transakcji dla danego typu
export function TransactionList({ type }) {
  log(`TransactionList - Renderowanie listy transakcji dla ${type}`);
  return `
    <div class="transaction-container">
      <h3>List of ${type === 'income' ? 'Income' : 'Expenses'}</h3>
      <div class="transaction-list-header">
        <div class="transaction-info">
          <div class="transaction-details">
            <span class="date">DATE</span>
            <span class="description">DESCRIPTION</span>
            <span class="category">CATEGORY</span>
          </div>
        </div>
        <span class="transaction-amount">SUM</span>
        <span class="delete-placeholder"></span>
      </div>
      <ul id="transaction-list" class="transaction-list"></ul>
    </div>
  `;
}

// Funkcja asynchroniczna do inicjalizacji listy transakcji
export async function setupTransactionList(onTransactionDeleted, type) {
  // Pobranie referencji do elementu listy transakcji w DOM
  const transactionList = document.getElementById('transaction-list');

  // Dodanie pojedynczego nasłuchiwacza zdarzeń 'click' do transactionList (delegacja zdarzeń)
  transactionList.addEventListener('click', async e => {
    if (e.target.classList.contains('delete-transaction')) {
      // Pobranie ID transakcji z atrybutu 'data-id' elementu listy
      const transactionId = e.target.closest('li').dataset.id;
      log(
        `TransactionList - Próba usunięcia transakcji typu ${type} o ID:`,
        transactionId
      );
      // Wyświetlenie modalu potwierdzającego usunięcie transakcji
      showConfirmationModal(
        'Are you sure you want to delete this transaction?',
        async () => {
          try {
            // Wysłanie żądania DELETE do API w celu usunięcia transakcji
            const response = await fetch(
              `${API_URL}/transactions/${transactionId}`,
              {
                method: 'DELETE',
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
              }
            );

            // Sprawdzenie, czy odpowiedź jest poprawna
            if (!response.ok) {
              throw new Error('Error while deleting transaction');
            }

            // Parsowanie odpowiedzi jako JSON
            const result = await response.json();
            // Usunięcie elementu transakcji z listy w interfejsie użytkownika
            e.target.closest('li').remove();
            log(`TransactionList - Transakcja typu ${type} usunięta pomyślnie`);
            // Wyświetlenie komunikatu potwierdzającego usunięcie
            alert(
              `${
                type.charAt(0).toUpperCase() + type.slice(1)
              } transaction deleted successfully`
            );

            // Wywołanie funkcji callback po usunięciu transakcji
            if (onTransactionDeleted) {
              onTransactionDeleted(result.newBalance);
            }
            // Aktualizacja listy podsumowania
            setupSummaryList(type);
          } catch (error) {
            // Obsługa błędów podczas usuwania transakcji
            console.error(
              `TransactionList - Błąd podczas usuwania transakcji typu ${type}:`,
              error
            );
            // Wyświetlenie komunikatu o błędzie
            alert(`An error occurred while deleting the ${type} transaction`);
          }
        }
      );
    }
  });

  // Funkcja asynchroniczna do pobierania transakcji z API
  async function fetchTransactions() {
    log(`TransactionList - Pobieranie transakcji typu ${type}`);
    try {
      // Wysłanie żądania do API w celu pobrania transakcji danego typu
      const response = await fetch(`${API_URL}/transactions?type=${type}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      // Parsowanie odpowiedzi jako JSON
      const transactions = await response.json();
      log(`TransactionList - Pobrano transakcje typu ${type}:`, transactions);
      // Renderowanie pobranych transakcji
      renderTransactions(transactions);
    } catch (error) {
      // Obsługa błędów podczas pobierania transakcji
      console.error(
        `TransactionList - Błąd podczas pobierania transakcji typu ${type}:`,
        error
      );
      // Wyświetlenie komunikatu o błędzie w interfejsie użytkownika
      transactionList.innerHTML = '<li>Error loading transactions</li>';
    }
  }

  // Funkcja mapująca wartości kategorii na ich oryginalne nazwy
  function getCategoryDisplayName(type, categoryValue) {
    const transactionCategories = TRANSACTIONS[type]?.categories || [];
    for (const categoryName of transactionCategories) {
      const value = categoryName.toLowerCase().split(' ').join('_');
      if (value === categoryValue) {
        return categoryName;
      }
    }
    // Jeśli nie znaleziono, zwróć oryginalną wartość
    return categoryValue;
  }

  // Funkcja do renderowania listy transakcji w interfejsie użytkownika
  function renderTransactions(transactions) {
    log(`TransactionList - Renderowanie transakcji typu ${type}`);
    // Generowanie HTML dla listy transakcji
    transactionList.innerHTML = transactions
      .map(
        transaction => `
            <li data-id="${transaction._id}">
              <div class="transaction-info">
                <div class="transaction-details">
                  <span class="date">${formatDate(transaction.date)}</span>
                  <span class="description">${transaction.description}</span>
                  <span class="category">${getCategoryDisplayName(
                    transaction.type,
                    transaction.category
                  )}</span>
                </div>
              </div>
              <span class="transaction-amount ${
                transaction.type
              }">${transaction.amount.toFixed(2)} EUR</span>
              <button class="delete-transaction btn-icon">🗑️</button>
            </li>
          `
      )
      .join('');
  }

  // Funkcja do formatowania daty w formacie DD.MM.RRRR
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  // Inicjalizacja listy transakcji przy pierwszym załadowaniu
  await fetchTransactions();

  // Zwracamy obiekt z metodą do odświeżania listy transakcji
  return {
    refreshTransactions: fetchTransactions,
  };
}

// Funkcja do wyświetlania modalu potwierdzenia przed usunięciem transakcji
function showConfirmationModal(message, confirmAction) {
  // Użycie funkcji showModal z komponentu Modal
  showModal({
    message,
    confirmLabel: 'YES',
    cancelLabel: 'NO',
    confirmAction,
    cancelAction: () => {},
  });
}
