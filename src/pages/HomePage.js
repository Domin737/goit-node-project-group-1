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
  console.log('Renderowanie HomePage');
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
  console.log('Inicjalizacja HomePage');
  const balanceSetup = await setupBalance();
  const transactionListSetup = await setupTransactionList(async newBalance => {
    console.log('Zaktualizowano listę transakcji, nowy balans:', newBalance);
    await balanceSetup.updateBalance(newBalance);
  });

  setupTransactionForm(async (transaction, newBalance) => {
    console.log('Dodano transakcję, nowy balans:', newBalance);
    await balanceSetup.updateBalance(newBalance);
    await transactionListSetup.refreshTransactions();
  });

  const currentBalance = await fetchCurrentBalance();
  if (currentBalance === 0) {
    showZeroBalanceModal();
  }

  setupLogoutButton(() => {
    console.log('Pokazanie modala wylogowania');
    showLogoutModal();
  });
}

function showLogoutModal() {
  console.log('Pokazanie modala wylogowania');
  showModal({
    message: 'Are you sure you want to log out?',
    confirmLabel: 'YES',
    cancelLabel: 'NO',
    confirmAction: handleLogout,
    cancelAction: () => {},
  });
}

async function fetchCurrentBalance() {
  console.log('Pobieranie aktualnego balansu');
  try {
    const response = await fetch(`${API_URL}/users/balance`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });
    const data = await response.json();
    console.log('Pobrano aktualny balans:', data.balance);
    return data.balance;
  } catch (error) {
    console.error('Błąd podczas pobierania balansu:', error);
    return null;
  }
}
