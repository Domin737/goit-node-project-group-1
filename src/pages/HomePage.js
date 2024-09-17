// src/pages/HomePage.js

// Importowanie modułu logowania
import log from '../utils/logger';

// Importowanie komponentu przycisku wylogowania i funkcji jego konfiguracji
import LogoutButton, { setupLogoutButton } from '../components/LogoutButton';

// Importowanie funkcji obsługującej wylogowanie
import { handleLogout } from '../utils/logoutUtils';

// Importowanie komponentów związanych z bilansem
import {
  Balance,
  setupBalance,
  showZeroBalanceModal,
} from '../components/Balance';

// Importowanie komponentów formularza transakcji
import {
  TransactionForm,
  changeTypeTransactionForm,
  setupTransactionForm,
} from '../components/TransactionForm';

// Importowanie komponentów listy transakcji
import {
  TransactionList,
  setupTransactionList,
} from '../components/TransactionList';

// Importowanie funkcji do wyświetlania modalu
import { showModal } from '../components/Modal';

// Importowanie stałej API_URL z konfiguracji
import { API_URL } from '../config';

// Importowanie logo aplikacji
import logo from '../images/logo-small.svg';

// Importowanie komponentów listy podsumowania
import { SummaryList, setupSummaryList } from '../components/SummaryList';

// Funkcja komponentu HomePage, renderująca stronę główną aplikacji
export default function HomePage() {
  log('HomePage - Renderowanie strony głównej');
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
          <button id="arrow-left" class="arrow-button">◀</button>
          <button class="btn btn-outline tab-button active" data-tab="expense">EXPENSES</button>
          <button class="btn btn-outline tab-button" data-tab="income">INCOME</button>
          <button id="arrow-right" class="arrow-button">▶</button>
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

// Zmienna globalna do przechowywania konfiguracji bilansu
let balanceSetup;

// Funkcja asynchroniczna do inicjalizacji strony głównej
export async function setupHomePage() {
  log('HomePage - Inicjalizacja strony głównej');

  // Inicjalizacja bilansu
  balanceSetup = await setupBalance();

  // Konfiguracja zakładek
  setupTabs();

  // Konfiguracja formularza transakcji i obsługa dodawania nowej transakcji
  setupTransactionForm(async (transaction, newBalance) => {
    log('HomePage - Dodano transakcję, nowy bilans:', newBalance);
    await balanceSetup.updateBalance(newBalance);
    const activeTab = document
      .querySelector('.tab-button.active')
      .getAttribute('data-tab');
    await updateTransactionList(activeTab);
  });

  // Pobranie aktualnego bilansu użytkownika
  const currentBalance = await fetchCurrentBalance();

  // Jeśli bilans wynosi 0, wyświetl modal informacyjny
  if (currentBalance === 0) {
    showZeroBalanceModal();
  }

  // Konfiguracja przycisku wylogowania
  setupLogoutButton(() => {
    log('HomePage - Wyświetlanie modalu wylogowania');
    showLogoutModal();
  });

  // Inicjalizacja początkowej listy transakcji (domyślnie wydatki)
  await updateTransactionList('expense');

  // Pobranie informacji o bieżącym użytkowniku (avatar i nazwa)
  await loadUserInfo();
}

// Funkcja do konfiguracji zakładek na stronie głównej
function setupTabs() {
  log('HomePage - Konfiguracja zakładek');

  // Pobranie referencji do przycisków zakładek
  const tabButtons = document.querySelectorAll('.tab-button');

  // Dodanie obsługi kliknięcia dla przycisków zakładek
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabType = button.getAttribute('data-tab');
      log(`HomePage - Kliknięto zakładkę ${tabType}`);
      switchTab(tabType);
    });
  });

  // Obsługa przycisków strzałek do przełączania zakładek
  document.getElementById('arrow-left').addEventListener('click', () => {
    const currentActive = document.querySelector('.tab-button.active');
    const newTab =
      currentActive.getAttribute('data-tab') === 'income'
        ? 'expense'
        : 'income';
    switchTab(newTab);
  });

  document.getElementById('arrow-right').addEventListener('click', () => {
    const currentActive = document.querySelector('.tab-button.active');
    const newTab =
      currentActive.getAttribute('data-tab') === 'expense'
        ? 'income'
        : 'expense';
    switchTab(newTab);
  });
}

// Funkcja do przełączania aktywnej zakładki
function switchTab(newTab) {
  // Pobranie referencji do przycisków zakładek
  const tabButtons = document.querySelectorAll('.tab-button');

  // Usunięcie klasy 'active' ze wszystkich przycisków zakładek
  tabButtons.forEach(btn => btn.classList.remove('active'));

  // Dodanie klasy 'active' do wybranego przycisku
  const activeButton = document.querySelector(`[data-tab="${newTab}"]`);
  activeButton.classList.add('active');

  // Aktualizacja listy transakcji dla nowej zakładki
  updateTransactionList(newTab);
}

// Funkcja asynchroniczna do aktualizacji listy transakcji dla danego typu
async function updateTransactionList(type) {
  log(`HomePage - Aktualizacja listy transakcji dla ${type}`);

  // Pobranie referencji do kontenera listy transakcji
  const transactionListContainer = document.getElementById(
    'transaction-list-container'
  );

  // Pobranie referencji do kontenera listy podsumowania
  const summaryListContainer = document.querySelector(
    '#summary-list-container'
  );

  // Renderowanie komponentu listy transakcji
  transactionListContainer.innerHTML = TransactionList({ type });

  // Renderowanie komponentu listy podsumowania
  summaryListContainer.innerHTML = SummaryList();

  // Inicjalizacja listy transakcji
  await setupTransactionList(async newBalance => {
    log(`HomePage - Zaktualizowano listę ${type}, nowy bilans:`, newBalance);
    await balanceSetup.updateBalance(newBalance);
  }, type);

  // Inicjalizacja listy podsumowania
  setupSummaryList(type);

  // Zmiana typu w formularzu transakcji
  changeTypeTransactionForm(type);
}

// Funkcja asynchroniczna do pobrania informacji o aktualnym użytkowniku
async function loadUserInfo() {
  try {
    // Wysłanie żądania do API w celu pobrania danych użytkownika
    const response = await fetch(`${API_URL}/users/current`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });
    // Parsowanie odpowiedzi jako JSON
    const userData = await response.json();

    // Ustawienie avatara i nazwy użytkownika w interfejsie
    document.getElementById('user-avatar').src = userData.avatarURL;
    document.getElementById('user-name').textContent = userData.name;
  } catch (error) {
    // Obsługa błędów podczas pobierania informacji o użytkowniku
    console.error(
      'HomePage - Błąd podczas ładowania informacji o użytkowniku:',
      error
    );
  }
}

// Funkcja do wyświetlania modalu potwierdzającego wylogowanie
function showLogoutModal() {
  log('HomePage - Wyświetlanie modalu wylogowania');
  showModal({
    message: 'Are you sure you want to log out?',
    confirmLabel: 'YES',
    cancelLabel: 'NO',
    confirmAction: handleLogout,
    cancelAction: () => {},
  });
}

// Funkcja asynchroniczna do pobrania aktualnego bilansu użytkownika
async function fetchCurrentBalance() {
  log('HomePage - Pobieranie aktualnego bilansu');
  try {
    // Wysłanie żądania do API w celu pobrania bilansu
    const response = await fetch(`${API_URL}/users/balance`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });
    // Parsowanie odpowiedzi jako JSON
    const data = await response.json();
    log('HomePage - Pobrano aktualny bilans:', data.balance);
    return data.balance;
  } catch (error) {
    // Obsługa błędów podczas pobierania bilansu
    console.error('HomePage - Błąd podczas pobierania bilansu:', error);
    return null;
  }
}
