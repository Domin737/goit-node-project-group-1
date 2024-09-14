// src/components/TransactionList.js
import { API_URL } from '../config';
import Modal, { setupModal } from './Modal';

export function TransactionList() {
  console.log('Rendering transaction list');
  return `
    <div class="transaction-container">
      <h3>List of transactions</h3>
      <ul id="transaction-list" class="transaction-list"></ul>
    </div>
  `;
}

export async function setupTransactionList(onTransactionDeleted) {
  const transactionList = document.getElementById('transaction-list');

  async function fetchTransactions() {
    console.log('function fetchTransactions - Fetching transaction list');
    try {
      const response = await fetch(`${API_URL}/transactions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      const transactions = await response.json();
      console.log(
        'function fetchTransactions - Fetched transactions:',
        transactions
      );
      renderTransactions(transactions);
    } catch (error) {
      console.error(
        'function fetchTransactions - Error fetching transactions:',
        error
      );
      transactionList.innerHTML = '<li>Error loading transactions</li>';
    }
  }

  function renderTransactions(transactions) {
    console.log('function renderTransactions - Rendering transactions');
    transactionList.innerHTML = transactions
      .map(
        transaction => `
        <li data-id="${transaction._id}">
          <div class="transaction-info">
            <span class="transaction-icon">${
              transaction.type === 'income' ? '📈' : '📉'
            }</span>
            <div class="transaction-details">
              <span class="date">${formatDate(transaction.date)}</span>
              <span class="category">${transaction.category}</span>
              <span class="description">${transaction.description}</span>
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

    setupDeleteButtons();
  }

  // Funkcja formatująca datę na dd.mm.rrrr
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Miesiące są indeksowane od 0
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  function setupDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.delete-transaction');
    deleteButtons.forEach(button => {
      button.addEventListener('click', async e => {
        const transactionId = e.target.closest('li').dataset.id;
        console.log(
          'function setupDeleteButtons - Attempting to delete transaction with ID:',
          transactionId
        );
        showConfirmationModal(
          'Are you sure you want to delete this transaction?',
          async () => {
            try {
              const response = await fetch(
                `${API_URL}/transactions/${transactionId}`,
                {
                  method: 'DELETE',
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      'userToken'
                    )}`,
                  },
                }
              );

              if (!response.ok) {
                throw new Error('Error while deleting transaction');
              }

              const result = await response.json();
              e.target.closest('li').remove();
              console.log(
                'function setupDeleteButtons - ransaction deleted successfully'
              );
              alert(
                'function setupDeleteButtons - Transaction deleted successfully'
              );

              if (onTransactionDeleted) {
                onTransactionDeleted(result.newBalance);
              }
            } catch (error) {
              console.error(
                'function setupDeleteButtons - Error while deleting transaction:',
                error
              );
              alert('An error occurred while deleting the transaction');
            }
          }
        );
      });
    });
  }

  await fetchTransactions();

  return {
    refreshTransactions: fetchTransactions,
  };
}

function showConfirmationModal(message, confirmAction) {
  const confirmationModalContainer = document.getElementById(
    'confirmation-modal-container'
  );
  console.log(
    'function showConfirmationModal - Showing confirmation modal with message:',
    message
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
