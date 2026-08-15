import { initI18n } from './i18n.js';
import { initNavigation } from './features/navigation.js';
import { initDialogs } from './features/dialogs.js';
import { initDemoForms } from './features/forms.js';
import { initTransferDemo } from './features/transfer.js';
import { initRevealAnimations } from './features/reveal.js';
import { createToastController } from './lib/toast.js';

function bootstrap() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const toast = createToastController(document.getElementById('toast'));

  initI18n();
  initNavigation();
  initDialogs();
  initDemoForms({ reducedMotion, toast });
  initTransferDemo({ reducedMotion, toast });
  initRevealAnimations({ reducedMotion });
}

bootstrap();
