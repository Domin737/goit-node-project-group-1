// src/components/Balance.js

// Importowanie modułu logowania
import log from '../utils/logger';
// Importowanie stałej API_URL z konfiguracji
import { API_URL } from '../config';
// Importowanie funkcji showModal i closeModal z komponentu Modal
import { showModal, closeModal } from './Modal';

// Funkcja do wyświetlania modalnego okna potwierdzenia
function showConfirmationModal(message, confirmAction) {
  log(
    'function showConfirmationModal - Wyświetlanie modalu potwierdzenia z wiadomością:',
    message
  );
  showModal({
    message,
    confirmLabel: 'YES',
    cancelLabel: 'NO',
    confirmAction: () => {
      log('function showConfirmationModal [showModal] - Akcja potwierdzona');
      confirmAction();
    },
    cancelAction: () => {
      log('function showConfirmationModal [showModal] - Akcja anulowana');
    },
  });
}

// Funkcja komponentu Balance, renderująca widok salda
export function Balance() {
  log('function Balance - Renderowanie komponentu Balance');
  return `
    <div class="balance-container">
      <h2>BALANCE</h2>
      <p id="balance-amount" class="balance-amount">Loading...</p>
      <button id="update-balance-btn" class="btn btn-primary">Update</button>
      <div class="balance-actions">
        <button id="show-reports-btn" class="btn btn-reports">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 20H14V4H10V20ZM4 20H8V12H4V20ZM16 9V20H20V9H16Z" fill="currentColor"/>
          </svg>
          Reports
        </button>
      </div>
    </div>
    <div id="confirmation-modal-container"></div>
    <div id="zero-balance-modal-container"></div>

    <!-- Statyczny formularz w HTML, początkowo ukryty -->
    <div id="balance-form" style="display: none;">
      <div class="balance-form">
        <div class="form-group">
          <label for="new-balance">New balance:</label>
          <input type="number" id="new-balance" step="0.01" required>
        </div>
        <div class="btn-group">
          <button id="confirm-balance" class="btn btn-primary">Confirm</button>
          <button id="cancel-balance" class="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  `;
}

// Funkcja asynchroniczna do pobierania aktualnego salda z API
export async function fetchBalance() {
  log('function fetchBalance - Rozpoczęto pobieranie salda');
  const balanceAmount = document.getElementById('balance-amount');
  try {
    // Wysłanie żądania do API w celu pobrania salda użytkownika
    const response = await fetch(`${API_URL}/users/balance`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });
    // Parsowanie odpowiedzi jako JSON
    const data = await response.json();
    log('function fetchBalance - Pobieranie danych salda zakończone:', data);
    if (balanceAmount) {
      // Aktualizacja tekstu elementu wyświetlającego saldo
      balanceAmount.textContent = `${data.balance.toFixed(2)} EUR`;
    }
    // Zwrócenie wartości salda
    return data.balance;
  } catch (error) {
    // Obsługa błędów podczas pobierania salda
    console.error(
      'function fetchBalance - Błąd podczas pobierania salda:',
      error
    );
    if (balanceAmount) {
      balanceAmount.textContent = 'Błąd podczas ładowania salda';
    }
    return null;
  }
}

// Funkcja asynchroniczna do inicjalizacji komponentu Balance
export async function setupBalance() {
  log('function setupBalance - Inicjalizacja salda');
  // Pobranie referencji do elementów DOM
  const balanceAmount = document.getElementById('balance-amount');
  const updateBalanceBtn = document.getElementById('update-balance-btn');
  const showReportsBtn = document.getElementById('show-reports-btn');
  const balanceFormContainer = document.querySelector('#balance-form');
  const confirmBalanceBtn =
    balanceFormContainer.querySelector('#confirm-balance');
  const cancelBalanceBtn =
    balanceFormContainer.querySelector('#cancel-balance');
  const newBalanceInput = balanceFormContainer.querySelector('#new-balance');

  // Sprawdzenie, czy wszystkie niezbędne elementy DOM istnieją
  if (!balanceAmount || !updateBalanceBtn || !showReportsBtn) {
    console.error(
      'function setupBalance - Nie znaleziono niezbędnych elementów DOM'
    );
    return;
  }

  // Formularz jest ukryty na początku
  balanceFormContainer.style.display = 'none';

  // Funkcja asynchroniczna do aktualizacji salda
  async function updateBalance(newBalance) {
    log('function updateBalance - Aktualizacja salda:', newBalance);
    try {
      // Wysłanie żądania PUT do API w celu zaktualizowania salda użytkownika
      const response = await fetch(`${API_URL}/users/balance`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify({ balance: parseFloat(newBalance) }),
      });
      // Parsowanie odpowiedzi jako JSON
      const data = await response.json();
      log('function updateBalance - Saldo zaktualizowane:', data);
      // Aktualizacja wyświetlanego salda
      balanceAmount.textContent = `${data.balance.toFixed(2)} EUR`;

      // Jeśli saldo wynosi zero, wyświetl modal informacyjny
      if (data.balance === 0) {
        log(
          'function updateBalance - Wyświetlanie modalu, ponieważ saldo wynosi 0'
        );
        showZeroBalanceModal();
      }
    } catch (error) {
      // Obsługa błędów podczas aktualizacji salda
      console.error(
        'function updateBalance - Błąd podczas aktualizacji salda:',
        error
      );
      showModal({
        message:
          'function updateBalance - Wystąpił błąd podczas aktualizacji salda',
        confirmLabel: 'OK',
        confirmAction: () => {},
      });
    }
  }

  // Obsługa kliknięcia przycisku "Update" - wyświetlenie formularza
  updateBalanceBtn.addEventListener('click', () => {
    log('updateBalanceBtn - Kliknięto przycisk aktualizacji salda');
    balanceFormContainer.style.display = 'block'; // Wyświetl formularz
  });

  // Obsługa potwierdzenia zmiany salda
  confirmBalanceBtn.addEventListener('click', async () => {
    const newBalance = newBalanceInput.value;
    if (newBalance) {
      log('confirmBalanceBtn - Nowe saldo potwierdzone:', newBalance);
      showConfirmationModal(
        'Czy na pewno chcesz zaktualizować saldo?',
        async () => {
          await updateBalance(newBalance);
          balanceFormContainer.style.display = 'none'; // Ukryj formularz
        }
      );
    }
  });

  // Obsługa anulowania zmiany salda
  cancelBalanceBtn.addEventListener('click', () => {
    log('cancelBalanceBtn - Aktualizacja salda została anulowana');
    balanceFormContainer.style.display = 'none'; // Ukryj formularz
  });

  // Obsługa kliknięcia przycisku "Reports" - nawigacja do raportów bez przeładowania strony
  showReportsBtn.addEventListener('click', event => {
    event.preventDefault(); // Zapobiegaj domyślnemu odświeżeniu strony
    log('showReportsBtn - Przejście do sekcji raportów');

    // Obsługa dynamicznego przechodzenia do raportów bez przeładowania strony
    // Możesz dodać logikę nawigacji do raportów, np. zmiana widoku
    navigateToReports(); // Placeholder dla funkcji przejścia do raportów
  });

  // Pobranie początkowego salda po załadowaniu komponentu
  await fetchBalance();

  // Zwracanie funkcji umożliwiających aktualizację i odświeżenie salda
  return {
    updateBalance,
    refreshBalance: fetchBalance,
  };
}

// Zmienna globalna, aby upewnić się, że modal zerowego salda jest wyświetlany tylko raz
let zeroBalanceModalShown = false;

// Funkcja do wyświetlania modalu informacyjnego, gdy saldo wynosi zero
export function showZeroBalanceModal() {
  if (zeroBalanceModalShown) {
    return;
  }

  log('function showZeroBalanceModal - Wyświetlanie modalu dla zerowego salda');
  showModal({
    message:
      'Witaj! Aby rozpocząć, wprowadź aktualne saldo swojego konta! Nie możesz wydawać pieniędzy, dopóki ich nie masz :)',
    confirmLabel: 'OK',
    confirmAction: () => {
      zeroBalanceModalShown = false;
      closeModal();
    },
  });

  zeroBalanceModalShown = true;
}

// Funkcja asynchroniczna sprawdzająca saldo i wyświetlająca modal, jeśli saldo wynosi zero
export async function checkAndShowZeroBalanceModal() {
  const balance = await fetchBalance();
  if (balance === 0) {
    showZeroBalanceModal();
  }
}

// Placeholder dla funkcji nawigacji do raportów
function navigateToReports() {
  log('navigateToReports - Nawigacja do sekcji raportów');
  // Tutaj możesz dodać kod do zmiany widoku na raporty bez przeładowania strony
  // np. wyświetlenie sekcji raportów lub zmiana ścieżki w routerze aplikacji.
}
