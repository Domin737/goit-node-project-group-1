// src/components/TransactionList.js
import { API_URL } from '../config';
import Modal, { setupModal } from './Modal';

export function TransactionList() {
  return `
    <div class="transaction-container">
      <h3>Lista transakcji</h3>
      <ul id="transaction-list" class="transaction-list"></ul>
    </div>
  `;
}

export async function setupTransactionList(onTransactionDeleted) {
  const transactionList = document.getElementById('transaction-list');

  async function fetchTransactions() {
    try {
      const response = await fetch(`${API_URL}/transactions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      const transactions = await response.json();
      renderTransactions(transactions);
    } catch (error) {
      console.error('Błąd podczas pobierania transakcji:', error);
      transactionList.innerHTML = '<li>Błąd podczas ładowania transakcji</li>';
    }
  }

  function renderTransactions(transactions) {
    transactionList.innerHTML = transactions
      .map(
        transaction => `
        <li data-id="${transaction._id}">
          <div class="transaction-info">
            <span class="transaction-icon">${
              transaction.type === 'income' ? '📈' : '📉'
            }</span>
            <div class="transaction-details">
              <span class="category">${transaction.category}</span>
              <span class="description">${transaction.description}</span>
            </div>
          </div>
          <span class="transaction-amount ${
            transaction.type
          }">${transaction.amount.toFixed(2)} UAH</span>
          <button class="delete-transaction btn-icon">🗑️</button>
        </li>
      `
      )
      .join('');

    setupDeleteButtons();
  }

  function setupDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.delete-transaction');
    deleteButtons.forEach(button => {
      button.addEventListener('click', async e => {
        const transactionId = e.target.closest('li').dataset.id;
        showConfirmationModal(
          'Czy na pewno chcesz usunąć transakcję?',
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
                throw new Error('Błąd podczas usuwania transakcji');
              }

              const result = await response.json();
              e.target.closest('li').remove();
              alert('Transakcja usunięta pomyślnie');

              if (onTransactionDeleted) {
                onTransactionDeleted(result.newBalance);
              }
            } catch (error) {
              console.error('Błąd podczas usuwania transakcji:', error);
              alert('Wystąpił błąd podczas usuwania transakcji');
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
  confirmationModalContainer.innerHTML = Modal({
    message,
    confirmLabel: 'TAK',
    cancelLabel: 'NIE',
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
