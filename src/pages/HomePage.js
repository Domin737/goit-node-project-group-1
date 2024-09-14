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
  setupTransactionForm,
} from '../components/TransactionForm';
import {
  TransactionList,
  setupTransactionList,
} from '../components/TransactionList';
import { showModal } from '../components/Modal';
import { API_URL } from '../config';
import logo from '../images/logo-small.svg';
import { Income } from '../components/Incomes';

export default function HomePage() {
  log('function HomePage - HomePage Rendering');
  return `
    <div class="container">
      <header class="header">
        <div class="logo">
          <img src="${logo}" alt="Kapu$ta Logo">
        </div>
        ${LogoutButton()}
      </header>
      <main class="main-content">
        <ul id="tabs" style="
              list-style: none;
              display: flex;
              gap: 16px;
              padding: 32px;
          ">
          <li data-target="#expenses-tab">Expenses</li>
          <li data-target="#income-tab">Income</li>
        </ul>

        <div id="tabs-sections">
          <section id="expenses-tab">
            ${Balance()}
            <div class="transactions-container">
              ${TransactionForm()}
              ${TransactionList()}
            </div>
          </section>

          <section id="income-tab" style="display: none;">
            ${Income()}
            ${TransactionList()}
          </section>
        </div>
      </main>
    </div>
  `;
}

const setupNav = () => {
  const tabs = document.querySelector('#tabs');
  const tabsSections = document.querySelector('#tabs-sections');

  tabs.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', event => {
      // hide all sections
      tabsSections.querySelectorAll('section').forEach(section => {
        section.style.display = 'none'; // lub można zastosować klasę CSS 'd-none'
      });

      // destrukturyzacja, wyświetlenie odpowiedniego targetu
      const target = event.target.dataset.target;
      tabsSections.querySelector(target).style.display = 'block'; // lub usunąć klasę CSS
    });
  });
};

export async function setupHomePage() {
  log('function setupHomePage - HomePage Initialization');
  const balanceSetup = await setupBalance();
  const transactionListSetup = await setupTransactionList(async newBalance => {
    log(
      'function setupHomePage - Updated transaction list, new balance:',
      newBalance
    );
    await balanceSetup.updateBalance(newBalance);
  });

  setupTransactionForm(async (transaction, newBalance) => {
    log('function setupHomePage - Added transaction, new balance:', newBalance);
    await balanceSetup.updateBalance(newBalance);
    await transactionListSetup.refreshTransactions();
  });

  const currentBalance = await fetchCurrentBalance();
  if (currentBalance === 0) {
    showZeroBalanceModal();
  }

  setupLogoutButton(() => {
    log('function setupHomePage - Show logout modal');
    showLogoutModal();
  });

  // Uruchomienie nawigacji między zakładkami
  setupNav();
}

function showLogoutModal() {
  log('function setupHomePage - Show logout modal');
  showModal({
    message: 'Are you sure you want to log out?',
    confirmLabel: 'YES',
    cancelLabel: 'NO',
    confirmAction: handleLogout,
    cancelAction: () => {},
  });
}

async function fetchCurrentBalance() {
  log('function fetchCurrentBalance - Downloading current balance');
  try {
    const response = await fetch(`${API_URL}/users/balance`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });
    const data = await response.json();
    log(
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
