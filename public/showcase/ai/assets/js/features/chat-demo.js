import { getLang, t } from '../i18n.js';

const scenarios = {
  help: {
    es: {
      user: '¿Cómo actualizo los datos de facturación?',
      bot: 'Encontré la guía del centro de ayuda. Puedes actualizar la razón social, el NIT y la dirección desde Facturación → Datos fiscales.'
    },
    en: {
      user: 'How do I update my billing details?',
      bot: 'I found the help-center guide. You can update the legal name, tax ID, and address under Billing → Tax details.'
    }
  },
  order: {
    es: {
      user: '¿Dónde está mi pedido #4821?',
      bot: 'Está en ruta y la entrega está prevista para mañana entre las 9:00 y las 13:00. Puedo avisarte cuando el transportista inicie el último tramo.'
    },
    en: {
      user: 'Where is my order #4821?',
      bot: 'It is in transit and delivery is scheduled for tomorrow between 9:00 AM and 1:00 PM. I can notify you when the courier starts the final leg.'
    }
  },
  plan: {
    es: {
      user: 'Quiero cambiar mi plan, pero antes necesito comparar límites.',
      bot: 'Tu uso actual está cerca del límite del plan. Preparé una comparación con conversaciones, canales y coste estimado para que decidas antes de confirmar.'
    },
    en: {
      user: 'I want to change plans, but I need to compare limits first.',
      bot: 'Your current usage is close to the plan limit. I prepared a comparison of conversations, channels, and estimated cost so you can decide before confirming.'
    }
  },
  human: {
    es: {
      user: 'Prefiero hablar con una persona sobre este cobro.',
      bot: 'Claro. Voy a transferirte con facturación y enviaré el cobro, tu historial y el motivo de la consulta para que no tengas que repetirlo.'
    },
    en: {
      user: 'I would rather speak with someone about this charge.',
      bot: 'Of course. I will transfer you to billing with the charge, your history, and the reason for your request so you do not have to repeat anything.'
    }
  },
  crm: {
    es: {
      user: '¿Qué contexto tenemos antes de transferir esta conversación?',
      bot: 'El CRM muestra dos compras recientes y una consulta de facturación abierta. Enviaré ese historial y el motivo actual al especialista.'
    },
    en: {
      user: 'What context do we have before transferring this conversation?',
      bot: 'The CRM shows two recent purchases and an open billing request. I will send that history and the current reason to the specialist.'
    }
  }
};

const scenarioSources = {
  help: 'help',
  order: 'orders',
  plan: 'help',
  human: 'crm',
  crm: 'crm'
};

const scenarioTraces = {
  help: {
    es: ['Actualizar datos fiscales', 'Centro de ayuda', 'Mostrar la guía correcta'],
    en: ['Update tax details', 'Help center', 'Show the right guide']
  },
  order: {
    es: ['Consultar estado de pedido', 'Pedidos + Envíos', 'Ofrecer seguimiento'],
    en: ['Check order status', 'Orders + Shipping', 'Offer tracking']
  },
  plan: {
    es: ['Comparar planes', 'Plan actual + uso', 'Mostrar comparación'],
    en: ['Compare plans', 'Current plan + usage', 'Show comparison']
  },
  human: {
    es: ['Solicitar atención humana', 'CRM + Facturación', 'Transferir con contexto'],
    en: ['Request a human', 'CRM + Billing', 'Transfer with context']
  },
  crm: {
    es: ['Preparar transferencia', 'CRM + historial', 'Entregar al especialista'],
    en: ['Prepare handoff', 'CRM + history', 'Send to specialist']
  }
};

function createMessage(text, type) {
  const message = document.createElement('div');
  message.className = `chat__message chat__message--${type}`;
  message.textContent = text;
  return message;
}

function createTyping() {
  const typing = document.createElement('div');
  typing.className = 'chat__message chat__message--bot chat__message--typing';
  typing.setAttribute('aria-label', t('chat_typing'));
  typing.innerHTML = '<span></span><span></span><span></span>';
  return typing;
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function initChatDemo() {
  const body = document.getElementById('chat-body');
  const buttons = [...document.querySelectorAll('[data-scenario]')];
  const sourceButtons = [...document.querySelectorAll('[data-source]')];
  const traceValues = [
    document.getElementById('trace-intent-value'),
    document.getElementById('trace-sources-value'),
    document.getElementById('trace-action-value')
  ];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!body || !buttons.length) return;

  let activeScenario = 'help';
  let runId = 0;

  async function playScenario(name, animate = true) {
    const scenario = scenarios[name];
    if (!scenario) return;

    activeScenario = name;
    const currentRun = ++runId;
    const copy = scenario[getLang()] || scenario.es;
    const trace = scenarioTraces[name]?.[getLang()] || scenarioTraces[name]?.es;
    traceValues.forEach((element, index) => {
      if (!element || !trace?.[index]) return;
      element.textContent = trace[index];
      element.removeAttribute('data-i18n');
    });
    buttons.forEach(button => {
      const active = button.dataset.scenario === name;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    const activeSource = scenarioSources[name];
    sourceButtons.forEach(button => {
      const active = button.dataset.source === activeSource;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    body.replaceChildren(createMessage(copy.user, 'user'));
    if (animate && !reducedMotion) {
      const typing = createTyping();
      body.appendChild(typing);
      await wait(700);
      if (currentRun !== runId) return;
      typing.remove();
    }
    body.appendChild(createMessage(copy.bot, 'bot'));
    body.scrollTop = body.scrollHeight;
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => playScenario(button.dataset.scenario));
  });

  sourceButtons.forEach(button => {
    button.addEventListener('click', () => {
      const scenario = button.dataset.source === 'orders' ? 'order' : button.dataset.source;
      playScenario(scenario);
    });
  });

  window.addEventListener('localeChanged', () => playScenario(activeScenario, false));
  playScenario(activeScenario, false);
}
