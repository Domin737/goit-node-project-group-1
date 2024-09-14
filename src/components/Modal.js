// src/components/Modal.js
export default function Modal({
  message,
  confirmAction,
  confirmLabel = 'YES',
  cancelAction = null,
  cancelLabel = 'NO',
}) {
  console.log('Tworzenie modala z wiadomością:', message);
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

export function setupModal(confirmAction, cancelAction = null) {
  const confirmBtn = document.getElementById('modal-confirm-btn');
  const closeBtn = document.getElementById('modal-close-btn');

  confirmBtn.addEventListener('click', () => {
    console.log('Kliknięto przycisk potwierdzenia w modalu');
    confirmAction();
    closeModal();
  });

  closeBtn.addEventListener('click', () => {
    console.log('Kliknięto przycisk zamknięcia modala');
    closeModal();
  });

  if (cancelAction) {
    const cancelBtn = document.getElementById('modal-cancel-btn');
    cancelBtn.addEventListener('click', () => {
      console.log('Kliknięto przycisk anulowania w modalu');
      cancelAction();
      closeModal();
    });
  }

  setupOutsideClickModal();
}

export function closeModal() {
  console.log('Zamykanie modala');
  const modalOverlay = document.querySelector('.modal-overlay');
  if (modalOverlay) {
    modalOverlay.remove();
  }
}

function setupOutsideClickModal() {
  const modalOverlay = document.querySelector('.modal-overlay');
  modalOverlay.addEventListener('click', event => {
    if (event.target === modalOverlay) {
      console.log('Kliknięto poza modalem, zamykanie modala');
      closeModal();
    }
  });
}

export function showModal(options) {
  console.log('Pokazanie modala z opcjami:', options);
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = Modal(options);
  document.body.appendChild(modalContainer.firstElementChild);
  setupModal(options.confirmAction, options.cancelAction);
}
