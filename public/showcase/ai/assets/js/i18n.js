import es from './locales/es.js';
import en from './locales/en.js';

const locales = { es, en };

function getInitialLang() {
  const saved = localStorage.getItem('novaai-lang');
  if (saved && locales[saved]) return saved;
  return 'es';
}

let currentLang = getInitialLang();

function applyLocale(lang) {
  const dict = locales[lang];
  if (!dict) return;
  currentLang = lang;
  localStorage.setItem('novaai-lang', lang);
  document.documentElement.lang = lang;
  document.title = dict.meta_title || document.title;
  const description = document.querySelector('meta[name="description"]');
  if (description && dict.meta_description) description.setAttribute('content', dict.meta_description);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key] != null) el.innerHTML = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (dict[key] != null) el.placeholder = dict[key];
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    const key = el.dataset.i18nAriaLabel;
    if (dict[key] != null) el.setAttribute('aria-label', dict[key]);
  });

  const label = document.getElementById('lang-label');
  if (label) label.textContent = lang === 'es' ? 'EN' : 'ES';

  window.dispatchEvent(new CustomEvent('localeChanged', { detail: { lang, dict } }));
}

export function toggleLang() {
  applyLocale(currentLang === 'es' ? 'en' : 'es');
}

export function t(key) {
  return locales[currentLang]?.[key] ?? locales.es[key] ?? key;
}

export function getLang() {
  return currentLang;
}

export function initI18n() {
  applyLocale(currentLang);
}
