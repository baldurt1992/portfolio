export function initNavigation() {
  const nav = document.getElementById('nav');
  const menuOpen = document.getElementById('menu-open');
  const menuClose = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu?.querySelectorAll('a, button.js-open-dialog');

  function updateNav() {
    if (window.scrollY > 20) {
      nav?.classList.add('is-scrolled');
    } else {
      nav?.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  function openMenu() {
    mobileMenu?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu?.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  menuOpen?.addEventListener('click', openMenu);
  menuClose?.addEventListener('click', closeMenu);
  mobileLinks?.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}
