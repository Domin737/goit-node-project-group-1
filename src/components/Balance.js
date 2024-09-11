// src/components/Balance.js
import { API_URL } from '../config';

export function Balance() {
  return `
    <div id="balance-container">
      <h2>Bilans</h2>
      <p id="balance-amount">Ładowanie...</p>
      <button id="update-balance-btn">Aktualizuj bilans</button>
    </div>
  `;
}

export async function setupBalance() {
  const balanceAmount = document.getElementById('balance-amount');
  const updateBalanceBtn = document.getElementById('update-balance-btn');

  async function fetchBalance() {
    try {
      const response = await fetch(`${API_URL}/users/balance`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      const data = await response.json();
      balanceAmount.textContent = `${data.balance.toFixed(2)} UAH`;
    } catch (error) {
      console.error('Błąd podczas pobierania bilansu:', error);
      balanceAmount.textContent = 'Błąd podczas ładowania bilansu';
    }
  }

  async function updateBalance(newBalance) {
    try {
      const response = await fetch(`${API_URL}/users/balance`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify({ balance: parseFloat(newBalance) }),
      });
      const data = await response.json();
      balanceAmount.textContent = `${data.balance.toFixed(2)} UAH`;
    } catch (error) {
      console.error('Błąd podczas aktualizacji bilansu:', error);
      alert('Wystąpił błąd podczas aktualizacji bilansu');
    }
  }

  updateBalanceBtn.addEventListener('click', async () => {
    const newBalance = prompt('Podaj nowy bilans:');
    if (newBalance === null) return;
    await updateBalance(newBalance);
  });

  await fetchBalance();

  return {
    updateBalance,
    refreshBalance: fetchBalance,
  };
}
