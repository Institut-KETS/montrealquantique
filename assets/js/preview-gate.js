(() => {
  const password = 'quantum';
  const sessionKey = 'montreal-quantique-preview';
  const body = document.body;
  const gate = document.getElementById('preview-gate');
  const site = document.getElementById('preview-site');
  const form = document.getElementById('preview-gate-form');
  const input = document.getElementById('preview-password');
  const error = document.getElementById('preview-gate-error');

  function unlock() {
    body.classList.remove('preview-locked');
    gate.hidden = true;
    site.inert = false;
    document.getElementById('main-content')?.focus({ preventScroll: true });
  }

  if (sessionStorage.getItem(sessionKey) === 'open') unlock();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (input.value === password) {
      sessionStorage.setItem(sessionKey, 'open');
      unlock();
      return;
    }

    input.value = '';
    error.textContent = 'Incorrect password · Mot de passe incorrect';
    input.focus();
  });
})();
