import { APP_CONFIG } from '../core/config.js';
import { t } from '../i18n.js';
import { setButtonLoading } from '../lib/button.js';

export function initDemoForms({ reducedMotion, toast }) {
  document.querySelectorAll('.demo-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const dialog = form.closest('dialog');
      const submit = form.querySelector('[type="submit"]');
      if (!submit) return;

      const resetButton = setButtonLoading(submit, {
        translationKey: 'forms.processing',
        labelFn: t,
      });

      window.setTimeout(() => {
        resetButton();
        dialog?.close();
        form.reset();
        toast.show(t(form.dataset.successKey || 'actions.completed'));
      }, reducedMotion ? 0 : APP_CONFIG.demoDelayMs);
    });
  });
}
