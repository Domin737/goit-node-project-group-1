// src/components/TransactionForm.js
import log from '../utils/logger';
import { API_URL } from '../config';
import { showModal, closeModal } from './Modal';
import { checkAndShowZeroBalanceModal } from './Balance';

const TRANSACTIONS = {
  expense: {
    type: 'expense',
    categories: [
      'Transport',
      'Products',
      'Health',
      'Alcohol',
      'Entertainment',
      'Housing',
      'Technique',
      'Communication',
      'Hobbies',
      'Education',
      'Other',
    ],
  },
  income: {
    type: 'income',
    categories: ['Salary', 'Additional income'],
  },
};

let viewType = null;

export function TransactionForm(defaultType = '') {
  log('function TransactionForm - Rendering transaction form');
  return `
    <div class="transaction-form-container">
      <h3>Add transaction</h3>
      <form id="transaction-form" class="transaction-form">
        <div class="form-group">
          <input type="date" id="transaction-date" required>
        </div>
        <div class="form-group">
          <input type="text" id="transaction-description" placeholder="Description" required>
        </div>
        <div class="form-group">
          <select id="transaction-category" required>
          </select>
        </div>
        <div class="form-group">
          <input type="number" id="transaction-amount" placeholder="Amount" step="0.01" required>
        </div>

        <div class="form-group">
          <button type="submit" class="btn btn-primary">Input</button>
          <button type="reset" class="btn btn-secondary">Clear</button>
        </div>
      </form>
    </div>
  `;
}

export const changeTypeTransactionForm = type => {
  const transaction = TRANSACTIONS[type];

  const setCategorySelect = categories => {
    const select = document.querySelector('#transaction-category');

    select.innerHTML =
      `<option disabled selected>Product category</option>` +
      categories
        .map(category => {
          const value = category.includes(' ')
            ? category.split(' ').join('_').toLowerCase()
            : category.toLowerCase();

          return `<option value="${value}">${category}</option>`; //<option value="additional_income">Additional income</option>
        })
        .join('');
  };

  viewType = transaction.type;
  setCategorySelect(transaction.categories);
};

export function setupTransactionForm(onTransactionAdded) {
  log('function setupTransactionForm - Initializing transaction form');
  const form = document.getElementById('transaction-form');

  const dateInput = form.querySelector('#transaction-date');
  dateInput.value = new Date().toISOString().slice(0, 10);

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const date = document.getElementById('transaction-date').value;
    const category = document.getElementById('transaction-category').value;
    const amount = parseFloat(
      document.getElementById('transaction-amount').value
    );
    const description = document.getElementById(
      'transaction-description'
    ).value;

    log('function setupTransactionForm - Adding new transaction:', {
      type: viewType,
      date,
      category,
      amount,
      description,
    });

    try {
      const response = await fetch(`${API_URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify({
          type: viewType,
          date,
          category,
          amount,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error('Error while adding transaction');
      }

      const result = await response.json();
      log(
        'function setupTransactionForm - Transaction added successfully:',
        result
      );
      showModal({
        message: 'Transaction added successfully',
        confirmLabel: 'OK',
        confirmAction: async () => {
          closeModal();
          form.reset();

          if (onTransactionAdded) {
            await onTransactionAdded(result.transaction, result.newBalance);
          }

          // Check if new balance is 0 and show appropriate modal
          await checkAndShowZeroBalanceModal();
        },
      });
    } catch (error) {
      console.error(
        'function setupTransactionForm - Error while adding transaction:',
        error
      );
      showModal({
        message: 'An error occurred while adding the transaction.',
        confirmLabel: 'OK',
        confirmAction: () => {},
      });
    }
  });
}
