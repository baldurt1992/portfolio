export function setButtonLoading(button, { translationKey, labelFn }) {
  const label = button.querySelector('[data-i18n]');
  const key = label?.dataset.i18n;
  const originalText = button.textContent;

  button.disabled = true;
  if (label) {
    label.textContent = labelFn(translationKey);
  } else {
    button.textContent = labelFn(translationKey);
  }

  return () => {
    button.disabled = false;
    if (label && key) {
      label.textContent = labelFn(key);
    } else {
      button.textContent = originalText;
    }
  };
}
