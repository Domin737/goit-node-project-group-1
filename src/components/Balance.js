// src/components/Balance.js
import { API_URL } from '../config';
import { showModal, closeModal } from './Modal';

function showConfirmationModal(message, confirmAction) {
  console.log('Pokazanie modala potwierdzającego z wiadomością:', message);
  showModal({
    message,
    confirmLabel: 'YES',
    cancelLabel: 'NO',
    confirmAction: () => {
      console.log('Potwierdzono akcję');
      confirmAction();
    },
    cancelAction: () => {
      console.log('Anulowano akcję');
    },
  });
}

export function Balance() {
  console.log('Renderowanie komponentu Balance');
  return `
    <div class="balance-container">
      <h2>BALANCE</h2>
      <p id="balance-amount" class="balance-amount">Loading...</p>
      <div class="balance-actions">
        <button id="update-balance-btn" class="btn btn-primary">Update balance sheet</button>
        <button id="show-reports-btn" class="btn btn-secondary">Go to reports</button>
      </div>
    </div>
    <div id="confirmation-modal-container"></div>
    <div id="zero-balance-modal-container"></div>
  `;
}

export async function fetchBalance() {
  console.log('Rozpoczęto pobieranie balansu');
  const balanceAmount = document.getElementById('balance-amount');
  try {
    const response = await fetch(`${API_URL}/users/balance`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });
    const data = await response.json();
    console.log('Pobrano dane balansu:', data);
    if (balanceAmount) {
      balanceAmount.textContent = `${data.balance.toFixed(2)} EUR`;
    }
    return data.balance;
  } catch (error) {
    console.error('Błąd podczas pobierania balansu:', error);
    if (balanceAmount) {
      balanceAmount.textContent = 'Error while loading balance';
    }
    return null;
  }
}

export async function setupBalance() {
  console.log('Inicjalizacja Balance');
  const balanceAmount = document.getElementById('balance-amount');
  const updateBalanceBtn = document.getElementById('update-balance-btn');
  const showReportsBtn = document.getElementById('show-reports-btn');

  if (!balanceAmount || !updateBalanceBtn || !showReportsBtn) {
    console.error('Elementy DOM potrzebne do działania nie istnieją.');
    return;
  }

  async function updateBalance(newBalance) {
    console.log('Aktualizacja balansu:', newBalance);
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
      console.log('Zaktualizowano balans:', data);
      balanceAmount.textContent = `${data.balance.toFixed(2)} EUR`;

      if (data.balance === 0) {
        console.log('Pokazanie modala, ponieważ balans wynosi 0');
        showZeroBalanceModal();
      }
    } catch (error) {
      console.error('Błąd podczas aktualizacji balansu:', error);
      showModal({
        message: 'An error occurred while updating the balance sheet',
        confirmLabel: 'OK',
        confirmAction: () => {},
      });
    }
  }

  updateBalanceBtn.addEventListener('click', () => {
    console.log('Kliknięto przycisk aktualizacji bilansu');
    const balanceForm = `
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
    `;

    const balanceContainer = document.querySelector('.balance-container');
    balanceContainer.insertAdjacentHTML('beforeend', balanceForm);

    const confirmBalanceBtn = document.getElementById('confirm-balance');
    const cancelBalanceBtn = document.getElementById('cancel-balance');
    const newBalanceInput = document.getElementById('new-balance');

    confirmBalanceBtn.addEventListener('click', async () => {
      const newBalance = newBalanceInput.value;
      if (newBalance) {
        console.log('Potwierdzono nowy balans:', newBalance);
        showConfirmationModal(
          'Are you sure you want to update your balance?',
          async () => {
            await updateBalance(newBalance);
            balanceContainer.removeChild(
              document.querySelector('.balance-form')
            );
          }
        );
      }
    });

    cancelBalanceBtn.addEventListener('click', () => {
      console.log('Anulowano aktualizację balansu');
      balanceContainer.removeChild(document.querySelector('.balance-form'));
    });
  });

  showReportsBtn.addEventListener('click', () => {
    console.log('Przejście do raportów');
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

  console.log('Pokazanie modala dla zerowego balansu');
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
