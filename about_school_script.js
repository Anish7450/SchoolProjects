// ExtraFiles/About School/AboutSchool.js
(() => {
  const menuButton = document.getElementById('menu-button');
  const menuPanel = document.getElementById('dot-menu-panel');
  const menuItems = Array.from(document.querySelectorAll('.menu-item'));

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Menu open/close
  function openMenu() {
    menuButton.setAttribute('aria-expanded', 'true');
    menuPanel.setAttribute('aria-hidden', 'false');
    const first = menuPanel.querySelector('.menu-item');
    if(first) first.focus();
    document.addEventListener('pointerdown', onDocPointer);
  }

  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    menuPanel.setAttribute('aria-hidden', 'true');
    menuButton.focus();
    document.removeEventListener('pointerdown', onDocPointer);
  }

  function onDocPointer(e) {
    if(!menuPanel.contains(e.target) && e.target !== menuButton) closeMenu();
  }

  menuButton.addEventListener('click', () => {
    const isOpen = menuPanel.getAttribute('aria-hidden') === 'false';
    if(isOpen) closeMenu(); else openMenu();
  });

  menuItems.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = e.currentTarget.getAttribute('data-action');
      if(action === 'visit-site') {
        window.open('https://spspurnea.in/', '_blank', 'noopener');
        closeMenu();
      } else if(action === 'how-to-code') {
        window.location.href = 'HowToCode.htm';
      } else if(action === 'back-home') {
        window.location.href = 'index.html';
      }
    });
  });

  // Save editable notes to localStorage
  const noteEl = document.querySelector('.editable-note');
  const storageKey = 'sps_about_notes';
  try {
    const saved = localStorage.getItem(storageKey);
    if(saved) noteEl.innerHTML = saved;
  } catch(e){}

  noteEl.addEventListener('input', () => {
    try {
      localStorage.setItem(storageKey, noteEl.innerHTML);
    } catch(e){}
  });
})();