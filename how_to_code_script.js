(() => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const total = slides.length;
  let index = 0;

  // Controls
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const progressText = document.getElementById('progress-text');
  const progressFill = document.getElementById('progress-fill');

  // TOC
  const toc = document.getElementById('toc');
  const tocToggle = document.getElementById('toc-toggle');
  const tocButtons = Array.from(toc.querySelectorAll('button'));

  // Helpers for transitions
  function showSlide(newIndex, direction = 'right') {
    if (newIndex === index) return;
    const old = slides[index];
    const nw = slides[newIndex];

    // set ARIA states
    old.setAttribute('aria-hidden', 'true');
    nw.setAttribute('aria-hidden', 'false');

    // Prepare classes for animation
    old.classList.remove('slide-enter-right', 'slide-enter-left', 'slide-enter-active', 'slide-exit-right', 'slide-exit-left');
    nw.classList.remove('slide-enter-right', 'slide-enter-left', 'slide-enter-active', 'slide-exit-right', 'slide-exit-left');

    // add exit animation to old
    if (direction === 'right') old.classList.add('slide-exit-right');
    else old.classList.add('slide-exit-left');

    // add enter animation to new
    if (direction === 'right') nw.classList.add('slide-enter-right');
    else nw.classList.add('slide-enter-left');

    // force reflow then activate
    void nw.offsetWidth;
    nw.classList.add('slide-enter-active');

    // after animation, cleanup
    setTimeout(() => {
      old.classList.remove('slide-exit-right', 'slide-exit-left');
      nw.classList.remove('slide-enter-right', 'slide-enter-left', 'slide-enter-active');
    }, 600);

    index = newIndex;
    updateControls();
  }

  function updateControls() {
    progressText.textContent = `${index + 1} / ${total}`;
    progressFill.style.width = `${((index + 1) / total) * 100}%`;
    prevBtn.disabled = (index === 0);
    nextBtn.disabled = (index === total - 1);
  }

  // button events
  prevBtn.addEventListener('click', () => {
    if (index > 0) showSlide(index - 1, 'left');
  });
  nextBtn.addEventListener('click', () => {
    if (index < total - 1) showSlide(index + 1, 'right');
  });

  // keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      if (index > 0) showSlide(index - 1, 'left');
    } else if (e.key === 'ArrowRight') {
      if (index < total - 1) showSlide(index + 1, 'right');
    } else if (e.key === 'Escape') {
      if (toc.getAttribute('aria-hidden') === 'false') toggleToc(false);
    }
  });

  // TOC toggle
  function toggleToc(open) {
    const isOpen = toc.getAttribute('aria-hidden') === 'false';
    const target = (typeof open === 'boolean') ? open : !isOpen;
    toc.setAttribute('aria-hidden', target ? 'false' : 'true');
    tocToggle.setAttribute('aria-expanded', target ? 'true' : 'false');
  }
  tocToggle.addEventListener('click', () => toggleToc());

  // TOC buttons
  tocButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const newIndex = Number(e.currentTarget.getAttribute('data-index'));
      const direction = newIndex > index ? 'right' : 'left';
      showSlide(newIndex, direction);
      toggleToc(false);
    });
  });

  // Initialize ARIA states and controls
  slides.forEach((s, i) => s.setAttribute('aria-hidden', i === 0 ? 'false' : 'true'));
  updateControls();

  // Image preloader (safe, respects ../img/ paths)
  const tryLoad = (id, path) => {
    const el = document.getElementById(id);
    if (!el) return;
    const tester = new Image();
    tester.onload = () => {
      el.src = path;
    };
    tester.onerror = () => {
      console.warn(`Image not found: ${path}`);
      // leave existing src intact
    };
    tester.src = path;
  };

  // Load images (paths exactly as in your HTML)
  tryLoad('img-why', 'Why.jpg');
  tryLoad('img-html', 'html.png');
  tryLoad('img-css',  'css.jpg');
  tryLoad('img-js',   'js.gif');

  console.info('HowToCode image hints:');
  console.info(' - Why slide image: Why.jpg  (set src of #img-why)');
  console.info(' - HTML slide image: html.png  (set src of #img-html)');
  console.info(' - CSS slide image: css.jpg  (set src of #img-css)');
  console.info(' - JS slide animation: js.gif  (set src of #img-js)');
})();