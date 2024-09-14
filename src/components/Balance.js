// src/components/Balance.js
import { API_URL } from '../config';
import { showModal, closeModal } from './Modal';

function showConfirmationModal(message, confirmAction) {
  console.log(
    'function showConfirmationModal - Showing confirmation modal with message:',
    message
  );
  showModal({
    message,
    confirmLabel: 'YES',
    cancelLabel: 'NO',
    confirmAction: () => {
      console.log(
        'function showConfirmationModal [showModal] - Action confirmed'
      );
      confirmAction();
    },
    cancelAction: () => {
      console.log(
        'function showConfirmationModal [showModal] - Action canceled'
      );
    },
  });
}

export function Balance() {
  console.log('function Balance - Rendering the Balance component');
  return `
    <div class="balance-container">
      <h2>BALANCE</h2>
      <p id="balance-amount" class="balance-amount">Loading...</p>
      <div class="balance-actions">
        <button id="update-balance-btn" class="btn btn-primary">Input</button>
        <button id="show-reports-btn" class="btn btn-secondary">Reports</button>
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

export async function fetchBalance() {
  console.log('function fetchBalance - Balance download started');
  const balanceAmount = document.getElementById('balance-amount');
  try {
    const response = await fetch(`${API_URL}/users/balance`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });
    const data = await response.json();
    console.log('function fetchBalance - Balance data downloaded:', data);
    if (balanceAmount) {
      balanceAmount.textContent = `${data.balance.toFixed(2)} EUR`;
    }
    return data.balance;
  } catch (error) {
    console.error(
      'function fetchBalance - Error while downloading balance:',
      error
    );
    if (balanceAmount) {
      balanceAmount.textContent = 'Error while loading balance';
    }
    return null;
  }
}

export async function setupBalance() {
  console.log('function setupBalance - Balance Initialization');
  const balanceAmount = document.getElementById('balance-amount');
  const updateBalanceBtn = document.getElementById('update-balance-btn');
  const showReportsBtn = document.getElementById('show-reports-btn');
  const balanceFormContainer = document.querySelector('#balance-form');
  const confirmBalanceBtn =
    balanceFormContainer.querySelector('#confirm-balance');
  const cancelBalanceBtn =
    balanceFormContainer.querySelector('#cancel-balance');
  const newBalanceInput = balanceFormContainer.querySelector('#new-balance');

  if (!balanceAmount || !updateBalanceBtn || !showReportsBtn) {
    console.error(
      'function setupBalance - The DOM elements needed for operation do not exist'
    );
    return;
  }

  // Formularz jest ukryty na początku
  balanceFormContainer.style.display = 'none';

  async function updateBalance(newBalance) {
    console.log('function updateBalance - Balance update:', newBalance);
    try {
      const response = await fetch(`${API_URL}/users/balance`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify({ balance: parseFloat(newBalance) }),
      });
      const data = await response.json();
      console.log('function updateBalance - Balance updated:', data);
      balanceAmount.textContent = `${data.balance.toFixed(2)} EUR`;

      if (data.balance === 0) {
        console.log(
          'function updateBalance - Showing modal because balance is 0'
        );
        showZeroBalanceModal();
      }
    } catch (error) {
      console.error(
        'function updateBalance - Error while updating balance:',
        error
      );
      showModal({
        message:
          'function updateBalance - An error occurred while updating the balance sheet',
        confirmLabel: 'OK',
        confirmAction: () => {},
      });
    }
  }

  // Wyświetlenie formularza po kliknięciu przycisku
  updateBalanceBtn.addEventListener('click', () => {
    console.log('updateBalanceBtn - Update balance button clicked');
    balanceFormContainer.style.display = 'block'; // wyświetl formularz
  });

  // Obsługa potwierdzenia zmiany salda
  confirmBalanceBtn.addEventListener('click', async () => {
    const newBalance = newBalanceInput.value;
    if (newBalance) {
      console.log('confirmBalanceBtn - New balance confirmed:', newBalance);
      showConfirmationModal(
        'Are you sure you want to update your balance?',
        async () => {
          await updateBalance(newBalance);
          balanceFormContainer.style.display = 'none'; // ukryj formularz
        }
      );
    }
  });

  // Obsługa anulowania
  cancelBalanceBtn.addEventListener('click', () => {
    console.log('cancelBalanceBtn - Balance update canceled');
    balanceFormContainer.style.display = 'none'; // ukryj formularz
  });

  // Obsługa przekierowania do raportów bez odświeżania strony
  showReportsBtn.addEventListener('click', event => {
    event.preventDefault(); // Zapobiegaj domyślnemu odświeżeniu strony
    console.log('showReportsBtn - Go to reports');

    // Obsługa dynamicznego przechodzenia do raportów bez przeładowania strony
    // Możesz dodać logikę nawigacji do raportów, np. zmiana widoku
    navigateToReports(); // Placeholder dla funkcji przejścia do raportów
  });

  await fetchBalance();

  return {
    updateBalance,
    refreshBalance: fetchBalance,
  };
}

let zeroBalanceModalShown = false;

export function showZeroBalanceModal() {
  if (zeroBalanceModalShown) {
    return;
  }

  console.log('function showZeroBalanceModal - Showing modal for zero balance');
  showModal({
    message:
      "Hello! To get started, enter the current balance of your account! You can't spend money until you have it :)",
    confirmLabel: 'OK',
    confirmAction: () => {
      zeroBalanceModalShown = false;
      closeModal();
    },
  });

  zeroBalanceModalShown = true;
}

export async function checkAndShowZeroBalanceModal() {
  const balance = await fetchBalance();
  if (balance === 0) {
    showZeroBalanceModal();
  }
}

// Placeholder function for navigating to reports
function navigateToReports() {
  console.log('navigateToReports - Navigating to reports section');
  // Tutaj możesz dodać kod do zmiany widoku na raporty bez przeładowania strony
  // np. wyświetlenie sekcji raportów lub zmiana ścieżki w routerze aplikacji.
}
