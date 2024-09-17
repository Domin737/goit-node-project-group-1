// src/components/TransactionForm.js

// Importowanie modułu logowania
import log from '../utils/logger';

// Importowanie stałej API_URL z konfiguracji
import { API_URL } from '../config';

// Importowanie funkcji showModal i closeModal z komponentu Modal
import { showModal, closeModal } from './Modal';

// Importowanie funkcji checkAndShowZeroBalanceModal z komponentu Balance
import { checkAndShowZeroBalanceModal } from './Balance';

// Definicja stałej TRANSACTIONS zawierającej typy transakcji i ich kategorie
const TRANSACTIONS = {
  expense: {
    type: 'expense',
    categories: [
      'Transport',
      'Products',
      'Health',
      'Alcohol',
      'Entertainment',
      'Housing',
      'Technique',
      'Communication',
      'Hobbies',
      'Education',
      'Other',
    ],
  },
  income: {
    type: 'income',
    categories: ['Salary', 'Additional income'],
  },
};

// Zmienna globalna przechowująca aktualnie wybrany typ transakcji
let viewType = null;

// Funkcja komponentu TransactionForm, renderująca formularz dodawania transakcji
export function TransactionForm(defaultType = '') {
  log('function TransactionForm - Renderowanie formularza transakcji');
  return `
    <div class="transaction-form-container">
      <h3>Add transaction</h3>
      <form id="transaction-form" class="transaction-form">
        <div class="form-group">
          <input type="date" id="transaction-date" required>
        </div>
        <div class="form-group">
          <input type="text" id="transaction-description" placeholder="Description" required>
        </div>
        <div class="form-group">
          <select id="transaction-category" required>
          </select>
        </div>
        <div class="form-group">
          <input type="number" id="transaction-amount" placeholder="Amount" step="0.01" required>
        </div>

        <div class="form-group">
          <button type="submit" class="btn btn-primary">Input</button>
          <button type="reset" class="btn btn-secondary">Clear</button>
        </div>
      </form>
    </div>
  `;
}

// Funkcja do zmiany typu formularza transakcji i ustawienia odpowiednich kategorii
export const changeTypeTransactionForm = type => {
  // Pobranie informacji o transakcji na podstawie wybranego typu
  const transaction = TRANSACTIONS[type];

  // Funkcja do ustawienia opcji w polu select dla kategorii
  const setCategorySelect = categories => {
    const select = document.querySelector('#transaction-category');

    select.innerHTML =
      `<option disabled selected>Product category</option>` +
      categories
        .map(category => {
          // Konwersja kategorii na format odpowiedni dla wartości atrybutu 'value' w elemencie option
          const value = category.includes(' ')
            ? category.split(' ').join('_').toLowerCase()
            : category.toLowerCase();

          return `<option value="${value}">${category}</option>`;
        })
        .join('');
  };

  // Ustawienie aktualnego typu widoku i zaktualizowanie listy kategorii
  viewType = transaction.type;
  setCategorySelect(transaction.categories);
};

// Funkcja do inicjalizacji formularza transakcji i obsługi zdarzeń
export function setupTransactionForm(onTransactionAdded) {
  log('function setupTransactionForm - Inicjalizacja formularza transakcji');

  // Pobranie referencji do formularza
  const form = document.getElementById('transaction-form');

  // Ustawienie domyślnej daty na dzisiejszą
  const dateInput = form.querySelector('#transaction-date');
  dateInput.value = new Date().toISOString().slice(0, 10);

  // Dodanie obsługi zdarzenia 'submit' dla formularza
  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Pobranie wartości pól formularza
    const date = document.getElementById('transaction-date').value;
    const category = document.getElementById('transaction-category').value;
    const amount = parseFloat(
      document.getElementById('transaction-amount').value
    );
    const description = document.getElementById(
      'transaction-description'
    ).value;

    // Logowanie dodawanej transakcji
    log('function setupTransactionForm - Dodawanie nowej transakcji:', {
      type: viewType,
      date,
      category,
      amount,
      description,
    });

    try {
      // Wysłanie żądania POST do API w celu dodania nowej transakcji
      const response = await fetch(`${API_URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify({
          type: viewType,
          date,
          category,
          amount,
          description,
        }),
      });

      // Sprawdzenie, czy odpowiedź jest poprawna
      if (!response.ok) {
        throw new Error('Error while adding transaction');
      }

      // Parsowanie odpowiedzi jako JSON
      const result = await response.json();
      log(
        'function setupTransactionForm - Transakcja dodana pomyślnie:',
        result
      );

      // Wyświetlenie modalu z potwierdzeniem dodania transakcji
      showModal({
        message: 'Transaction added successfully',
        confirmLabel: 'OK',
        confirmAction: async () => {
          closeModal();
          form.reset();

          if (onTransactionAdded) {
            await onTransactionAdded(result.transaction, result.newBalance);
          }

          // Sprawdzenie, czy nowy bilans wynosi 0 i wyświetlenie odpowiedniego modalu
          await checkAndShowZeroBalanceModal();
        },
      });
    } catch (error) {
      // Obsługa błędów podczas dodawania transakcji
      console.error(
        'function setupTransactionForm - Błąd podczas dodawania transakcji:',
        error
      );
      // Wyświetlenie modalu z informacją o błędzie
      showModal({
        message: 'An error occurred while adding the transaction.',
        confirmLabel: 'OK',
        confirmAction: () => {},
      });
    }
  });
}
