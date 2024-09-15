// src/pages/HomePage.js
import log from '../utils/logger';
import LogoutButton, { setupLogoutButton } from '../components/LogoutButton';
import { handleLogout } from '../utils/logoutUtils';
import {
  Balance,
  setupBalance,
  showZeroBalanceModal,
} from '../components/Balance';
import {
  TransactionForm,
  changeTypeTransactionForm,
  setupTransactionForm,
} from '../components/TransactionForm';
import {
  TransactionList,
  setupTransactionList,
} from '../components/TransactionList';
import { showModal } from '../components/Modal';
import { API_URL } from '../config';
import logo from '../images/logo-small.svg';
import { SummaryList, setupSummaryList } from '../components/SummaryList';
import { set } from 'mongoose';

export default function HomePage() {
  log('HomePage - Rendering HomePage');
  return `
    <div class="container">
      <header class="header">
        <div class="logo">
          <img src="${logo}" alt="Kapu$ta Logo">
        </div>
        <div class="user-info">
          <img id="user-avatar" class="user-avatar" alt="User Avatar" />
          <span id="user-name"></span>
        </div>
        ${LogoutButton()}
      </header>
      <main class="main-content">
        ${Balance()}
        <div class="tabs">
          <button class="btn btn-outline tab-button active" data-tab="expense">EXPENSES</button>
          <button class="btn btn-outline tab-button" data-tab="income">INCOME</button>
        </div>
        ${TransactionForm()}
        <div class="transaction-view">
          <div id="transaction-list-container"></div>
          <div id="summary-list-container"></div>
        </div>
      </main>
    </div>
  `;
}

const setupTabs = () => {
  log('HomePage - Setting up tabs');
  const tabButtons = document.querySelectorAll('.tab-button');
  const transactionListContainer = document.getElementById(
    'transaction-list-container'
  );

  const summaryListContainer = document.querySelector(
    '#summary-list-container'
  );

  const updateTransactionList = async type => {
    // nie asynchroniczna funkcja
    log(`HomePage - Updating transaction list for ${type}`);
    transactionListContainer.innerHTML = TransactionList({ type });
    summaryListContainer.innerHTML = SummaryList();
    await setupTransactionList(async newBalance => {
      //nie await
      log(`HomePage - Updated ${type} list, new balance:`, newBalance);
      await balanceSetup.updateBalance(newBalance);
    }, type);

    setupSummaryList(type);

    changeTypeTransactionForm(type);
  };

  tabButtons.forEach(button => {
    button.addEventListener('click', async () => {
      // nie asynchroniczna funkcja
      const tabType = button.getAttribute('data-tab');
      log(`HomePage - Tab ${tabType} clicked`);

      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      await updateTransactionList(tabType); // nie await
    });
  });

  return updateTransactionList;
};

let balanceSetup;

export async function setupHomePage() {
  log('HomePage - Initializing HomePage');
  balanceSetup = await setupBalance();

  const updateTransactionList = setupTabs();

  setupTransactionForm(async (transaction, newBalance) => {
    log('HomePage - Added transaction, new balance:', newBalance);
    await balanceSetup.updateBalance(newBalance);
    const activeTab = document
      .querySelector('.tab-button.active')
      .getAttribute('data-tab');
    await updateTransactionList(activeTab);
  });

  const currentBalance = await fetchCurrentBalance();
  if (currentBalance === 0) {
    showZeroBalanceModal();
  }

  setupLogoutButton(() => {
    log('HomePage - Show logout modal');
    showLogoutModal();
  });

  // Inicjalizacja początkowej listy transakcji (domyślnie expenses)
  await updateTransactionList('expense', updateTransactionList);

  // Pobranie informacji o użytkowniku (Gravatar + name)
  await loadUserInfo();
}

async function loadUserInfo() {
  try {
    const response = await fetch(`${API_URL}/users/current`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });
    const userData = await response.json();

    // Wstawienie avatara i nazwy użytkownika
    document.getElementById('user-avatar').src = userData.avatarURL;
    document.getElementById('user-name').textContent = userData.name;
  } catch (error) {
    console.error('HomePage - Error loading user info:', error);
  }
}

function showLogoutModal() {
  log('HomePage - Show logout modal');
  showModal({
    message: 'Are you sure you want to log out?',
    confirmLabel: 'YES',
    cancelLabel: 'NO',
    confirmAction: handleLogout,
    cancelAction: () => {},
  });
}

async function fetchCurrentBalance() {
  log('HomePage - Fetching current balance');
  try {
    const response = await fetch(`${API_URL}/users/balance`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });
    const data = await response.json();
    log('HomePage - Current balance fetched:', data.balance);
    return data.balance;
  } catch (error) {
    console.error('HomePage - Error fetching balance:', error);
    return null;
  }
}
