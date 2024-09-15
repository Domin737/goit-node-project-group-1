// src/components/TransactionList.js
import log from '../utils/logger';
import { API_URL } from '../config';
import Modal, { setupModal } from './Modal';

export function TransactionList({ type }) {
  log(`TransactionList - Rendering transaction list for ${type}`);
  return `
    <div class="transaction-container">
      <h3>List of ${type === 'income' ? 'Income' : 'Expenses'}</h3>
      <ul id="transaction-list-${type}" class="transaction-list"></ul>
    </div>
  `;
}

export async function setupTransactionList(onTransactionDeleted, type) {
  const transactionList = document.getElementById(`transaction-list-${type}`);

  async function fetchTransactions() {
    log(`TransactionList - Fetching ${type} transactions`);
    try {
      const response = await fetch(`${API_URL}/transactions?type=${type}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      const transactions = await response.json();
      log(`TransactionList - Fetched ${type} transactions:`, transactions);
      renderTransactions(transactions);
    } catch (error) {
      console.error(
        `TransactionList - Error fetching ${type} transactions:`,
        error
      );
      transactionList.innerHTML = '<li>Error loading transactions</li>';
    }
  }

  function renderTransactions(transactions) {
    log(`TransactionList - Rendering ${type} transactions`);
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  function setupDeleteButtons() {
    const deleteButtons = document.querySelectorAll(
      `#transaction-list-${type} .delete-transaction`
    );
    deleteButtons.forEach(button => {
      button.addEventListener('click', async e => {
        const transactionId = e.target.closest('li').dataset.id;
        log(
          `TransactionList - Attempting to delete ${type} transaction with ID:`,
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
              log(`TransactionList - ${type} transaction deleted successfully`);
              alert(
                `${
                  type.charAt(0).toUpperCase() + type.slice(1)
                } transaction deleted successfully`
              );

              if (onTransactionDeleted) {
                onTransactionDeleted(result.newBalance);
              }
            } catch (error) {
              console.error(
                `TransactionList - Error while deleting ${type} transaction:`,
                error
              );
              alert(`An error occurred while deleting the ${type} transaction`);
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
  log('TransactionList - Showing confirmation modal with message:', message);
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
