import { t } from '../i18n.js';
import { EVENTS } from '../core/constants.js';

export function openDialog(id) {
  const dialog = document.getElementById(id);
  if (dialog && !dialog.open) dialog.showModal();
}

function renderInfo(key) {
  const dialog = document.getElementById('infoModal');
  const title = document.getElementById('infoTitle');
  const body = document.getElementById('infoBody');
  if (!dialog || !title || !body || !key) return;
  dialog.dataset.infoKey = key;
  title.textContent = t(`info.${key}.title`);
  body.innerHTML = t(`info.${key}.body`);
}

export function initDialogs() {
  document.querySelectorAll('[data-open]').forEach((element) => {
    element.addEventListener('click', () => openDialog(element.dataset.open));
  });
  document.querySelectorAll('[data-close]').forEach((element) => {
    element.addEventListener('click', () => element.closest('dialog')?.close());
  });
  document.querySelectorAll('dialog').forEach((dialog) => {
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
      if (outside) dialog.close();
    });
  });

  document.querySelectorAll('[data-info]').forEach((element) => {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      renderInfo(element.dataset.info);
      openDialog('infoModal');
    });
  });

  window.addEventListener(EVENTS.LANGUAGE_CHANGE, () => {
    const dialog = document.getElementById('infoModal');
    if (dialog?.open && dialog.dataset.infoKey) renderInfo(dialog.dataset.infoKey);
  });
}
