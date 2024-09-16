import log from '../utils/logger';
import { API_URL } from '../config';

export const SummaryList = () => {
  return `
  <div class="summary-list-container">
    <h2 class="summary-title">Summary</h2>
    <ul id="summary-list" class="summary-list">
    </ul>
  </div>
  `;
};

export async function setupSummaryList(type) {
  try {
    const response = await fetch(`${API_URL}/transactions?type=${type}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });
    const transactions = await response.json();

    renderSummaryList(transactions);
  } catch (error) {
    console.error(`SummaryList - Error fetching ${type} transactions:`, error);
  }
}

function renderSummaryList(transactions) {
  log('renderSummaryList', transactions);
  const summaryList = document.getElementById('summary-list');

  const monthsNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const months = new Map();

  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthName = monthsNames[date.getMonth()];
    const year = date.getFullYear();
    const key = `${year} ${monthName}`;
    const amount = transaction.amount;

    if (months.has(key)) {
      months.set(key, months.get(key) + amount);
    } else {
      months.set(key, amount);
    }
  });

  summaryList.innerHTML = [...months.entries()]
    .map(month => {
      return `
        <li>
          <span class="month">${month[0]}</span>
          <span class="amount">${month[1].toFixed(2)}</span>
        </li>
      `;
    })
    .join('');
}
