// about_myself_script.js
// Universal, defensive menu + navigation logic for AboutMyself.html
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menu-button');
  const menuPanel = document.getElementById('dot-menu-panel');
  const menuItems = Array.from(document.querySelectorAll('.menu-item'));
  const yearEl = document.getElementById('year');

  // set footer year if present
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // guard: required elements must exist
  if (!menuButton || !menuPanel) {
    console.error('about_myself_script.js: required menu elements not found (#menu-button, #dot-menu-panel).');
    return;
  }

  // open / close helpers
  function openMenu() {
    menuButton.setAttribute('aria-expanded', 'true');
    menuPanel.setAttribute('aria-hidden', 'false');
    const first = menuPanel.querySelector('.menu-item');
    if (first) first.focus();
    document.addEventListener('pointerdown', onDocPointer);
    document.addEventListener('keydown', onKeyDown);
  }

  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    menuPanel.setAttribute('aria-hidden', 'true');
    try { menuButton.focus(); } catch (err) {}
    document.removeEventListener('pointerdown', onDocPointer);
    document.removeEventListener('keydown', onKeyDown);
  }

  function onDocPointer(e) {
    // if click/tap outside menu panel and not the menu button, close
    if (!menuPanel.contains(e.target) && e.target !== menuButton) closeMenu();
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') closeMenu();
  }

  // Toggle behavior on menu button
  menuButton.addEventListener('click', () => {
    const isOpen = menuPanel.getAttribute('aria-hidden') === 'false';
    if (isOpen) closeMenu(); else openMenu();
  });

  // Map actions -> exact filenames (case-sensitive)
  const actionMap = {
    'home': 'index.html',
    'about-school': 'AboutSchool.html'
    // add more mappings if you add more menu items
  };

  // Attach navigation behavior to menu items
  menuItems.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = e.currentTarget.getAttribute('data-action');

      if (!action) {
        console.warn('about_myself_script.js: clicked menu-item missing data-action', e.currentTarget);
        closeMenu();
        return;
      }

      // prefer mapping; fallback to using action as filename if it ends with .html
      const target = actionMap[action] || (action.endsWith('.html') ? action : null);

      if (target) {
        // navigate to target file (same directory)
        window.location.href = target;
      } else {
        // no target known
        console.warn(`about_myself_script.js: unknown action "${action}". Add mapping or use a filename as data-action.`);
      }

      // close menu for UX (if navigation is blocked, the menu still closes)
      closeMenu();
    });
  });

  // close menu if focus leaves the panel (accessibility)
  menuPanel.addEventListener('focusout', (e) => {
    const related = e.relatedTarget;
    if (!menuPanel.contains(related) && related !== menuButton) closeMenu();
  });
});