// src/components/TransactionForm.js
import { API_URL } from '../config';

export function TransactionForm() {
  return `
    <div id="transaction-form-container">
      <h2>Add transaction</h2>
      <form id="transaction-form">
        <select id="transaction-type" required>
          <option value="">Select type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input type="text" id="transaction-category" placeholder="Category" required>
        <input type="number" id="transaction-amount" placeholder="Sum" step="0.01" required>
        <input type="text" id="transaction-description" placeholder="Description" required>
        <button type="submit">Add</button>
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
      alert('Transaction added successfully');
      form.reset();

      if (onTransactionAdded) {
        onTransactionAdded(result.transaction, result.newBalance);
      }
    } catch (error) {
      console.error('Error while adding transaction:', error);
      alert('An error occurred while adding the transaction.');
    }
  });
}
