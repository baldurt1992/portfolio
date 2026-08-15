export function initNavigation() {
  const menuButton = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!menuButton || !mobileMenu) return;

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  };

  menuButton.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  mobileMenu.querySelectorAll('a, button:not([data-language])').forEach((element) => element.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 950) closeMenu(); });
}
