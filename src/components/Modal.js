// src/components/Modal.js

// Importowanie modułu logowania
import log from '../utils/logger';

// Domyślny eksport funkcji Modal, która tworzy szablon modalu z przekazanymi opcjami
export default function Modal({
  message,
  confirmAction,
  confirmLabel = 'YES',
  cancelAction = null,
  cancelLabel = 'NO',
}) {
  // Logowanie tworzenia modalu z wiadomością
  log('function Modal - Tworzenie modalu z wiadomością:', message);

  // Zwracanie szablonu HTML modalu jako string
  return `
    <div class="modal-overlay">
      <div class="modal">
        <div class="modal-content">
          <p>${message}</p>
          <div class="modal-footer">
            <button id="modal-confirm-btn" class="btn btn-primary">${confirmLabel}</button>
            ${
              cancelAction
                ? `<button id="modal-cancel-btn" class="btn btn-secondary">${cancelLabel}</button>`
                : ''
            }
          </div>
        </div>
        <button class="modal-close" id="modal-close-btn">&times;</button>
      </div>
    </div>
  `;
}

// Eksport funkcji setupModal do inicjalizacji obsługi zdarzeń modalu
export function setupModal(confirmAction, cancelAction = null) {
  // Pobranie referencji do przycisków w modalnym oknie
  const confirmBtn = document.getElementById('modal-confirm-btn');
  const closeBtn = document.getElementById('modal-close-btn');

  // Dodanie obsługi zdarzenia kliknięcia na przycisk potwierdzenia
  confirmBtn.addEventListener('click', () => {
    log('function setupModal - Kliknięto przycisk potwierdzenia w modalu');
    confirmAction();
    closeModal();
  });

  // Dodanie obsługi zdarzenia kliknięcia na przycisk zamknięcia modalu
  closeBtn.addEventListener('click', () => {
    log('function setupModal - Kliknięto przycisk zamknięcia modalu');
    closeModal();
  });

  // Jeśli jest zdefiniowana akcja anulowania, dodaj obsługę przycisku anulowania
  if (cancelAction) {
    const cancelBtn = document.getElementById('modal-cancel-btn');
    cancelBtn.addEventListener('click', () => {
      log('function setupModal - Kliknięto przycisk anulowania w modalu');
      cancelAction();
      closeModal();
    });
  }

  // Inicjalizacja obsługi zamknięcia modalu po kliknięciu poza jego obszarem
  setupOutsideClickModal();
}

// Eksport funkcji closeModal do zamykania modalu
export function closeModal() {
  // Logowanie zamknięcia modalu
  log('function closeModal - Zamknięcie modalu');
  const modalOverlay = document.querySelector('.modal-overlay');
  if (modalOverlay) {
    modalOverlay.remove();
  }
}

// Funkcja do obsługi zamykania modalu po kliknięciu poza jego obszarem
function setupOutsideClickModal() {
  const modalOverlay = document.querySelector('.modal-overlay');
  modalOverlay.addEventListener('click', event => {
    if (event.target === modalOverlay) {
      log(
        'function setupOutsideClickModal - Kliknięto poza modalem, zamykanie modalu'
      );
      closeModal();
    }
  });
}

// Eksport funkcji showModal do wyświetlania modalu z podanymi opcjami
export function showModal(options) {
  // Logowanie wyświetlania modalu z opcjami
  log('function showModal - Wyświetlanie modalu z opcjami:', options);
  // Tworzenie kontenera na modal
  const modalContainer = document.createElement('div');
  // Ustawienie wewnętrznego HTML kontenera na szablon modalu
  modalContainer.innerHTML = Modal(options);
  // Dodanie modalu do dokumentu
  document.body.appendChild(modalContainer.firstElementChild);
  // Inicjalizacja obsługi zdarzeń dla modalu
  setupModal(options.confirmAction, options.cancelAction);
}
