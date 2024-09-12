// /src/components/Modal.js

export default function Modal({
  message,
  confirmAction,
  confirmLabel = 'YES',
  cancelAction = null,
  cancelLabel = 'NO',
}) {
  return `
      <div class="modal">
        <div class="modal-content">
          <p>${message}</p>
          <button id="modal-confirm-btn">${confirmLabel}</button>
          ${
            cancelAction
              ? `<button id="modal-cancel-btn">${cancelLabel}</button>`
              : ''
          }
        </div>
      </div>
    `;
}

export function setupModal(confirmAction, cancelAction = null) {
  const confirmBtn = document.getElementById('modal-confirm-btn');
  confirmBtn.addEventListener('click', confirmAction);

  if (cancelAction) {
    const cancelBtn = document.getElementById('modal-cancel-btn');
    cancelBtn.addEventListener('click', cancelAction);
  }
}

// Funkcja do obsługi zamykania modala po kliknięciu poza nim
export function setupOutsideClickModal(modalContainer, modalClass) {
  document.addEventListener('click', event => {
    const modal = document.querySelector(modalClass);
    if (modal && !modal.contains(event.target)) {
      modalContainer.innerHTML = ''; // Ukryj modal
    }
  });
}
