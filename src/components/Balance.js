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
        <button id="update-balance-btn" class="btn btn-primary">Update balance sheet</button>
        <button id="show-reports-btn" class="btn btn-secondary">Go to reports</button>
      </div>
    </div>
    <div id="confirmation-modal-container"></div>
    <div id="zero-balance-modal-container"></div>
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

  if (!balanceAmount || !updateBalanceBtn || !showReportsBtn) {
    console.error(
      'function setupBalance - The DOM elements needed for operation do not exist'
    );
    return;
  }

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

  updateBalanceBtn.addEventListener('click', () => {
    console.log('updateBalanceBtn - Update balance button clicked');
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
        console.log('confirmBalanceBtn - New balance confirmed:', newBalance);
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
      console.log('cancelBalanceBtn - Balance update canceled');
      balanceContainer.removeChild(document.querySelector('.balance-form'));
    });
  });

  showReportsBtn.addEventListener('click', () => {
    console.log('showReportsBtn - Go to reports');
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
