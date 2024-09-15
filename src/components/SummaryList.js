import log from '../utils/logger';
import { API_URL } from '../config';

export const SummaryList = () => {
  return `
  <h2>Summary</h2>
  <ul id="summary-list">
  </ul>
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
  //   {
  //     "_id": "66e6e8c26c61a0348552d130",
  //     "user": "66e39a4d4bfbd52fa11fa891",
  //     "type": "income",
  //     "category": "salary",
  //     "amount": 123,
  //     "description": "test income",
  //     "date": "2024-09-14T00:00:00.000Z",
  //     "createdAt": "2024-09-15T14:01:38.910Z",
  //     "updatedAt": "2024-09-15T14:01:38.910Z",
  //     "__v": 0
  // }

  const mounthsNames = [
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

  const mounths = new Map();

  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const mounthName = mounthsNames[date.getMonth()];
    const year = date.getFullYear();
    const key = `${year} ${mounthName}`;
    const amount = transaction.amount;

    if (mounths.has(key)) {
      mounths.set(key, mounths.get(key) + amount);
    } else {
      mounths.set(key, amount);
    }
  });

  summaryList.innerHTML = [...mounths.entries()]
    .map(mounth => {
      return `<li>${mounth[0]} ${mounth[1]}</li>`;
    })
    .join('');
}
