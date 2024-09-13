// src/components/Balance.js
import { API_URL } from '../config';
import Modal, { setupModal } from './Modal';

function showConfirmationModal(message, confirmAction) {
  const confirmationModalContainer = document.getElementById(
    'confirmation-modal-container'
  );

  if (!confirmationModalContainer) {
    console.error('Element confirmation-modal-container nie istnieje.');
    return;
  }

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

export async function setupBalance() {
  const balanceAmount = document.getElementById('balance-amount');
  const updateBalanceBtn = document.getElementById('update-balance-btn');
  const showReportsBtn = document.getElementById('show-reports-btn');

  if (!balanceAmount || !updateBalanceBtn || !showReportsBtn) {
    console.error('Elementy DOM potrzebne do działania nie istnieją.');
    return;
  }

  async function fetchBalance() {
    try {
      const response = await fetch(`${API_URL}/users/balance`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      const data = await response.json();
      balanceAmount.textContent = `${data.balance.toFixed(2)} EUR`;
    } catch (error) {
      console.error('Error while retrieving balance:', error);
      balanceAmount.textContent = 'Error while loading balance';
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
      balanceAmount.textContent = `${data.balance.toFixed(2)} EUR`;

      if (data.balance === 0) {
        showZeroBalanceModal();
      }
    } catch (error) {
      console.error('Error updating balance:', error);
      alert('An error occurred while updating the balance sheet');
    }
  }

  updateBalanceBtn.addEventListener('click', () => {
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
      balanceContainer.removeChild(document.querySelector('.balance-form'));
    });
  });

  showReportsBtn.addEventListener('click', () => {
    console.log('Go to reports');
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

  if (!zeroBalanceModalContainer) {
    console.error('Element zero-balance-modal-container nie istnieje.');
    return;
  }

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
