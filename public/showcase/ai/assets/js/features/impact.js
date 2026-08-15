import { getLang, t } from '../i18n.js';

export function initImpactSimulator() {
  const range = document.getElementById('volume-range');
  const volume = document.getElementById('volume-value');
  const resolved = document.getElementById('resolved-value');
  const hours = document.getElementById('hours-value');
  const handoffs = document.getElementById('handoff-value');
  const setup = document.getElementById('setup-value');
  if (!range || !volume || !resolved || !hours || !handoffs || !setup) return;

  function format(value) {
    return new Intl.NumberFormat(getLang() === 'es' ? 'es-ES' : 'en-US').format(value);
  }

  function update() {
    const total = Number(range.value);
    const assisted = Math.round(total * 0.68);
    const savedHours = Math.round((assisted * 5) / 60);
    const escalated = total - assisted;
    const setupKey = total <= 2000 ? 'setup_start' : total <= 15000 ? 'setup_scale' : 'setup_enterprise';

    volume.textContent = format(total);
    resolved.textContent = format(assisted);
    hours.textContent = `${format(savedHours)} h`;
    handoffs.textContent = format(escalated);
    setup.textContent = t(setupKey);
  }

  range.addEventListener('input', update);
  window.addEventListener('localeChanged', update);
  update();
}
