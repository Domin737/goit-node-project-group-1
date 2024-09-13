// src/components/TransactionForm.js
import { API_URL } from '../config';
import { showModal } from './Modal';
import { checkAndShowZeroBalanceModal } from './Balance';

export function TransactionForm() {
  return `
    <div class="transaction-form-container">
      <h3>Add transaction</h3>
      <form id="transaction-form" class="transaction-form">
        <div class="form-group">
          <select id="transaction-type" required>
            <option value="">Select type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div class="form-group">
          <input type="text" id="transaction-category" placeholder="Category" required>
        </div>
        <div class="form-group">
          <input type="number" id="transaction-amount" placeholder="Sum" step="0.01" required>
        </div>
        <div class="form-group">
          <input type="text" id="transaction-description" placeholder="Description" required>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Add</button>
          <button type="reset" class="btn btn-secondary">Clear</button>
        </div>
      </form>
    </div>
  `;
}

export function setupTransactionForm(onTransactionAdded) {
  const form = document.getElementById('transaction-form');

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const type = document.getElementById('transaction-type').value;
    const category = document.getElementById('transaction-category').value;
    const amount = parseFloat(
      document.getElementById('transaction-amount').value
    );
    const description = document.getElementById(
      'transaction-description'
    ).value;

    try {
      const response = await fetch(`${API_URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify({ type, category, amount, description }),
      });

      if (!response.ok) {
        throw new Error('Error while adding transaction');
      }

      const result = await response.json();
      showModal({
        message: 'Transaction added successfully',
        confirmLabel: 'OK',
        confirmAction: () => {},
      });
      form.reset();

      if (onTransactionAdded) {
        onTransactionAdded(result.transaction, result.newBalance);
      }

      // Sprawdź, czy nowy balans wynosi 0 i pokaż odpowiedni modal
      await checkAndShowZeroBalanceModal();
    } catch (error) {
      console.error('Error while adding transaction:', error);
      showModal({
        message: 'An error occurred while adding the transaction.',
        confirmLabel: 'OK',
        confirmAction: () => {},
      });
    }
  });
}
