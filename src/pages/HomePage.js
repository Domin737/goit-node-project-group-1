// src/pages/HomePage.js
import LogoutButton, { setupLogoutButton } from '../components/LogoutButton';
import { handleLogout } from '../utils/logoutUtils';
import { Balance, setupBalance } from '../components/Balance';
import {
  TransactionForm,
  setupTransactionForm,
} from '../components/TransactionForm';
import {
  TransactionList,
  setupTransactionList,
} from '../components/TransactionList';

export default function HomePage() {
  return `
    <div id="home-page">
      <h1>Witaj w aplikacji Kapu$ta!</h1>
      ${Balance()}
      ${TransactionForm()}
      ${TransactionList()}
      ${LogoutButton()}
    </div>
    <div id="logout-modal" class="modal" style="display: none;">
      <div class="modal-content">
        <p>Czy na pewno chcesz opuścić aplikację?</p>
        <button id="confirm-logout">Tak</button>
        <button id="cancel-logout">Nie</button>
      </div>
    </div>
  `;
}

export async function setupHomePage() {
  const balanceSetup = await setupBalance();
  const transactionListSetup = await setupTransactionList(async newBalance => {
    await balanceSetup.updateBalance(newBalance);
  });

  setupTransactionForm(async (transaction, newBalance) => {
    await balanceSetup.updateBalance(newBalance);
    await transactionListSetup.refreshTransactions();
  });

  setupLogoutButton(() => {
    const modal = document.getElementById('logout-modal');
    modal.style.display = 'block';
  });

  const confirmLogoutBtn = document.getElementById('confirm-logout');
  const cancelLogoutBtn = document.getElementById('cancel-logout');
  const modal = document.getElementById('logout-modal');

  confirmLogoutBtn.addEventListener('click', () => {
    handleLogout();
    modal.style.display = 'none';
  });

  cancelLogoutBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}
