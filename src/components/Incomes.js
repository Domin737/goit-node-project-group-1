// src/components/Incomes.js
import log from '../utils/logger';
import { TransactionList, setupTransactionList } from './TransactionList';

export function Incomes() {
  log('Incomes - Rendering Incomes component');
  return `
    <div class="incomes">
      <h2>Income</h2>
      ${TransactionList({ type: 'income' })}
    </div>
  `;
}

export async function setupIncomes() {
  log('Incomes - Setting up Incomes component');
  const transactionListSetup = await setupTransactionList(async newBalance => {
    log('Incomes - Updated income list, new balance:', newBalance);
    // Tutaj możemy dodać logikę aktualizacji bilansu, jeśli jest to wymagane
  }, 'income');

  return {
    refreshIncomes: async () => {
      log('Incomes - Refreshing incomes list');
      await transactionListSetup.refreshTransactions();
    },
  };
}
