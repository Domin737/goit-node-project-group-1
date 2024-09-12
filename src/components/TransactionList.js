// src/components/TransactionList.js
import { API_URL } from '../config';
import Modal, { setupModal } from './Modal';

export function TransactionList() {
  return `
    <div id="transaction-list-container">
      <h2>Lista transakcji</h2>
      <ul id="transaction-list"></ul>
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
          ${transaction.type === 'income' ? '📈' : '📉'}
          ${transaction.category} - ${transaction.amount.toFixed(2)} EUR
          (${transaction.description})
          <button class="delete-transaction">Usuń</button>
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

// Funkcja pokazująca modal potwierdzający usunięcie transakcji
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
      confirmationModalContainer.innerHTML = ''; // Ukryj modal po potwierdzeniu
    },
    cancelAction: () => {
      confirmationModalContainer.innerHTML = ''; // Ukryj modal po anulowaniu
    },
  });

  setupModal(
    () => {
      confirmAction();
      confirmationModalContainer.innerHTML = ''; // Ukryj modal po potwierdzeniu
    },
    () => {
      confirmationModalContainer.innerHTML = ''; // Ukryj modal po anulowaniu
    }
  );
}
