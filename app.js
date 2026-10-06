(() => {
  'use strict';

  const root = document.documentElement;
  const sections = [...document.querySelectorAll('main section[id]')];
  const sectionLinks = [...document.querySelectorAll('[data-section]')];
  const currentFile = document.getElementById('current-file');
  const menuButton = document.querySelector('.menu-toggle');
  const explorer = document.getElementById('explorer');
  const themeButton = document.querySelector('.theme-toggle');
  const paletteButton = document.querySelector('.palette-trigger');
  const palette = document.querySelector('.command-palette');
  const backdrop = document.querySelector('.palette-backdrop');
  const search = document.getElementById('palette-search');
  const paletteLinks = [...document.querySelectorAll('.palette-results a')];
  const fileNames = {
    inicio: 'inicio.tsx',
    'sobre-mi': 'sobre-mi.md',
    proyectos: 'proyectos.json',
    contacto: 'contacto.css'
  };

  const readTheme = () => {
    try { return localStorage.getItem('portfolio-theme'); }
    catch { return null; }
  };

  const saveTheme = (value) => {
    try { localStorage.setItem('portfolio-theme', value); }
    catch { /* El tema sigue funcionando en esta visita. */ }
  };

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    themeButton.setAttribute('aria-label', theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro');
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#1b1e26' : '#f6f8fb';
    saveTheme(theme);
  };

  setTheme(readTheme() === 'light' ? 'light' : 'dark');
  themeButton.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  const closeMenu = () => {
    explorer.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
  };

  menuButton.addEventListener('click', () => {
    const opening = !explorer.classList.contains('open');
    explorer.classList.toggle('open', opening);
    document.body.classList.toggle('menu-open', opening);
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', opening ? 'Cerrar menú' : 'Abrir menú');
  });

  document.addEventListener('click', (event) => {
    if (document.body.classList.contains('menu-open') && !explorer.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });

  const setActive = (id) => {
    if (!fileNames[id]) return;
    sectionLinks.forEach((link) => {
      const isActive = link.dataset.section === id;
      link.classList.toggle('active', isActive);
      if (isActive && link.closest('.file-nav')) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    currentFile.textContent = fileNames[id];
  };

  let scrollQueued = false;
  const updateActiveFromScroll = () => {
    let active = sections[0].id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 220) active = section.id;
    }
    setActive(active);
    scrollQueued = false;
  };

  window.addEventListener('scroll', () => {
    if (!scrollQueued) {
      scrollQueued = true;
      requestAnimationFrame(updateActiveFromScroll);
    }
  }, { passive: true });
  window.addEventListener('resize', updateActiveFromScroll);
  window.addEventListener('hashchange', () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (fileNames[id]) setActive(id);
  });
  sectionLinks.forEach((link) => link.addEventListener('click', () => {
    setActive(link.dataset.section);
    closeMenu();
  }));
  updateActiveFromScroll();

  let paletteReturnFocus = null;
  const closePalette = () => {
    if (palette.hidden) return;
    palette.hidden = true;
    backdrop.hidden = true;
    search.value = '';
    paletteLinks.forEach((link) => { link.hidden = false; });
    if (paletteReturnFocus) paletteReturnFocus.focus();
  };

  const openPalette = () => {
    paletteReturnFocus = document.activeElement;
    closeMenu();
    palette.hidden = false;
    backdrop.hidden = false;
    search.focus();
  };

  paletteButton.addEventListener('click', openPalette);
  backdrop.addEventListener('click', closePalette);
  paletteLinks.forEach((link) => link.addEventListener('click', closePalette));
  search.addEventListener('input', () => {
    const query = search.value.trim().toLocaleLowerCase('es');
    paletteLinks.forEach((link) => {
      link.hidden = !link.dataset.label.toLocaleLowerCase('es').includes(query);
    });
  });

  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      palette.hidden ? openPalette() : closePalette();
      return;
    }
    if (event.key === 'Escape') {
      closePalette();
      closeMenu();
      return;
    }
    if (palette.hidden) return;
    if (event.key === 'Enter' && document.activeElement === search) {
      const first = paletteLinks.find((link) => !link.hidden);
      if (first) first.click();
    }
    if (event.key === 'Tab') {
      const focusable = [search, ...paletteLinks.filter((link) => !link.hidden)];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
