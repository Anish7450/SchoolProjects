(() => {
  const menuButton = document.getElementById('menu-button');
  const menuPanel = document.getElementById('dot-menu-panel');
  const menuItems = Array.from(document.querySelectorAll('.menu-item'));
  const openLearnBtn = document.getElementById('open-learn');
  const openAboutSchoolBtn = document.getElementById('about-school');
  const openAboutMeBtn = document.getElementById('about-myself')
  const contactForm = document.getElementById('contact-form');
  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function openMenu() {
    if (!menuButton || !menuPanel) return;
    menuButton.setAttribute('aria-expanded', 'true');
    menuPanel.setAttribute('aria-hidden', 'false');
    const first = menuPanel.querySelector('.menu-item');
    if (first) first.focus();
    document.addEventListener('pointerdown', onDocPointer);
    document.addEventListener('keydown', onMenuKeydown);
  }

  function closeMenu() {
    if (!menuButton || !menuPanel) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuPanel.setAttribute('aria-hidden', 'true');
    menuButton.focus();
    document.removeEventListener('pointerdown', onDocPointer);
    document.removeEventListener('keydown', onMenuKeydown);
  }

  function onDocPointer(e) {
    if (!menuPanel.contains(e.target) && e.target !== menuButton) closeMenu();
  }

  function onMenuKeydown(e) {
    if (e.key === 'Escape') closeMenu();
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const items = Array.from(menuPanel.querySelectorAll('.menu-item'));
      const idx = items.indexOf(document.activeElement);
      let next;
      if (e.key === 'ArrowDown') next = items[(idx + 1) % items.length];
      else next = items[(idx - 1 + items.length) % items.length];
      if (next) next.focus();
    }
  }

  if (menuButton) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuPanel && menuPanel.getAttribute('aria-hidden') === 'false';
      if (isOpen) closeMenu();
      else openMenu();
    });
  }

  // Map actions to file paths (adjust if folder structure differs)
  const navMap = {
    'about-school': 'AboutSchool.html',
    'about-me': 'AboutMyself.html',
    'learn-code': 'HowToCode.htm',
    'home': 'index.html'
  };

  menuItems.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = e.currentTarget.getAttribute('data-action');
      const target = navMap[action];
      // close menu first for accessibility
      closeMenu();
      if (target) {
        // delay so menu visually closes before navigating
        setTimeout(() => {
          window.location.href = target;
        }, 120);
      }
    });
  });

  if (openLearnBtn) {
    openLearnBtn.addEventListener('click', () => {
      const t = navMap['learn-code'];
      if (t) window.location.href = t;
    });
  }

  if (openAboutSchoolBtn) {
    openAboutSchoolBtn.addEventListener('click', () => {
      const t = navMap['about-school'];
      if (t) window.location.href = t;
    });
  }
  if (openAboutMeBtn) {
    openAboutMeBtn.addEventListener('click', () => {
      const t = navMap['about-myself'];
      if (t) window.location.href = t;
    });
  }

  // Alt+M toggles menu
  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key.toLowerCase() === 'm') {
      const isOpen = menuPanel && menuPanel.getAttribute('aria-hidden') === 'false';
      if (isOpen) closeMenu(); else openMenu();
    }
  });

  // Contact form stub (no modal)
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thanks for your message — submitted.');
      contactForm.reset();
    });
  }
})();