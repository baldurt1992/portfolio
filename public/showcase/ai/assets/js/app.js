import { initI18n, toggleLang } from './i18n.js';
import { initNavigation } from './features/navigation.js';
import { initReveal } from './features/reveal.js';
import { initChatDemo } from './features/chat-demo.js';
import { initDialogs } from './features/dialogs.js';
import { initWorkflow } from './features/workflow.js';
import { initImpactSimulator } from './features/impact.js';

initI18n();
initNavigation();
initReveal();
initChatDemo();
initDialogs();
initWorkflow();
initImpactSimulator();

document.getElementById('lang-toggle')?.addEventListener('click', toggleLang);
