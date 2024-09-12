// src/components/TransactionForm.js
import { API_URL } from '../config';

export function TransactionForm() {
  return `
    <div id="transaction-form-container">
      <h2>Dodaj transakcję</h2>
      <form id="transaction-form">
        <select id="transaction-type" required>
          <option value="">Wybierz typ</option>
          <option value="income">Przychód</option>
          <option value="expense">Wydatek</option>
        </select>
        <input type="text" id="transaction-category" placeholder="Kategoria" required>
        <input type="number" id="transaction-amount" placeholder="Kwota" step="0.01" required>
        <input type="text" id="transaction-description" placeholder="Opis" required>
        <button type="submit">Dodaj</button>
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
        throw new Error('Błąd podczas dodawania transakcji');
      }

      const result = await response.json();
      alert('Transakcja dodana pomyślnie');
      form.reset();

      if (onTransactionAdded) {
        onTransactionAdded(result.transaction, result.newBalance);
      }
    } catch (error) {
      console.error('Błąd podczas dodawania transakcji:', error);
      alert('Wystąpił błąd podczas dodawania transakcji');
    }
  });
}
