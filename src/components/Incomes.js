// src/components/Incomes.js

// Importowanie modułu logowania
import log from '../utils/logger';

// Importowanie komponentów TransactionList i setupTransactionList
import { TransactionList, setupTransactionList } from './TransactionList';

// Funkcja komponentu Incomes, renderująca widok przychodów
export function Incomes() {
  log('Incomes - Renderowanie komponentu Incomes');
  return `
    <div class="incomes">
      <h2>Income</h2>
      ${TransactionList({ type: 'income' })}
    </div>
  `;
}

// Funkcja asynchroniczna do inicjalizacji komponentu Incomes
export async function setupIncomes() {
  log('Incomes - Inicjalizacja komponentu Incomes');

  // Inicjalizacja listy transakcji dla przychodów
  const transactionListSetup = await setupTransactionList(async newBalance => {
    log('Incomes - Zaktualizowano listę przychodów, nowy bilans:', newBalance);
    // Tutaj możemy dodać logikę aktualizacji bilansu, jeśli jest to wymagane
  }, 'income');

  // Zwracanie funkcji umożliwiających odświeżenie listy przychodów
  return {
    refreshIncomes: async () => {
      log('Incomes - Odświeżanie listy przychodów');
      await transactionListSetup.refreshTransactions();
    },
  };
}
