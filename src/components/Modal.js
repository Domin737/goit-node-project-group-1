// src/components/Modal.js
export default function Modal({
  message,
  confirmAction,
  confirmLabel = 'YES',
  cancelAction = null,
  cancelLabel = 'NO',
}) {
  console.log('function Modal - Creating a message modal:', message);
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
    console.log('function setupModal - Confirm button clicked in modal');
    confirmAction();
    closeModal();
  });

  closeBtn.addEventListener('click', () => {
    console.log('function setupModal - The modal close button was clicked');
    closeModal();
  });

  if (cancelAction) {
    const cancelBtn = document.getElementById('modal-cancel-btn');
    cancelBtn.addEventListener('click', () => {
      console.log('function setupModal - Cancel button clicked in modal');
      cancelAction();
      closeModal();
    });
  }

  setupOutsideClickModal();
}

export function closeModal() {
  console.log('function closeModal - Closing the modal');
  const modalOverlay = document.querySelector('.modal-overlay');
  if (modalOverlay) {
    modalOverlay.remove();
  }
}

function setupOutsideClickModal() {
  const modalOverlay = document.querySelector('.modal-overlay');
  modalOverlay.addEventListener('click', event => {
    if (event.target === modalOverlay) {
      console.log(
        'function setupOutsideClickModal - Clicked outside the modal, closing the modal'
      );
      closeModal();
    }
  });
}

export function showModal(options) {
  console.log('function showModal - Showing modal with options:', options);
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = Modal(options);
  document.body.appendChild(modalContainer.firstElementChild);
  setupModal(options.confirmAction, options.cancelAction);
}
