// src/pages/HomePage.js
import LogoutButton, { setupLogoutButton } from '../components/LogoutButton';
import { handleLogout } from '../utils/logoutUtils';
import {
  Balance,
  setupBalance,
  showZeroBalanceModal,
} from '../components/Balance';
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
import logo from '../images/logo-small.svg';

export default function HomePage() {
  console.log('function HomePage - HomePage Rendering');
  return `
      <div class="container">
      <header class="header">
        <div class="logo">
          <img src="${logo}" alt="Kapu$ta Logo">
        </div>
        ${LogoutButton()}
      </header>
      <main class="main-content">
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
  console.log('function setupHomePage - HomePage Initialization');
  const balanceSetup = await setupBalance();
  const transactionListSetup = await setupTransactionList(async newBalance => {
    console.log(
      'function setupHomePage - Updated transaction list, new balance:',
      newBalance
    );
    await balanceSetup.updateBalance(newBalance);
  });

  setupTransactionForm(async (transaction, newBalance) => {
    console.log(
      'function setupHomePage - Added transaction, new balance:',
      newBalance
    );
    await balanceSetup.updateBalance(newBalance);
    await transactionListSetup.refreshTransactions();
  });

  const currentBalance = await fetchCurrentBalance();
  if (currentBalance === 0) {
    showZeroBalanceModal();
  }

  setupLogoutButton(() => {
    console.log('function setupHomePage - Show logout modal');
    showLogoutModal();
  });
}

function showLogoutModal() {
  console.log('function setupHomePage - Show logout modal');
  showModal({
    message: 'Are you sure you want to log out?',
    confirmLabel: 'YES',
    cancelLabel: 'NO',
    confirmAction: handleLogout,
    cancelAction: () => {},
  });
}

async function fetchCurrentBalance() {
  console.log('function fetchCurrentBalance - Downloading current balance');
  try {
    const response = await fetch(`${API_URL}/users/balance`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });
    const data = await response.json();
    console.log(
      'function fetchCurrentBalance - Current balance downloaded:',
      data.balance
    );
    return data.balance;
  } catch (error) {
    console.error(
      'function fetchCurrentBalance - Error while downloading balance:',
      error
    );
    return null;
  }
}
