export function initDialogs() {
  const dialog = document.getElementById('dialog');
  const closeBtn = document.getElementById('dialog-close');
  const form = document.getElementById('dialog-form');
  const success = document.getElementById('dialog-success');

  const openTriggers = ['.js-open-dialog'];
  let lastTrigger = null;

  function showToast(message) {
    let toast = document.getElementById('demo-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'demo-toast';
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    setTimeout(() => toast.classList.remove('is-visible'), 3000);
  }

  function openDialog(event) {
    lastTrigger = event?.currentTarget || document.activeElement;
    dialog?.classList.add('is-open');
    dialog?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const input = document.getElementById('dialog-email');
    setTimeout(() => input?.focus(), 50);
  }

  function closeDialog() {
    dialog?.classList.remove('is-open');
    dialog?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lastTrigger?.focus?.();
  }

  openTriggers.forEach(selector => {
    document.querySelectorAll(selector).forEach(btn => {
      btn.addEventListener('click', openDialog);
    });
  });

  closeBtn?.addEventListener('click', closeDialog);

  dialog?.addEventListener('click', (e) => {
    if (e.target === dialog) closeDialog();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDialog();
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    form.hidden = true;
    success.hidden = false;
    setTimeout(() => {
      closeDialog();
      setTimeout(() => {
        form.reset();
        form.hidden = false;
        success.hidden = true;
      }, 300);
    }, 2200);
  });

  document.querySelectorAll('.js-toast').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showToast(link.dataset.toast || 'Demo');
    });
  });
}
