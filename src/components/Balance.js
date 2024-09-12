// src/components/Balance.js
import { API_URL } from '../config';
import Modal, { setupModal } from './Modal';

// Funkcja pokazująca modal potwierdzający aktualizację bilansu
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

export function Balance() {
  return `
    <div id="balance-container">
      <h2>Bilans</h2>
      <p id="balance-amount">Ładowanie...</p>
      <button id="update-balance-btn">Aktualizuj bilans</button>
    </div>
  `;
}

export async function setupBalance() {
  const balanceAmount = document.getElementById('balance-amount');
  const updateBalanceBtn = document.getElementById('update-balance-btn');

  async function fetchBalance() {
    try {
      const response = await fetch(`${API_URL}/users/balance`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      const data = await response.json();
      balanceAmount.textContent = `${data.balance.toFixed(2)} EUR`;
    } catch (error) {
      console.error('Błąd podczas pobierania bilansu:', error);
      balanceAmount.textContent = 'Błąd podczas ładowania bilansu';
    }
  }

  async function updateBalance(newBalance) {
    try {
      const response = await fetch(`${API_URL}/users/balance`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify({ balance: parseFloat(newBalance) }),
      });
      const data = await response.json();
      balanceAmount.textContent = `${data.balance.toFixed(2)} EUR`;

      // Sprawdzenie, czy zaktualizowany bilans wynosi 0 i wyświetlenie modala
      if (data.balance === 0) {
        showZeroBalanceModal();
      }
    } catch (error) {
      console.error('Błąd podczas aktualizacji bilansu:', error);
      alert('Wystąpił błąd podczas aktualizacji bilansu');
    }
  }

  updateBalanceBtn.addEventListener('click', async () => {
    const newBalance = prompt('Podaj nowy bilans:');
    if (newBalance === null) return;

    showConfirmationModal(
      'Czy na pewno chcesz zaktualizować bilans?',
      async () => {
        await updateBalance(newBalance);
      }
    );
  });

  await fetchBalance();

  return {
    updateBalance,
    refreshBalance: fetchBalance,
  };
}

// Funkcja do pokazywania modala zerowego bilansu
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
