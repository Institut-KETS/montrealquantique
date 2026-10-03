(() => {
  const button = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');
  if (!button || !nav) return;
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });
})();
