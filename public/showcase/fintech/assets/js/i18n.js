import es from './locales/es.js';
import en from './locales/en.js';
import { APP_CONFIG } from './core/config.js';
import { EVENTS } from './core/constants.js';

const dictionaries = Object.freeze({ es, en });
let currentLanguage = APP_CONFIG.defaultLanguage;

function t(key, language = currentLanguage) {
  return dictionaries[language]?.[key] ?? dictionaries[APP_CONFIG.defaultLanguage]?.[key] ?? key;
}

function updateMetadata(language) {
  document.title = t('meta.title', language);
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = t('meta.description', language);
}

function updateLanguageControls(language) {
  document.querySelectorAll('[data-language]').forEach((button) => {
    const active = button.dataset.language === language;
    button.setAttribute('aria-pressed', String(active));
  });
}

export function applyLanguage(language) {
  const next = APP_CONFIG.supportedLanguages.includes(language) ? language : APP_CONFIG.defaultLanguage;
  currentLanguage = next;
  document.documentElement.lang = next;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = t(element.dataset.i18n, next);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder, next);
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
    element.setAttribute('aria-label', t(element.dataset.i18nAriaLabel, next));
  });

  updateMetadata(next);
  updateLanguageControls(next);
  localStorage.setItem(APP_CONFIG.languageStorageKey, next);
  window.dispatchEvent(new CustomEvent(EVENTS.LANGUAGE_CHANGE, { detail: { language: next } }));
  return next;
}

export function getCurrentLanguage() { return currentLanguage; }

export { t };

export function initI18n() {
  const saved = localStorage.getItem(APP_CONFIG.languageStorageKey);
  const initial = APP_CONFIG.supportedLanguages.includes(saved) ? saved : APP_CONFIG.defaultLanguage;
  document.querySelectorAll('[data-language]').forEach((button) => {
    button.addEventListener('click', () => applyLanguage(button.dataset.language));
  });
  return applyLanguage(initial);
}
