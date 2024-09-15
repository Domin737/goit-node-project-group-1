// src/components/Expenses.js
import log from '../utils/logger';
import { TransactionList, setupTransactionList } from './TransactionList';

export function Expenses() {
  log('Expenses - Rendering Expenses component');
  return `
    <div class="expenses">
      <h2>Expenses</h2>
      ${TransactionList({ type: 'expense' })}
    </div>
  `;
}

export async function setupExpenses() {
  log('Expenses - Setting up Expenses component');
  const transactionListSetup = await setupTransactionList(async newBalance => {
    log('Expenses - Updated expense list, new balance:', newBalance);
    // Tutaj możemy dodać logikę aktualizacji bilansu, jeśli jest to wymagane
  }, 'expense');

  return {
    refreshExpenses: async () => {
      log('Expenses - Refreshing expenses list');
      await transactionListSetup.refreshTransactions();
    },
  };
}
