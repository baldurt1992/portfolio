export function initWorkflow() {
  const stage = document.querySelector('.workflow__stage');
  const steps = [...document.querySelectorAll('[data-workflow-step]')];
  const pagination = document.querySelector('[data-workflow-pagination]');
  if (!stage || !steps.length) return;

  const paginationButtons = pagination
    ? steps.map((step, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.workflowTarget = step.dataset.workflowStep;
        button.setAttribute('aria-label', `${index + 1}. ${step.querySelector('h3')?.textContent || ''}`);
        pagination.appendChild(button);
        return button;
      })
    : [];

  function activate(step) {
    const value = String(step.dataset.workflowStep);
    stage.dataset.activeStep = value;
    steps.forEach(item => {
      const active = item === step;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-current', active ? 'step' : 'false');
    });
    paginationButtons.forEach(button => {
      const active = button.dataset.workflowTarget === value;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-current', active ? 'step' : 'false');
    });
  }

  steps.forEach(step => {
    step.addEventListener('mouseenter', () => activate(step));
    step.addEventListener('focus', () => activate(step));
    step.addEventListener('click', () => activate(step));
    step.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      activate(step);
    });
  });

  const observer = new IntersectionObserver(entries => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) activate(visible.target);
  }, {
    threshold: [0.35, 0.6, 0.85],
    rootMargin: '-20% 0px -35% 0px'
  });

  steps.forEach(step => observer.observe(step));

  paginationButtons.forEach(button => {
    button.addEventListener('click', () => {
      const step = steps.find(item => item.dataset.workflowStep === button.dataset.workflowTarget);
      if (!step) return;
      activate(step);
    });
  });

  window.addEventListener('localeChanged', () => {
    paginationButtons.forEach((button, index) => {
      button.setAttribute('aria-label', `${index + 1}. ${steps[index].querySelector('h3')?.textContent || ''}`);
    });
  });

  activate(steps.find(step => step.classList.contains('is-active')) || steps[0]);
}
