import { APP_CONFIG } from '../core/config.js';
import { t } from '../i18n.js';
import { setButtonLoading } from '../lib/button.js';

export function initTransferDemo({ reducedMotion, toast }) {
  const button = document.getElementById('approveTransfer');
  const dialog = document.getElementById('transferModal');
  if (!button || !dialog) return;

  button.addEventListener('click', () => {
    const resetButton = setButtonLoading(button, {
      translationKey: 'transfer.authorizing',
      labelFn: t,
    });

    window.setTimeout(() => {
      resetButton();
      dialog.close();
      toast.show(t('transfer.approved'));
    }, reducedMotion ? 0 : APP_CONFIG.transferDelayMs);
  });
}
