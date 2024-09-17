// src/components/Expenses.js

// Importowanie modułu logowania
import log from '../utils/logger';

// Importowanie komponentów TransactionList i setupTransactionList
import { TransactionList, setupTransactionList } from './TransactionList';

// Funkcja komponentu Expenses, renderująca widok wydatków
export function Expenses() {
  log('Expenses - Renderowanie komponentu Expenses');
  return `
    <div class="expenses">
      <h2>Expenses</h2>
      ${TransactionList({ type: 'expense' })}
    </div>
  `;
}

// Funkcja asynchroniczna do inicjalizacji komponentu Expenses
export async function setupExpenses() {
  log('Expenses - Inicjalizacja komponentu Expenses');

  // Inicjalizacja listy transakcji dla wydatków
  const transactionListSetup = await setupTransactionList(async newBalance => {
    log('Expenses - Zaktualizowano listę wydatków, nowy bilans:', newBalance);
    // Tutaj możemy dodać logikę aktualizacji bilansu, jeśli jest to wymagane
  }, 'expense');

  // Zwracanie funkcji umożliwiających odświeżenie listy wydatków
  return {
    refreshExpenses: async () => {
      log('Expenses - Odświeżanie listy wydatków');
      await transactionListSetup.refreshTransactions();
    },
  };
}
