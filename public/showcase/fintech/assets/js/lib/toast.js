import { TOAST_DURATION_MS } from '../core/constants.js';

const BRAND_NAME = 'VantaPay';

export function createToastController(element) {
  let timer;

  return {
    show(message) {
      if (!element) return;
      clearTimeout(timer);
      element.replaceChildren();
      const brand = document.createElement('strong');
      brand.textContent = BRAND_NAME;
      element.append(brand, document.createTextNode(` \u00b7 ${message}`));
      element.classList.add('show');
      timer = window.setTimeout(() => element.classList.remove('show'), TOAST_DURATION_MS);
    },
  };
}
