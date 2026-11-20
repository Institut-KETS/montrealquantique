(() => {
  const THEME_KEY = 'mq-color-theme';
  const themes = new Set(['light', 'dark']);
  const button = document.querySelector('[data-theme-toggle]');
  const icon = button?.querySelector('[data-theme-icon]');
  if (!button || !icon) return;

  function setTheme(theme, persist = true) {
    const next = themes.has(theme) ? theme : 'light';
    document.documentElement.dataset.colorTheme = next;
    button.setAttribute('aria-pressed', String(next === 'dark'));
    icon.textContent = next === 'dark' ? '☀' : '☾';

    const french = document.documentElement.lang === 'fr';
    const label = next === 'dark'
      ? (french ? 'Passer au thème clair' : 'Switch to light theme')
      : (french ? 'Passer au thème sombre' : 'Switch to dark theme');
    button.setAttribute('aria-label', label);

    if (persist) {
      try { localStorage.setItem(THEME_KEY, next); } catch (_) { /* storage is optional */ }
    }
  }

  let savedTheme = 'light';
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (themes.has(stored)) savedTheme = stored;
  } catch (_) { /* storage is optional */ }
  setTheme(document.documentElement.dataset.colorTheme || savedTheme, false);

  button.addEventListener('click', () => {
    setTheme(document.documentElement.dataset.colorTheme === 'dark' ? 'light' : 'dark');
  });
  document.addEventListener('mq:languagechange', () => {
    setTheme(document.documentElement.dataset.colorTheme || savedTheme, false);
  });
})();
