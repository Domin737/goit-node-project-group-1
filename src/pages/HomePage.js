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
import Modal, { setupModal, setupOutsideClickModal } from '../components/Modal';
import { API_URL } from '../config';

export default function HomePage() {
  return `
    <div id="home-page">
      <h1>Witaj w aplikacji Kapu$ta!</h1>
      ${Balance()}
      ${TransactionForm()}
      ${TransactionList()}
      ${LogoutButton()}
      
      <!-- Modale -->
      <div id="confirmation-modal-container"></div>
      <div id="logout-modal-container"></div>
      <div id="zero-balance-modal-container"></div>
    </div>
  `;
}

export async function setupHomePage() {
  const balanceSetup = await setupBalance();
  const transactionListSetup = await setupTransactionList(async newBalance => {
    await balanceSetup.updateBalance(newBalance);

    // Sprawdzenie, czy bilans wynosi 0 po operacji
    if (newBalance === 0) {
      showZeroBalanceModal();
    }
  });

  setupTransactionForm(async (transaction, newBalance) => {
    // Aktualizacja balansu i odświeżenie listy transakcji po dodaniu transakcji
    await balanceSetup.updateBalance(newBalance);
    await transactionListSetup.refreshTransactions();

    // Sprawdzenie, czy bilans wynosi 0 po dodaniu transakcji
    if (newBalance === 0) {
      showZeroBalanceModal();
    }
  });

  // Sprawdzenie bilansu po załadowaniu strony
  const currentBalance = await fetchCurrentBalance();
  if (currentBalance === 0) {
    showZeroBalanceModal();
  }

  // Obsługa przycisku wylogowania
  setupLogoutButton(() => {
    showLogoutModal();
  });
}

// Funkcja do pokazywania modala dla zerowego bilansu (OK)
function showZeroBalanceModal() {
  const zeroBalanceModalContainer = document.getElementById(
    'zero-balance-modal-container'
  );
  zeroBalanceModalContainer.innerHTML = Modal({
    message:
      "Hello! To get started, enter the current balance of your account! You can't spend money until you have it :)",
    confirmLabel: 'OK',
    confirmAction: () => {
      zeroBalanceModalContainer.innerHTML = ''; // Ukryj modal po kliknięciu "OK"
    },
  });

  setupModal(() => {
    zeroBalanceModalContainer.innerHTML = ''; // Ukryj modal po kliknięciu "OK"
  });

  // Umożliwienie zamknięcia modala po kliknięciu poza nim
  setupOutsideClickModal(zeroBalanceModalContainer, '.modal');
}

// Funkcja do pokazywania modala wylogowania (YES/NO)
function showLogoutModal() {
  const logoutModalContainer = document.getElementById(
    'logout-modal-container'
  );
  logoutModalContainer.innerHTML = Modal({
    message: 'Czy na pewno chcesz się wylogować?',
    confirmLabel: 'Tak',
    cancelLabel: 'Nie',
    confirmAction: () => {
      handleLogout();
      logoutModalContainer.innerHTML = ''; // Ukryj modal po wylogowaniu
    },
    cancelAction: () => {
      logoutModalContainer.innerHTML = ''; // Ukryj modal po anulowaniu
    },
  });

  setupModal(
    () => {
      handleLogout();
      logoutModalContainer.innerHTML = ''; // Ukryj modal po wylogowaniu
    },
    () => {
      logoutModalContainer.innerHTML = ''; // Ukryj modal po anulowaniu
    }
  );
}

// Funkcja do pokazywania modala potwierdzającego akcję (YES/NO)
function showConfirmationModal(message, confirmAction) {
  const confirmationModalContainer = document.getElementById(
    'confirmation-modal-container'
  );
  confirmationModalContainer.innerHTML = Modal({
    message,
    confirmLabel: 'YES',
    cancelLabel: 'NO',
    confirmAction: () => {
      confirmAction();
      confirmationModalContainer.innerHTML = ''; // Ukryj modal po potwierdzeniu
    },
    cancelAction: () => {
      confirmationModalContainer.innerHTML = ''; // Ukryj modal po anulowaniu
    },
  });

  setupModal(
    () => {
      confirmAction();
      confirmationModalContainer.innerHTML = ''; // Ukryj modal po potwierdzeniu
    },
    () => {
      confirmationModalContainer.innerHTML = ''; // Ukryj modal po anulowaniu
    }
  );
}

// Funkcja do pobierania bieżącego bilansu z backendu
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
