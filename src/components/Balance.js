// src/components/Balance.js
import { API_URL } from '../config';
import Modal, { setupModal } from './Modal';

function showConfirmationModal(message, confirmAction) {
  const confirmationModalContainer = document.getElementById(
    'confirmation-modal-container'
  );
  confirmationModalContainer.innerHTML = Modal({
    message,
    confirmLabel: 'YES',
    cancelLabel: 'NO',
    confirmAction: () => {
      confirmAction();
      confirmationModalContainer.innerHTML = '';
    },
    cancelAction: () => {
      confirmationModalContainer.innerHTML = '';
    },
  });

  setupModal(
    () => {
      confirmAction();
      confirmationModalContainer.innerHTML = '';
    },
    () => {
      confirmationModalContainer.innerHTML = '';
    }
  );
}

export function Balance() {
  return `
    <div class="balance-container">
      <h2>Twój bilans</h2>
      <p id="balance-amount" class="balance-amount">Ładowanie...</p>
      <div class="balance-actions">
        <button id="update-balance-btn" class="btn btn-primary">Aktualizuj bilans</button>
        <button id="show-reports-btn" class="btn btn-secondary">Przejdź do raportów</button>
      </div>
    </div>
  `;
}

export async function setupBalance() {
  const balanceAmount = document.getElementById('balance-amount');
  const updateBalanceBtn = document.getElementById('update-balance-btn');
  const showReportsBtn = document.getElementById('show-reports-btn');

  async function fetchBalance() {
    try {
      const response = await fetch(`${API_URL}/users/balance`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      const data = await response.json();
      balanceAmount.textContent = `${data.balance.toFixed(2)} UAH`;
    } catch (error) {
      console.error('Błąd podczas pobierania bilansu:', error);
      balanceAmount.textContent = 'Błąd podczas ładowania bilansu';
    }
  }

  async function updateBalance(newBalance) {
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
      balanceAmount.textContent = `${data.balance.toFixed(2)} UAH`;

      if (data.balance === 0) {
        showZeroBalanceModal();
      }
    } catch (error) {
      console.error('Błąd podczas aktualizacji bilansu:', error);
      alert('Wystąpił błąd podczas aktualizacji bilansu');
    }
  }

  updateBalanceBtn.addEventListener('click', () => {
    const balanceForm = `
      <div class="balance-form">
        <div class="form-group">
          <label for="new-balance">Nowy bilans:</label>
          <input type="number" id="new-balance" step="0.01" required>
        </div>
        <div class="btn-group">
          <button id="confirm-balance" class="btn btn-primary">Potwierdź</button>
          <button id="cancel-balance" class="btn btn-secondary">Anuluj</button>
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
        showConfirmationModal(
          'Czy na pewno chcesz zaktualizować bilans?',
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
      balanceContainer.removeChild(document.querySelector('.balance-form'));
    });
  });

  showReportsBtn.addEventListener('click', () => {
    // Tutaj dodaj logikę przejścia do strony raportów
    console.log('Przejście do raportów');
  });

  await fetchBalance();

  return {
    updateBalance,
    refreshBalance: fetchBalance,
  };
}

function showZeroBalanceModal() {
  const zeroBalanceModalContainer = document.getElementById(
    'zero-balance-modal-container'
  );
  zeroBalanceModalContainer.innerHTML = Modal({
    message:
      "Hello! To get started, enter the current balance of your account! You can't spend money until you have it :)",
    confirmLabel: 'OK',
    confirmAction: () => {
      zeroBalanceModalContainer.innerHTML = '';
    },
  });

  setupModal(() => {
    zeroBalanceModalContainer.innerHTML = '';
  });
}
