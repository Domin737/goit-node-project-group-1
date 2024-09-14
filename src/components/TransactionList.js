// src/components/TransactionList.js
import { API_URL } from '../config';
import Modal, { setupModal } from './Modal';

export function TransactionList() {
  console.log('Renderowanie listy transakcji');
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
    console.log('Pobieranie listy transakcji');
    try {
      const response = await fetch(`${API_URL}/transactions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      const transactions = await response.json();
      console.log('Pobrano transakcje:', transactions);
      renderTransactions(transactions);
    } catch (error) {
      console.error('Błąd pobierania transakcji:', error);
      transactionList.innerHTML = '<li>Error loading transactions</li>';
    }
  }

  function renderTransactions(transactions) {
    console.log('Renderowanie transakcji');
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
          }">${transaction.amount.toFixed(2)} EUR</span>
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
        console.log('Próba usunięcia transakcji o ID:', transactionId);
        showConfirmationModal(
          'Are you sure you want to delete the transaction?',
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
              console.log('Transakcja usunięta pomyślnie');
              alert('Transaction deleted successfully');

              if (onTransactionDeleted) {
                onTransactionDeleted(result.newBalance);
              }
            } catch (error) {
              console.error('Błąd podczas usuwania transakcji:', error);
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
  console.log('Pokazanie modala potwierdzającego z wiadomością:', message);
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
