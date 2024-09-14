// src/components/TransactionForm.js
import { API_URL } from '../config';
import { showModal, closeModal } from './Modal';
import { checkAndShowZeroBalanceModal } from './Balance';

export function TransactionForm() {
  console.log('function TransactionForm - Rendering transaction form');
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
          <input type="date" id="transaction-date" required>
        </div>
        <div class="form-group">
          <select id="transaction-category" required>
            <option value="">Select category</option>
            <optgroup label="Expenses">
              <option value="transport">Transport</option>
              <option value="products">Products</option>
              <option value="health">Health</option>
              <option value="alcohol">Alcohol</option>
              <option value="entertainment">Entertainment</option>
              <option value="housing">Housing</option>
              <option value="technique">Technique</option>
              <option value="communication">Communication</option>
              <option value="sports">Sports, hobbies</option>
              <option value="education">Education</option>
              <option value="other">Other</option>
            </optgroup>
            <optgroup label="Income">
              <option value="salary">Salary</option>
              <option value="additional_income">Additional income</option>
            </optgroup>
          </select>
        </div>
        <div class="form-group">
          <input type="number" id="transaction-amount" placeholder="Amount" step="0.01" required>
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

// Funkcja do zmiany formatu daty na dd.mm.rrrr
function formatDateToDDMMYYYY(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Miesiące są indeksowane od 0
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export function setupTransactionForm(onTransactionAdded) {
  console.log('function setupTransactionForm - Initializing transaction form');
  const form = document.getElementById('transaction-form');

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const type = document.getElementById('transaction-type').value;
    let date = document.getElementById('transaction-date').value;
    const category = document.getElementById('transaction-category').value;
    const amount = parseFloat(
      document.getElementById('transaction-amount').value
    );
    const description = document.getElementById(
      'transaction-description'
    ).value;

    // Przekształcenie daty na format dd.mm.rrrr
    date = formatDateToDDMMYYYY(date);

    console.log('function setupTransactionForm - Adding new transaction:', {
      type,
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
        body: JSON.stringify({ type, date, category, amount, description }),
      });

      if (!response.ok) {
        throw new Error('Error while adding transaction');
      }

      const result = await response.json();
      console.log(
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
