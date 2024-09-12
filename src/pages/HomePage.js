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
import { showModal } from '../components/Modal';
import { API_URL } from '../config';

export default function HomePage() {
  return `
    <div class="container">
      <header class="header">
        <div class="logo">
          <img src="path_to_logo.svg" alt="Kapu$ta Logo">
        </div>
        ${LogoutButton()}
      </header>
      <main class="main-content">
        <h1 class="visually-hidden">Kapu$ta - Strona główna</h1>
        ${Balance()}
        <div class="transactions-container">
          ${TransactionForm()}
          ${TransactionList()}
        </div>
      </main>
    </div>
  `;
}

export async function setupHomePage() {
  const balanceSetup = await setupBalance();
  const transactionListSetup = await setupTransactionList(async newBalance => {
    await balanceSetup.updateBalance(newBalance);
    if (newBalance === 0) {
      showZeroBalanceModal();
    }
  });

  setupTransactionForm(async (transaction, newBalance) => {
    await balanceSetup.updateBalance(newBalance);
    await transactionListSetup.refreshTransactions();
    if (newBalance === 0) {
      showZeroBalanceModal();
    }
  });

  const currentBalance = await fetchCurrentBalance();
  if (currentBalance === 0) {
    showZeroBalanceModal();
  }

  setupLogoutButton(() => {
    showLogoutModal();
  });
}

function showZeroBalanceModal() {
  showModal({
    message:
      "Hello! To get started, enter the current balance of your account! You can't spend money until you have it :)",
    confirmLabel: 'OK',
    confirmAction: () => {},
  });
}

function showLogoutModal() {
  showModal({
    message: 'Czy na pewno chcesz się wylogować?',
    confirmLabel: 'Tak',
    cancelLabel: 'Nie',
    confirmAction: handleLogout,
    cancelAction: () => {},
  });
}

async function fetchCurrentBalance() {
  try {
    const response = await fetch(`${API_URL}/users/balance`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });
    const data = await response.json();
    return data.balance;
  } catch (error) {
    console.error('Błąd podczas pobierania bilansu:', error);
    return null;
  }
}
